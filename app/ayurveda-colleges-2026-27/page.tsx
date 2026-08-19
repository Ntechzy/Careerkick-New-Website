import type { Metadata } from "next";
import permittedAyurvedaColleges from "@/data/permittedAyurvedaColleges2026-27.json";
import permittedAyurvedaCollegesUP from "@/data/permittedAyurvedaCollegesUP2026-27.json";
import deniedAyurvedaColleges from "@/data/deniedAyurvedaColleges2026-27.json";
import { AyurvedaCollegesExplorer } from "@/components/ayurveda-colleges/AyurvedaCollegesExplorer";
import { siteConfig } from "@/lib/site";

type CollegeRecord = Record<string, string | number | null | undefined>;

const route = "/ayurveda-colleges-2026-27";
const pageTitle =
  "NCISM Ayurveda Colleges 2026-27: Permitted, UP Permitted and Denied Lists";
const pageDescription =
  "Search the NCISM Ayurveda colleges 2026-27 lists for permitted colleges, Uttar Pradesh permitted colleges, and denied Ayurveda colleges with district, seats, and permission details.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: route,
  },
  keywords: [
    "NCISM Ayurveda colleges 2026-27",
    "permitted Ayurveda colleges 2026-27",
    "denied Ayurveda colleges 2026-27",
    "Uttar Pradesh Ayurveda colleges 2026",
    "BAMS colleges permission list 2026-27",
    "Ayurveda college seat matrix 2026",
  ],
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}${route}`,
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [siteConfig.ogImage],
  },
};

function numberValue(value: unknown) {
  return typeof value === "number" ? value : 0;
}

const allPermittedRows = permittedAyurvedaColleges.colleges as CollegeRecord[];
const upPermittedRows = permittedAyurvedaCollegesUP.colleges as CollegeRecord[];
const deniedRows = deniedAyurvedaColleges.colleges as CollegeRecord[];

const datasets = [
  {
    id: "permitted-all-india",
    label: "Permitted Ayurveda Colleges",
    eyebrow: "NCISM permitted list 2026-27",
    description:
      "Complete permitted Ayurveda college list for academic year 2026-27, including state, district, college ID, management type, UG seats with and without EWS, PG seats, and final permission details.",
    tableClassName: "min-w-[1760px]",
    rows: allPermittedRows,
    columns: [
      { key: "serialNumber", label: "S. No", className: "w-[72px]" },
      { key: "collegeId", label: "College ID", className: "w-[104px]" },
      { key: "state", label: "State", className: "w-[126px]" },
      { key: "collegeName", label: "College Name", className: "w-[330px]" },
      { key: "district", label: "District", className: "w-[140px]" },
      { key: "managementType", label: "Type", className: "w-[134px]" },
      { key: "sanctionSeatsUgWithoutEws", label: "UG Without EWS", className: "w-[112px]" },
      { key: "sanctionSeatsUgWithEws", label: "UG With EWS", className: "w-[104px]" },
      { key: "totalSanctionSeatsUg", label: "Total UG", className: "w-[94px]" },
      { key: "sanctionSeatsPg", label: "PG Seats", className: "w-[92px]" },
      { key: "finalPermissionDetails", label: "Permission Details", className: "w-[552px]" },
    ],
    stats: [
      { label: "Colleges", value: String(allPermittedRows.length) },
      {
        label: "Total UG Seats",
        value: String(
          allPermittedRows.reduce((sum, row) => sum + numberValue(row.totalSanctionSeatsUg), 0),
        ),
      },
      {
        label: "Total PG Seats",
        value: String(
          allPermittedRows.reduce((sum, row) => sum + numberValue(row.sanctionSeatsPg), 0),
        ),
      },
    ],
  },
  {
    id: "permitted-up",
    label: "UP Permitted Colleges",
    eyebrow: "Uttar Pradesh BAMS permission list",
    description:
      "Uttar Pradesh permitted Ayurveda colleges for academic year 2026-27 with college name, district, and sanctioned UG seats without EWS from the NCISM permission document.",
    tableClassName: "min-w-[1040px]",
    rows: upPermittedRows,
    columns: [
      { key: "serialNumber", label: "S. No", className: "w-[76px]" },
      { key: "collegeName", label: "College Name", className: "w-[590px]" },
      { key: "district", label: "District", className: "w-[180px]" },
      { key: "sanctionSeatsUgWithoutEws", label: "UG Seats Without EWS", className: "w-[194px]" },
    ],
    stats: [
      { label: "Colleges", value: String(upPermittedRows.length) },
      {
        label: "Total UG Seats",
        value: String(permittedAyurvedaCollegesUP.totalSanctionSeatsUgWithoutEws),
      },
      { label: "State", value: "Uttar Pradesh" },
    ],
  },
  {
    id: "denied",
    label: "Denied Ayurveda Colleges",
    eyebrow: "NCISM denied list 2026-27",
    description:
      "Denied Ayurveda colleges for academic year 2026-27 with college ID, state, district, management type, and the full denial permission details from the NCISM document.",
    tableClassName: "min-w-[1510px]",
    rows: deniedRows,
    columns: [
      { key: "serialNumber", label: "S. No", className: "w-[72px]" },
      { key: "collegeId", label: "College ID", className: "w-[104px]" },
      { key: "state", label: "State", className: "w-[134px]" },
      { key: "collegeName", label: "College Name", className: "w-[340px]" },
      { key: "district", label: "District", className: "w-[144px]" },
      { key: "managementType", label: "Type", className: "w-[132px]" },
      { key: "finalPermissionDetails", label: "Denial Details", className: "w-[584px]" },
    ],
    stats: [
      { label: "Colleges", value: String(deniedRows.length) },
      {
        label: "States",
        value: String(new Set(deniedRows.map((row) => String(row.state))).size),
      },
      { label: "Status", value: "Denied" },
    ],
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: pageTitle,
  description: pageDescription,
  url: `${siteConfig.url}${route}`,
  keywords: metadata.keywords,
  creator: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  temporalCoverage: "2026-2027",
  spatialCoverage: {
    "@type": "Country",
    name: "India",
  },
  variableMeasured: [
    "College ID",
    "State",
    "College name",
    "District",
    "Management type",
    "UG seats",
    "PG seats",
    "Final permission details",
  ],
};

export default function AyurvedaColleges202627Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="section-shell noise-overlay pt-28 md:pt-36">
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-4xl">
            <p className="section-kicker">NCISM Ayurveda College Lists</p>
            <h1 className="section-title">
              Ayurveda Colleges 2026-27 Permission and Denial Lists
            </h1>
          </div>
        </div>
      </section>

      <AyurvedaCollegesExplorer datasets={datasets} />

      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-card md:p-8">
          <h2 className="text-2xl font-bold text-white">
            NCISM Ayurveda Colleges 2026-27 Data
          </h2>
          <div className="mt-4 grid gap-5 text-sm font-medium leading-7 text-text-muted md:grid-cols-3">
            <p>
              The permitted Ayurveda colleges table includes college IDs, states,
              districts, ownership type, UG seat intake with EWS details, PG seats, and
              the full permission remarks.
            </p>
            <p>
              The Uttar Pradesh tab focuses on the UP permitted BAMS colleges list and
              sanctioned UG seats without EWS, making it easier to search by district or
              college name.
            </p>
            <p>
              The denied colleges tab lists institutes denied permission for academic
              year 2026-27, including the denial details exactly extracted from the
              source document table.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
