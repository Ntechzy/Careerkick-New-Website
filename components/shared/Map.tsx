/**
 * Advanced 3D MapLibre office map with synthetic city geometry and branded overlays.
 */
import { ExternalLink, MapPin } from "lucide-react";
import { memo, useEffect, useMemo, useRef } from "react";
import type { Feature, FeatureCollection, Polygon } from "geojson";
import maplibregl, { type LngLatLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export type MapProps = {
  center?: [number, number];
  zoom?: number;
  title?: string;
  address?: string;
  locationUrl?: string;
  className?: string;
};

const BUILDINGS_LAYER_ID = "careerkick-3d-buildings";
const HIGHRISE_SOURCE_ID = "careerkick-highrise-source";
const HIGHRISE_LAYER_ID = "careerkick-highrise-layer";
const DETAILED_BUILDINGS_SOURCE_ID = "careerkick-detailed-buildings-source";
const DETAILED_BUILDINGS_LAYER_ID = "careerkick-detailed-buildings-layer";
const CITY_BLOCKS_SOURCE_ID = "careerkick-city-blocks-source";
const CITY_BLOCKS_LAYER_ID = "careerkick-city-blocks-layer";
const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/dark";
const DEFAULT_CENTER: [number, number] = [80.2888, 26.4898];

const toLngLatOffset = (
  center: [number, number],
  eastMeters: number,
  northMeters: number,
): [number, number] => {
  const [lng, lat] = center;
  const latOffset = northMeters / 111320;
  const lngOffset = eastMeters / (111320 * Math.cos((lat * Math.PI) / 180));
  return [lng + lngOffset, lat + latOffset];
};

const createExtrusionPolygon = (
  center: [number, number],
  eastMeters: number,
  northMeters: number,
  widthMeters: number,
  depthMeters: number,
  height: number,
  base = 0,
  color?: string,
): Feature<
  Polygon,
  { height: number; min_height: number; color: string | null }
> => {
  const halfWidth = widthMeters / 2;
  const halfDepth = depthMeters / 2;
  const topLeft = toLngLatOffset(
    center,
    eastMeters - halfWidth,
    northMeters + halfDepth,
  );
  const topRight = toLngLatOffset(
    center,
    eastMeters + halfWidth,
    northMeters + halfDepth,
  );
  const bottomRight = toLngLatOffset(
    center,
    eastMeters + halfWidth,
    northMeters - halfDepth,
  );
  const bottomLeft = toLngLatOffset(
    center,
    eastMeters - halfWidth,
    northMeters - halfDepth,
  );

  return {
    type: "Feature",
    properties: {
      height,
      min_height: base,
      color: color ?? null,
    },
    geometry: {
      type: "Polygon",
      coordinates: [[topLeft, topRight, bottomRight, bottomLeft, topLeft]],
    },
  };
};

const createDetailedBuilding = (
  center: [number, number],
  eastMeters: number,
  northMeters: number,
  widthMeters: number,
  depthMeters: number,
  height: number,
  base = 0,
  hasRoofDetail = false,
): Feature<
  Polygon,
  { height: number; min_height: number; color: string | null }
>[] => {
  const building = createExtrusionPolygon(
    center,
    eastMeters,
    northMeters,
    widthMeters,
    depthMeters,
    height,
    base,
  );

  if (hasRoofDetail && height > 40) {
    const roofHeight = height + height * 0.08;
    const roofWidth = widthMeters * 0.7;
    const roofDepth = depthMeters * 0.7;
    const roof = createExtrusionPolygon(
      center,
      eastMeters,
      northMeters,
      roofWidth,
      roofDepth,
      roofHeight,
      height,
    );
    return [building, roof];
  }

  return [building];
};

const createHighriseCluster = (center: [number, number]) => {
  const buildings: Feature<
    Polygon,
    { height: number; min_height: number; color: string | null }
  >[] = [];

  buildings.push(
    ...createDetailedBuilding(center, -15, 25, 52, 48, 168, 12, true),
  );
  buildings.push(
    ...createDetailedBuilding(center, 45, -8, 44, 42, 142, 10, true),
  );
  buildings.push(
    ...createDetailedBuilding(center, -72, -12, 48, 46, 156, 12, true),
  );
  buildings.push(
    ...createDetailedBuilding(center, 28, 78, 42, 38, 134, 10, true),
  );
  buildings.push(...createDetailedBuilding(center, -45, 95, 38, 36, 98, 6));
  buildings.push(
    ...createDetailedBuilding(center, 85, 62, 36, 34, 112, 8, true),
  );
  buildings.push(...createDetailedBuilding(center, -88, -45, 40, 38, 104, 6));
  buildings.push(...createDetailedBuilding(center, 62, -65, 34, 32, 92, 4));
  buildings.push(
    ...createDetailedBuilding(center, -32, -88, 44, 40, 118, 8, true),
  );
  buildings.push(...createDetailedBuilding(center, 95, -32, 38, 36, 86, 4));

  buildings.push(createExtrusionPolygon(center, -125, 45, 52, 44, 72, 4));
  buildings.push(createExtrusionPolygon(center, -98, 118, 46, 42, 64, 2));
  buildings.push(createExtrusionPolygon(center, 118, 28, 48, 44, 78, 4));
  buildings.push(createExtrusionPolygon(center, 25, -115, 42, 38, 68, 2));
  buildings.push(createExtrusionPolygon(center, -55, -135, 44, 40, 56, 0));
  buildings.push(createExtrusionPolygon(center, 135, -55, 40, 38, 82, 4));
  buildings.push(createExtrusionPolygon(center, 105, 95, 38, 36, 74, 2));

  return {
    type: "FeatureCollection" as const,
    features: buildings.flat(),
  };
};

const createCityBlocks = (center: [number, number]) => {
  const blocks: Feature<
    Polygon,
    { height: number; min_height: number; color: string | null }
  >[] = [];

  const blockPositions = [
    { east: 180, north: 120, width: 85, depth: 70, heightRange: [18, 28] },
    { east: 180, north: 30, width: 85, depth: 75, heightRange: [22, 32] },
    { east: 180, north: -60, width: 85, depth: 70, heightRange: [16, 26] },
    { east: 180, north: -150, width: 85, depth: 70, heightRange: [20, 30] },
    { east: -195, north: 110, width: 90, depth: 75, heightRange: [14, 24] },
    { east: -195, north: 20, width: 90, depth: 80, heightRange: [18, 28] },
    { east: -195, north: -70, width: 90, depth: 75, heightRange: [22, 32] },
    { east: -195, north: -160, width: 90, depth: 70, heightRange: [16, 26] },
    { east: -30, north: 195, width: 110, depth: 80, heightRange: [24, 38] },
    { east: 60, north: 195, width: 110, depth: 80, heightRange: [20, 34] },
    { east: -120, north: 195, width: 85, depth: 80, heightRange: [18, 28] },
    { east: -40, north: -195, width: 110, depth: 80, heightRange: [22, 36] },
    { east: 50, north: -195, width: 110, depth: 80, heightRange: [26, 40] },
    { east: 140, north: -195, width: 85, depth: 80, heightRange: [18, 28] },
  ];

  blockPositions.forEach((position) => {
    const height = Math.floor(
      Math.random() * (position.heightRange[1] - position.heightRange[0]) +
        position.heightRange[0],
    );
    const base = Math.floor(Math.random() * 4);

    blocks.push(
      createExtrusionPolygon(
        center,
        position.east,
        position.north,
        position.width,
        position.depth,
        height,
        base,
      ),
    );
  });

  const residentialClusters = [
    { east: -145, north: 165, width: 45, depth: 40, count: 4 },
    { east: 155, north: 165, width: 48, depth: 42, count: 4 },
    { east: -160, north: -165, width: 52, depth: 46, count: 4 },
    { east: 165, north: -170, width: 48, depth: 44, count: 4 },
    { east: -85, north: 175, width: 55, depth: 50, count: 3 },
    { east: 90, north: 178, width: 52, depth: 48, count: 3 },
  ];

  residentialClusters.forEach((cluster) => {
    const offset = cluster.width / 2;

    for (let index = 0; index < cluster.count; index += 1) {
      const xOffset =
        (index % 2 === 0 ? -offset : offset) + (Math.random() * 12 - 6);
      const yOffset = Math.floor(index / 2) * 28 - 14 + (Math.random() * 8 - 4);
      const height = Math.floor(Math.random() * 28 + 18);
      const width = Math.floor(Math.random() * 14 + 22);
      const depth = Math.floor(Math.random() * 14 + 22);

      blocks.push(
        createExtrusionPolygon(
          center,
          cluster.east + xOffset,
          cluster.north + yOffset,
          width,
          depth,
          height,
          Math.floor(Math.random() * 3),
        ),
      );
    }
  });

  return {
    type: "FeatureCollection" as const,
    features: blocks,
  };
};

const add3dBuildings = (map: maplibregl.Map, center: [number, number]) => {
  if (!map.isStyleLoaded()) {
    return;
  }

  try {
    const findLabelLayer = () => {
      return map
        .getStyle()
        ?.layers?.find(
          (layer) =>
            layer.type === "symbol" &&
            layer.layout &&
            Object.prototype.hasOwnProperty.call(layer.layout, "text-field"),
        )?.id;
    };

    if (!map.getLayer(BUILDINGS_LAYER_ID) && map.getSource("openmaptiles")) {
      const labelLayerId = findLabelLayer();

      map.addLayer(
        {
          id: BUILDINGS_LAYER_ID,
          source: "openmaptiles",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 12,
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              "rgba(12, 45, 7, 0.68)",
              14,
              "rgba(9, 36, 6, 0.86)",
              16,
              "rgba(5, 7, 4, 0.96)",
            ],
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              0,
              12.8,
              ["*", ["coalesce", ["get", "height"], 12], 1.2],
              14,
              ["*", ["coalesce", ["get", "height"], 16], 1.4],
            ],
            "fill-extrusion-base": [
              "*",
              ["coalesce", ["get", "min_height"], 0],
              1.15,
            ],
            "fill-extrusion-opacity": 0.88,
            "fill-extrusion-vertical-gradient": true,
          },
        },
        labelLayerId,
      );
    }

    if (!map.getSource(HIGHRISE_SOURCE_ID)) {
      map.addSource(HIGHRISE_SOURCE_ID, {
        type: "geojson",
        data: createHighriseCluster(center),
      });
    }

    if (!map.getLayer(HIGHRISE_LAYER_ID)) {
      const labelLayerId = findLabelLayer();

      map.addLayer(
        {
          id: HIGHRISE_LAYER_ID,
          type: "fill-extrusion",
          source: HIGHRISE_SOURCE_ID,
          minzoom: 12,
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "height"],
              40,
              "rgba(81, 167, 10, 0.68)",
              80,
              "rgba(109, 204, 18, 0.82)",
              120,
              "rgba(142, 236, 50, 0.92)",
              160,
              "rgba(192, 247, 92, 0.98)",
            ],
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              0,
              12.5,
              ["get", "height"],
              14,
              ["*", ["get", "height"], 1.05],
            ],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.94,
            "fill-extrusion-vertical-gradient": true,
          },
        },
        labelLayerId,
      );
    }

    if (!map.getSource(DETAILED_BUILDINGS_SOURCE_ID)) {
      const detailedBuildings: FeatureCollection<
        Polygon,
        { height: number; min_height: number; color: string | null }
      > = createHighriseCluster(center);

      detailedBuildings.features = detailedBuildings.features.filter(
        (feature) =>
          feature.properties.height >= 40 && feature.properties.height <= 90,
      );

      map.addSource(DETAILED_BUILDINGS_SOURCE_ID, {
        type: "geojson",
        data: detailedBuildings,
      });
    }

    if (!map.getLayer(DETAILED_BUILDINGS_LAYER_ID)) {
      const labelLayerId = findLabelLayer();

      map.addLayer(
        {
          id: DETAILED_BUILDINGS_LAYER_ID,
          type: "fill-extrusion",
          source: DETAILED_BUILDINGS_SOURCE_ID,
          minzoom: 13,
          paint: {
            "fill-extrusion-color": "rgba(81, 167, 10, 0.72)",
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.9,
            "fill-extrusion-vertical-gradient": true,
          },
        },
        labelLayerId,
      );
    }

    if (!map.getSource(CITY_BLOCKS_SOURCE_ID)) {
      map.addSource(CITY_BLOCKS_SOURCE_ID, {
        type: "geojson",
        data: createCityBlocks(center),
      });
    }

    if (!map.getLayer(CITY_BLOCKS_LAYER_ID)) {
      const labelLayerId = findLabelLayer();

      map.addLayer(
        {
          id: CITY_BLOCKS_LAYER_ID,
          type: "fill-extrusion",
          source: CITY_BLOCKS_SOURCE_ID,
          minzoom: 12,
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "height"],
              10,
              "rgba(10, 38, 6, 0.72)",
              20,
              "rgba(18, 52, 8, 0.78)",
              30,
              "rgba(37, 89, 7, 0.84)",
              40,
              "rgba(81, 167, 10, 0.9)",
            ],
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.85,
            "fill-extrusion-vertical-gradient": true,
          },
        },
        labelLayerId,
      );
    }
  } catch {
    // Style may still be in transition on some production devices; retry via event hooks.
  }
};

