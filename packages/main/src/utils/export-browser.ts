import { Packer } from "docx";
import type { Document } from "docx";
import type { ExportOptions, ExportResult } from "./export.js";

export async function exportFile(
  doc: Document,
  options: ExportOptions = {}
): Promise<ExportResult> {
  const { fileName = "resume", pdf = false } = options;

  if (pdf) {
    throw new Error(
      "PDF conversion is not available in the browser. Pass { pdf: false } to download the .docx instead."
    );
  }

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = (
    globalThis as unknown as {
      document: {
        createElement(tag: string): {
          href: string;
          download: string;
          click(): void;
        };
      };
    }
  ).document.createElement("a");
  a.href = url;
  a.download = `${fileName}.docx`;
  a.click();
  URL.revokeObjectURL(url);

  return { docx: a.download };
}
