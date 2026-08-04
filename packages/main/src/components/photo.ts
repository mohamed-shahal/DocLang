import * as fs from "fs";
import * as path from "path";
import type { PhotoConfig, SectionComponent } from "../types/index.js";
import {
  Paragraph,
  ImageRun,
} from "../core/index.js";
import { detectImageType } from "./image.js";

/**
 * A photo loaded from a local file path, rendered in the header photo slot.
 *
 * @param imagePath - Path to a local image file.
 * @param config - Photo dimensions and optional circular crop setting.
 * @returns A section component producing an image paragraph.
 */
export function PhotoPath(
  imagePath: string,
  config: Omit<PhotoConfig, "data">,
): SectionComponent {
  return () => {
    const absPath = path.resolve(imagePath);
    const data = fs.readFileSync(absPath);
    const image = new ImageRun({
      data,
      transformation: {
        width: config.width,
        height: config.height,
      },
      type: detectImageType(data),
    });

    return [
      new Paragraph({
        children: [image],
        alignment: "left" as const,
        spacing: { after: 100 },
      }),
    ];
  };
}
