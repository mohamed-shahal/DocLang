import type { SectionComponent, ResumeStyles, ContactInfo, PhotoConfig } from "../types/index.js";
import {
  paragraphFromToken,
  textRunFromToken,
  inlineParagraph,
  getStyles,
  withSpacingAfter,
  splitSpacingAfter,
  Paragraph,
  TextRun,
  ImageRun,
  convertInchesToTwip,
} from "../core/index.js";
import { formatContact } from "../utils/index.js";
import { Text } from "./generic.js";

/**
 * The resume header containing name, designation, and contact info.
 *
 * @param children - Child components (Name, Designation, Contact, Address, Photo).
 * @param styles - Optional style overrides.
 * @returns A section component producing header paragraphs.
 *
 * @example
 * ```ts
 * const header = Header(
 *   Name("John Doe"),
 *   Designation("Software Engineer"),
 *   Contact({ email: "john@example.com" })
 * );
 * ```
 */
export function Header(
  ...children: Array<SectionComponent | string | number>
): SectionComponent {
  return () => {
    const { items, spacingAfter } = splitSpacingAfter(children);
    const paragraphs: Paragraph[] = [];

    for (const child of items) {
      if (typeof child === "string") {
        paragraphs.push(...Text(child)());
      } else {
        paragraphs.push(...child());
      }
    }

    return withSpacingAfter(paragraphs, spacingAfter);
  };
}

/**
 * The candidate's name displayed prominently.
 *
 * @param name - The full name.
 * @param styles - Optional style overrides.
 * @returns A section component producing a name paragraph.
 */
export function Name(
  name: string,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () =>
    withSpacingAfter(
      [paragraphFromToken(getStyles(styles).name, name)],
      spacingAfter,
    );
}

/**
 * The candidate's professional designation / title.
 *
 * @param title - The designation text.
 * @param styles - Optional style overrides.
 * @returns A section component producing a designation paragraph.
 */
export function Designation(
  title: string,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () =>
    withSpacingAfter(
      [paragraphFromToken(getStyles(styles).designation, title)],
      spacingAfter,
    );
}

/**
 * Contact information displayed as a single line with pipe separators.
 *
 * @param info - Contact details object.
 * @param styles - Optional style overrides.
 * @returns A section component producing a contact paragraph.
 */
export function Contact(
  info: ContactInfo,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () => {
    const s = getStyles(styles);
    const text = formatContact(info);
    return withSpacingAfter([paragraphFromToken(s.contact, text)], spacingAfter);
  };
}

/**
 * Address line displayed in small text.
 *
 * @param address - The address string.
 * @param styles - Optional style overrides.
 * @returns A section component producing an address paragraph.
 */
export function Address(
  address: string,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () =>
    withSpacingAfter(
      [paragraphFromToken(getStyles(styles).smallText, address)],
      spacingAfter,
    );
}

/**
 * A photo in the header, rendered as an image paragraph.
 *
 * @param config - Photo configuration with data, width, and height.
 * @returns A section component producing an image paragraph.
 */
export function Photo(
  config: PhotoConfig,
  spacingAfter?: number,
): SectionComponent {
  return () => {
    const image = new ImageRun({
      data: config.data,
      transformation: {
        width: config.width,
        height: config.height,
      },
      type: "png",
    });

    return [
      new Paragraph({
        children: [image],
        alignment: "left" as const,
        spacing: { after: spacingAfter ?? 100 },
      }),
    ];
  };
}
