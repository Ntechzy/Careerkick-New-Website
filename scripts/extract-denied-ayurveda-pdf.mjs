import fs from "fs";
import path from "path";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const inputPdf =
  "C:\\Users\\ntech\\Downloads\\List of Denied Ayurveda Colleges for the Academic Year 2026–27.pdf";
const outputJson = path.join(
  process.cwd(),
  "data",
  "deniedAyurvedaColleges2026-27.json",
);

const columns = [
  { key: "serialNumber", minX: 0, maxX: 50 },
  { key: "collegeId", minX: 50, maxX: 104 },
  { key: "state", minX: 104, maxX: 160 },
  { key: "collegeName", minX: 160, maxX: 345 },
  { key: "district", minX: 345, maxX: 409 },
  { key: "managementType", minX: 409, maxX: 490 },
  { key: "finalPermissionDetails", minX: 490, maxX: Infinity },
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

  const lines = [];
  for (const item of [...items].sort((a, b) => b.y - a.y || a.x - b.x)) {
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
  return /^\d+$/.test(text) ? Number(text) : null;
}

const data = new Uint8Array(fs.readFileSync(inputPdf));
const pdf = await pdfjsLib.getDocument({
  data,
  useWorkerFetch: false,
  isEvalSupported: false,
  disableFontFace: true,
}).promise;

const colleges = [];

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

  const rowStarts = items
    .filter((item) => {
      const value = item.str.trim();
      return item.x >= 20 && item.x < 45 && /^\d+$/.test(value);
    })
    .map((item) => ({ serialNumber: Number(item.str.trim()), y: item.y }))
    .sort((a, b) => b.y - a.y);

  for (let index = 0; index < rowStarts.length; index += 1) {
    const start = rowStarts[index];
    const next = rowStarts[index + 1];
    const upperY = start.y + 3;
    const lowerY = next ? next.y + 3 : -Infinity;
    const rowItems = items.filter((item) => item.y <= upperY && item.y > lowerY);
    const row = { sourcePage: pageNumber };

    for (const column of columns) {
      row[column.key] = textFromItems(
        rowItems.filter((item) => item.x >= column.minX && item.x < column.maxX),
      );
    }

    row.serialNumber = numberOrNull(row.serialNumber);
    colleges.push(row);
  }
}

colleges.sort((a, b) => a.serialNumber - b.serialNumber);

const output = {
  source: {
    fileName: path.basename(inputPdf),
    extractedFrom: inputPdf,
    academicYear: "2026-27",
    status: "Denied",
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
  ],
  colleges,
};

fs.writeFileSync(outputJson, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Extracted ${colleges.length} denied rows from ${pdf.numPages} pages to ${outputJson}`);
