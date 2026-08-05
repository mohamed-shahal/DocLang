import type {
  SectionComponent,
  ResumeStyles,
  AwardConfig,
} from "../types/index.js";
import { paragraphFromToken, inlineParagraph, getStyles, withSpacingAfter, splitSpacingAfter, Paragraph } from "../core/index.js";

/**
 * An awards section containing multiple award entries.
 *
 * @param items - Award components or plain text strings.
 * @returns A section component producing award paragraphs.
 *
 * @example
 * ```ts
 * const awards = Awards(
 *   Award({ title: "Best Developer", date: "2023", issuer: "ABC Corp" })
 * );
 * ```
 */
export function Awards(
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
 * A single award entry.
 *
 * @param config - Award configuration.
 * @param styles - Optional style overrides.
 * @returns A section component producing paragraphs for one award.
 */
export function Award(
  config: AwardConfig,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () => {
    const s = getStyles(styles);
    const paragraphs: Paragraph[] = [];

    const rightPart = [config.issuer, config.date].filter(Boolean).join(", ");

    if (rightPart) {
      paragraphs.push(
        inlineParagraph(
          [
            { token: s.company, text: config.title },
            { token: s.duration, text: rightPart },
          ],
          { tabStop: true, spacing: { before: 40, after: 0, line: 276 } },
        ),
      );
    } else {
      paragraphs.push(paragraphFromToken(s.company, config.title));
    }

    return withSpacingAfter(paragraphs, spacingAfter);
  };
}

// Re-use Text from generic for string fallback
import { Text } from "./generic.js";
