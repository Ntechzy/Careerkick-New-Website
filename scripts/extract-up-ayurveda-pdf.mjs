import fs from "fs";
import path from "path";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const inputPdf = "C:\\Users\\ntech\\Downloads\\NCISM PERMISSION 2026 - UP.pdf";
const outputJson = path.join(
  process.cwd(),
  "data",
  "permittedAyurvedaCollegesUP2026-27.json",
);

const columns = [
  { key: "serialNumber", minX: 50, maxX: 110 },
  { key: "collegeName", minX: 110, maxX: 540 },
  { key: "district", minX: 540, maxX: 630 },
  { key: "sanctionSeatsUgWithoutEws", minX: 630, maxX: 700 },
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
let totalSanctionSeatsUgWithoutEws = null;

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
      return (
        item.x >= 630 &&
        item.x < 700 &&
        /^(60|100)$/.test(value)
      );
    })
    .map((item) => ({ y: item.y }))
    .sort((a, b) => b.y - a.y);

  const totalItem = items.find(
    (item) => item.x >= 700 && /^2160$/.test(item.str.trim()),
  );
  if (totalItem) {
    totalSanctionSeatsUgWithoutEws = Number(totalItem.str.trim());
  }

  for (let index = 0; index < rowStarts.length; index += 1) {
    const start = rowStarts[index];
    const next = rowStarts[index + 1];
    const upperY = start.y + 4;
    const lowerY = next ? next.y + 4 : start.y - 25;
    const rowItems = items.filter((item) => item.y <= upperY && item.y > lowerY);
    const row = { sourcePage: pageNumber };

    for (const column of columns) {
      row[column.key] = textFromItems(
        rowItems.filter((item) => item.x >= column.minX && item.x < column.maxX),
      );
    }

    row.serialNumber = numberOrNull(row.serialNumber);
    row.sanctionSeatsUgWithoutEws = numberOrNull(row.sanctionSeatsUgWithoutEws);
    colleges.push(row);
  }
}

colleges.sort((a, b) => a.serialNumber - b.serialNumber);

const output = {
  source: {
    fileName: path.basename(inputPdf),
    extractedFrom: inputPdf,
    academicYear: "2026-27",
    state: "Uttar Pradesh",
    pages: pdf.numPages,
  },
  columns: [
    "S. No",
    "Name of the College",
    "District",
    "Sanction seats (UG) without EWS",
  ],
  totalSanctionSeatsUgWithoutEws,
  colleges,
};

fs.writeFileSync(outputJson, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Extracted ${colleges.length} UP rows from ${pdf.numPages} pages to ${outputJson}`);
