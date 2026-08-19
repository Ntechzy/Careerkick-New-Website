import fs from "fs";
import path from "path";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const inputPdf =
  "C:\\Users\\ntech\\Downloads\\List of Permitted Ayurveda Colleges for the Academic Year 2026–27.pdf";
const outputJson = path.join(
  process.cwd(),
  "data",
  "permittedAyurvedaColleges2026-27.json",
);

const columns = [
  { key: "serialNumber", minX: 0, maxX: 50 },
  { key: "collegeId", minX: 50, maxX: 99 },
  { key: "state", minX: 99, maxX: 153 },
  { key: "collegeName", minX: 153, maxX: 295 },
  { key: "district", minX: 295, maxX: 360 },
  { key: "managementType", minX: 360, maxX: 430 },
  { key: "finalPermissionDetails", minX: 430, maxX: 755 },
  { key: "sanctionSeatsUgWithoutEws", minX: 755, maxX: 815 },
  { key: "sanctionSeatsUgWithEws", minX: 815, maxX: 872 },
  { key: "totalSanctionSeatsUg", minX: 872, maxX: 927 },
  { key: "sanctionSeatsPg", minX: 927, maxX: Infinity },
];

function cleanText(value) {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:)])/g, "$1")
    .replace(/([(])\s+/g, "$1")
    .trim();
}

function textFromItems(items) {
  if (!items.length) return "";

  const sorted = [...items].sort((a, b) => {
    if (Math.abs(b.y - a.y) > 2) return b.y - a.y;
    return a.x - b.x;
  });

  const lines = [];
  for (const item of sorted) {
    const current = lines[lines.length - 1];
    if (!current || Math.abs(current.y - item.y) > 2) {
      lines.push({ y: item.y, items: [item] });
    } else {
      current.items.push(item);
    }
  }

  return cleanText(
    lines
      .map((line) => {
        const lineItems = line.items.sort((a, b) => a.x - b.x);
        let output = "";
        let prevEnd = null;
        for (const item of lineItems) {
          if (!item.str.trim()) continue;
          if (prevEnd !== null && item.x - prevEnd > 1 && output && !output.endsWith(" ")) {
            output += " ";
          }
          output += item.str;
          prevEnd = item.x + item.width;
        }
        return output;
      })
      .join(" "),
  );
}

function numberOrNull(value) {
  const text = cleanText(String(value ?? ""));
  if (!/^\d+$/.test(text)) return null;
  return Number(text);
}

const data = new Uint8Array(fs.readFileSync(inputPdf));
const pdf = await pdfjsLib.getDocument({
  data,
  useWorkerFetch: false,
  isEvalSupported: false,
  disableFontFace: true,
}).promise;

const rows = [];

for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
  const page = await pdf.getPage(pageNumber);
  const content = await page.getTextContent();
  const items = content.items
    .map((item) => ({
      str: item.str,
      x: item.transform[4],
      y: item.transform[5],
      width: item.width,
    }))
    .filter((item) => item.str !== "");

  const starts = items
    .filter(
      (item) =>
        item.x >= 20 &&
        item.x < 42 &&
        /^\d+$/.test(item.str.trim()),
    )
    .map((item) => ({ serialNumber: Number(item.str.trim()), y: item.y }))
    .sort((a, b) => b.y - a.y);

  for (let index = 0; index < starts.length; index += 1) {
    const start = starts[index];
    const next = starts[index + 1];
    const upperY = start.y + 3;
    const lowerY = next ? next.y + 3 : -Infinity;
    const rowItems = items.filter((item) => item.y <= upperY && item.y > lowerY);
    const row = { sourcePage: pageNumber };

    for (const column of columns) {
      const cellItems = rowItems.filter(
        (item) => item.x >= column.minX && item.x < column.maxX,
      );
      row[column.key] = textFromItems(cellItems);
    }

    row.serialNumber = numberOrNull(row.serialNumber);
    row.sanctionSeatsUgWithoutEws = numberOrNull(row.sanctionSeatsUgWithoutEws);
    row.sanctionSeatsUgWithEws = numberOrNull(row.sanctionSeatsUgWithEws);
    row.totalSanctionSeatsUg = numberOrNull(row.totalSanctionSeatsUg);
    row.sanctionSeatsPg = numberOrNull(row.sanctionSeatsPg);

    rows.push(row);
  }
}

rows.sort((a, b) => a.serialNumber - b.serialNumber);

const output = {
  source: {
    fileName: path.basename(inputPdf),
    extractedFrom: inputPdf,
    academicYear: "2026-27",
    pages: pdf.numPages,
  },
  columns: [
    "S. No",
    "College ID",
    "State",
    "Name of the College",
    "District",
    "Govt./Aided/Private/Deemed",
    "Final Permission Details",
    "Sanction seats (UG) without EWS",
    "Sanction seats (UG) With EWS",
    "Total Sanction seats (UG with EWS and Without EWS)",
    "Sanction seats (PG)",
  ],
  colleges: rows,
};

fs.writeFileSync(outputJson, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Extracted ${rows.length} rows from ${pdf.numPages} pages to ${outputJson}`);
