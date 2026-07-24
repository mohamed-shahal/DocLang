import type { SectionComponent, ResumeStyles } from "../types/index.js";
import {
  paragraphFromToken,
  dividerParagraph,
  spacerParagraph,
  getStyles,
  BULLET_NUMBERING,
} from "../core/index.js";

/**
 * A large heading paragraph.
 *
 * @param text - The heading text.
 * @param styles - Optional style overrides.
 * @returns A section component producing a heading paragraph.
 *
 * @example
 * ```ts
 * const heading = Heading("My Resume");
 * ```
 */
export function Heading(
  text: string,
  styles?: ResumeStyles,
): SectionComponent {
  return () => [paragraphFromToken(getStyles(styles).heading, text)];
}

/**
 * A sub-heading paragraph, typically used for subsection titles.
 *
 * @param text - The sub-heading text.
 * @param styles - Optional style overrides.
 * @returns A section component producing a sub-heading paragraph.
 */
export function SubHeading(
  text: string,
  styles?: ResumeStyles,
): SectionComponent {
  return () => [paragraphFromToken(getStyles(styles).subHeading, text)];
}

/**
 * A section heading paragraph with a distinctive accent color.
 *
 * @param text - The section heading text.
 * @param styles - Optional style overrides.
 * @returns A section component producing a section heading paragraph.
 */
export function SectionHeading(
  text: string,
  styles?: ResumeStyles,
): SectionComponent {
  return () => [paragraphFromToken(getStyles(styles).sectionHeading, text)];
}

/**
 * A normal text paragraph.
 *
 * @param text - The text content.
 * @param styles - Optional style overrides.
 * @returns A section component producing a text paragraph.
 */
export function Text(
  text: string,
  styles?: ResumeStyles,
): SectionComponent {
  return () => [paragraphFromToken(getStyles(styles).text, text)];
}

/**
 * A small text paragraph for secondary information.
 *
 * @param text - The text content.
 * @param styles - Optional style overrides.
 * @returns A section component producing a small text paragraph.
 */
export function SmallText(
  text: string,
  styles?: ResumeStyles,
): SectionComponent {
  return () => [paragraphFromToken(getStyles(styles).smallText, text)];
}

/**
 * A single bullet point paragraph.
 *
 * @param text - The bullet text.
 * @param styles - Optional style overrides.
 * @returns A section component producing a bullet paragraph.
 */
export function Bullet(
  text: string,
  styles?: ResumeStyles,
): SectionComponent {
  return () => [
    paragraphFromToken(getStyles(styles).bullet, text, {
      numbering: { reference: BULLET_NUMBERING, level: 0 },
    }),
  ];
}

/**
 * A list of bullet points.
 *
 * @param items - Text items or SectionComponent items (e.g., Bullet instances).
 * @param styles - Optional style overrides.
 * @returns A section component producing multiple bullet paragraphs.
 */
export function BulletList(
  items: Array<string | SectionComponent>,
  styles?: ResumeStyles,
): SectionComponent {
  return () => {
    const s = getStyles(styles);
    const paragraphs = [];

    for (const item of items) {
      if (typeof item === "string") {
        paragraphs.push(
          paragraphFromToken(s.bullet, item, {
            numbering: { reference: BULLET_NUMBERING, level: 0 },
          }),
        );
      } else {
        paragraphs.push(...item());
      }
    }

    return paragraphs;
  };
}

/**
 * A horizontal divider line.
 *
 * @returns A section component producing a divider paragraph.
 */
export function Divider(): SectionComponent {
  return () => [dividerParagraph()];
}

/**
 * Vertical spacing between sections.
 *
 * @param points - Space in twips (default 60).
 * @returns A section component producing a spacer paragraph.
 */
export function Spacer(points?: number): SectionComponent {
  return () => [spacerParagraph(points)];
}
