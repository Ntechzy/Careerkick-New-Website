import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050704",
    theme_color: "#050704",
    icons: [
      {
        src: "/logo_circle2.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
