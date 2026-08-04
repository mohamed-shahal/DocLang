import type { ImageConfig, SectionComponent } from "../types/index.js";
import {
  Paragraph,
  ImageRun,
} from "../core/index.js";

export function detectImageType(
  data: Buffer,
): "png" | "jpg" | "gif" | "bmp" {
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
 * A generic image component, right-aligned by default.
 *
 * @param config - Image configuration with data, width, height, and optional alignment.
 * @returns A section component producing an image paragraph.
 *
 * @example
 * ```ts
 * ResumeImage({ data: imageBuffer, width: 100, height: 100 })
 * ```
 */
export function ResumeImage(config: ImageConfig): SectionComponent {
  return () => {
    const image = new ImageRun({
      data: config.data,
      transformation: {
        width: config.width,
        height: config.height,
      },
      type: Buffer.isBuffer(config.data)
        ? detectImageType(config.data)
        : "png",
    });

    return [
      new Paragraph({
        children: [image],
        alignment: (config.alignment ?? "right") as
          | "left"
          | "center"
          | "right",
        spacing: { after: 100 },
      }),
    ];
  };
}
