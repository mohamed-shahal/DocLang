import type {
  SectionComponent,
  ResumeStyles,
  CertificationConfig,
} from "../types/index.js";
import { paragraphFromToken, inlineParagraph, getStyles, withSpacingAfter, splitSpacingAfter, Paragraph } from "../core/index.js";

/**
 * A certifications section containing multiple certification entries.
 *
 * @param items - Certification components or plain text strings.
 * @returns A section component producing certification paragraphs.
 *
 * @example
 * ```ts
 * const certs = Certifications(
 *   Certification({ name: "AWS Solutions Architect", issuer: "Amazon", date: "2023" })
 * );
 * ```
 */
export function Certifications(
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
 * A single certification entry.
 *
 * @param config - Certification configuration.
 * @param styles - Optional style overrides.
 * @returns A section component producing paragraphs for one certification.
 */
export function Certification(
  config: CertificationConfig,
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
            { token: s.company, text: config.name },
            { token: s.duration, text: rightPart },
          ],
          { tabStop: true, spacing: { before: 40, after: 0, line: 240 } },
        ),
      );
    } else {
      paragraphs.push(paragraphFromToken(s.company, config.name));
    }

    return withSpacingAfter(paragraphs, spacingAfter);
  };
}

// Re-use Text from generic for string fallback
import { Text } from "./generic.js";
