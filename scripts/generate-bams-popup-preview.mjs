import { readFile, writeFile } from "node:fs/promises";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

// Run again whenever the popup PDF changes: node scripts/generate-bams-popup-preview.mjs
const publicDirectory = new URL("../public/", import.meta.url);
const loadingTask = getDocument({
  data: new Uint8Array(await readFile(new URL("top_20_bams_college_list_popup.pdf", publicDirectory))),
  standardFontDataUrl: new URL("../node_modules/pdfjs-dist/standard_fonts/", import.meta.url).href,
});
const document = await loadingTask.promise;

try {
  const page = await document.getPage(1);
  const original = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: 1600 / original.width });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  await page.render({ canvas, canvasContext: canvas.getContext("2d"), viewport }).promise;
  await writeFile(new URL("top_20_bams_college_list_popup-preview.webp", publicDirectory), canvas.toBuffer("image/webp", 90));
  console.log(`Generated first-page preview (${document.numPages} PDF pages).`);
} finally {
  await loadingTask.destroy();
}
