import type {
  SectionComponent,
  ResumeStyles,
  EducationItemConfig,
} from "../types/index.js";
import { paragraphFromToken, inlineParagraph, getStyles, withSpacingAfter, splitSpacingAfter, Paragraph } from "../core/index.js";

/**
 * An education section containing multiple education items.
 *
 * @param items - EducationItem components or plain text strings.
 * @returns A section component producing education paragraphs.
 *
 * @example
 * ```ts
 * const edu = Education(
 *   EducationItem({
 *     degree: "B.Tech CS",
 *     institution: "XYZ University",
 *     year: "2023"
 *   })
 * );
 * ```
 */
export function Education(
  ...items: Array<SectionComponent | string | number>
): SectionComponent {
  return () => {
    const { items: children, spacingAfter } = splitSpacingAfter(items);
    const paragraphs: Paragraph[] = [];

    for (const item of children) {
      if (typeof item === "string") {
        paragraphs.push(...Text(item)());
      } else {
        paragraphs.push(...item());
      }
    }

    return withSpacingAfter(paragraphs, spacingAfter);
  };
}

/**
 * A single education entry with degree, institution, and graduation year.
 *
 * @param config - Education item configuration.
 * @param styles - Optional style overrides.
 * @returns A section component producing paragraphs for one education entry.
 */
export function EducationItem(
  config: EducationItemConfig,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () => {
    const s = getStyles(styles);
    const paragraphs: Paragraph[] = [];

    // Degree first, in bold
    paragraphs.push(paragraphFromToken(s.designation, config.degree));

    // Institution and year on one line
    paragraphs.push(
      inlineParagraph(
        [
          { token: s.company, text: config.institution },
          { token: s.duration, text: config.year },
        ],
        { tabStop: true, spacing: { before: 0, after: 20, line: 240 } },
      ),
    );

    return withSpacingAfter(paragraphs, spacingAfter);
  };
}

/**
 * The institution name component for inline use.
 *
 * @param name - Institution name.
 * @param styles - Optional style overrides.
 * @param spacingAfter - Optional extra space (in twips) after the paragraph.
 * @returns A section component producing an institution paragraph.
 */
export function Institution(
  name: string,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () =>
    withSpacingAfter(
      [paragraphFromToken(getStyles(styles).company, name)],
      spacingAfter,
    );
}

/**
 * The degree component for inline use.
 *
 * @param name - Degree name.
 * @param styles - Optional style overrides.
 * @param spacingAfter - Optional extra space (in twips) after the paragraph.
 * @returns A section component producing a degree paragraph.
 */
export function Degree(
  name: string,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () =>
    withSpacingAfter(
      [paragraphFromToken(getStyles(styles).designation, name)],
      spacingAfter,
    );
}

// Re-use Text from generic for string fallback
import { Text } from "./generic.js";
