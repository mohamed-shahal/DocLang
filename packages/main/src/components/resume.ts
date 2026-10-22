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
            size: 20,
            color: "000000",
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: convertInchesToTwip(8.5),
              height: convertInchesToTwip(11),
            },
            margin: {
              top: convertInchesToTwip(0.7),
              bottom: convertInchesToTwip(0.7),
              left: convertInchesToTwip(0.85),
              right: convertInchesToTwip(0.85),
            },
          },
        },
        children: paragraphs,
      },
    ],
  });
}
