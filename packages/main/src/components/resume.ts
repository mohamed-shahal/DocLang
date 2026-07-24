import type { SectionComponent } from "../types/index.js";
import {
  Paragraph,
  TextRun,
  Document,
  convertInchesToTwip,
  createBulletNumbering,
} from "../core/index.js";

/**
 * The root Resume component that assembles all sections into a packed document.
 *
 * @param sections - Child section components to include in the resume.
 * @returns A Document object from the `docx` package that can be packed.
 *
 * @example
 * ```ts
 * import { Packer } from "docx";
 * import { Resume, Header, Name } from "doclang";
 *
 * const doc = Resume(Header(Name("John Doe")));
 * const buffer = await Packer.toBuffer(doc);
 * ```
 */
export function Resume(
  ...sections: Array<SectionComponent | string>
): InstanceType<typeof Document> {
  const paragraphs: Paragraph[] = [];

  for (const section of sections) {
    if (typeof section === "string") {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: section })],
        }),
      );
    } else {
      paragraphs.push(...section());
    }
  }

  return new Document({
    numbering: {
      config: createBulletNumbering(),
    },
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: 18,
            color: "000000",
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.8),
              bottom: convertInchesToTwip(0.8),
              left: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
            },
          },
        },
        children: paragraphs,
      },
    ],
  });
}
