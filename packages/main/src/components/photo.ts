import * as fs from "fs";
import * as path from "path";
import type { PhotoConfig, SectionComponent } from "../types/index.js";
import {
  Paragraph,
  ImageRun,
} from "../core/index.js";

function detectImageType(data: Buffer): "png" | "jpg" | "gif" | "bmp" {
  if (data.length >= 8 && data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e && data[3] === 0x47) {
    return "png";
  }

  if (data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) {
    return "jpg";
  }

  if (
    data.length >= 4
    && data[0] === 0x47
    && data[1] === 0x49
    && data[2] === 0x46
    && data[3] === 0x38
  ) {
    return "gif";
  }

  if (data.length >= 2 && data[0] === 0x42 && data[1] === 0x4d) {
    return "bmp";
  }

  return "png";
}

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
        alignment: "center" as const,
        spacing: { after: 100 },
      }),
    ];
  };
}