const buildDefaultLocationUrl = (
  center: [number, number],
  address?: string,
) => {
  if (address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${center[1]},${center[0]}`;
};

function MapComponent({
  center = DEFAULT_CENTER,
  zoom = 14.4,
  title = "Careerkick Office",
  address = "117/N/65, L Block, Raniganj, Kakadeo, Kanpur, Uttar Pradesh 208025",
  locationUrl,
  className = "",
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const finalLocationUrl = useMemo(
    () => locationUrl ?? buildDefaultLocationUrl(center, address),
    [address, center, locationUrl],
  );

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) {
      return;
    }

    const styleId = "careerkick-maplibre-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes map-marker-pulse {
          0% { transform: scale(1); opacity: 0.55; }
          70% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        .maplibre-office-popup .maplibregl-popup-content {
          border-radius: 16px;
          border: 1px solid rgba(81, 167, 10, 0.28);
          background: rgba(5, 7, 4, 0.94);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.32);
          padding: 10px 12px;
        }

        .maplibre-office-popup .maplibregl-popup-tip {
          border-top-color: rgba(5, 7, 4, 0.94);
        }
      `;
      document.head.appendChild(style);
    }

    const markerElement = document.createElement("div");
    markerElement.className = "maplibre-office-marker";
    markerElement.innerHTML = `
      <div style="position:relative;display:flex;align-items:center;justify-content:center;width:20px;height:20px;">
        <span style="position:absolute;inset:0;border-radius:9999px;background:rgba(81,167,10,0.3);animation:map-marker-pulse 2.1s ease-out infinite;"></span>
        <span style="position:relative;display:flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:9999px;background:#8cef32;border:2px solid rgba(5,7,4,0.4);box-shadow:0 0 24px rgba(81,167,10,0.45);"></span>
      </div>
    `;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE_URL,
      center: center as LngLatLike,
      zoom,
      canvasContextAttributes: {
        antialias: true,
      },
      pitch: 58,
      bearing: -22,
      attributionControl: false,
    });

    map.scrollZoom.disable();
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );

    const ensure3dLayers = () => {
      add3dBuildings(map, center);
    };

    map.on("load", ensure3dLayers);
    map.on("styledata", ensure3dLayers);
    map.on("idle", ensure3dLayers);

    const marker = new maplibregl.Marker({
      element: markerElement,
      anchor: "center",
    })
      .setLngLat(center as LngLatLike)
      .setPopup(
        new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 14,
          className: "maplibre-office-popup",
        }).setHTML(
          `<div style="padding:2px 2px 0;">
            <p style="margin:0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(142,236,50,0.92);font-weight:700;">Office Location</p>
            <p style="margin:6px 0 0;font-size:14px;font-weight:600;color:#ffffff;">${title}</p>
          </div>`,
        ),
      )
      .addTo(map);

    marker.togglePopup();

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.off("load", ensure3dLayers);
      map.off("styledata", ensure3dLayers);
      map.off("idle", ensure3dLayers);
      markerRef.current?.remove();
      mapRef.current?.remove();
      markerRef.current = null;
      mapRef.current = null;
    };
  }, [center, title, zoom]);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current) {
      return;
    }

    const map = mapRef.current;
    const marker = markerRef.current;

    map.easeTo({
      center: center as LngLatLike,
      duration: 1200,
      pitch: 58,
      bearing: -22,
      essential: true,
    });
    marker.setLngLat(center as LngLatLike);

    if (map.isStyleLoaded()) {
      add3dBuildings(map, center);
      return;
    }

    const handleLoad = () => add3dBuildings(map, center);
    map.once("load", handleLoad);

    return () => {
      map.off("load", handleLoad);
    };
  }, [center]);

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-[#51A70A]/20 bg-[#050704] shadow-[0_24px_80px_rgba(0,0,0,0.32)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/72 via-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/82 via-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(81,167,10,0.14),transparent_30%),radial-gradient(circle_at_84%_72%,rgba(142,236,50,0.10),transparent_24%)]" />
      <div ref={mapContainer} className="h-full w-full" />

      <a
        href={finalLocationUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-[#51A70A]/30 bg-gradient-to-r from-[#51A70A] to-[#8cef32] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#050704] shadow-[0_16px_36px_rgba(81,167,10,0.24)] transition-transform duration-300 hover:scale-[1.02]"
      >
        Open Location
        <ExternalLink className="h-3.5 w-3.5" />
      </a>

      <div className="pointer-events-none absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-full border border-[#51A70A]/20 bg-black/60 px-3 py-2 text-[11px] font-medium text-white/90 backdrop-blur-md">
        <MapPin className="h-3.5 w-3.5 text-[#8cef32]" />
        Navigation ready
      </div>
    </div>
  );
}

export default memo(MapComponent);
