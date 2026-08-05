import type {
  SectionComponent,
  ResumeStyles,
  ReferenceConfig,
} from "../types/index.js";
import { paragraphFromToken, inlineParagraph, textRunFromToken, getStyles, withSpacingAfter, splitSpacingAfter, Paragraph, TextRun } from "../core/index.js";

/**
 * A references section containing multiple reference entries.
 *
 * @param items - Reference components or plain text strings.
 * @returns A section component producing reference paragraphs.
 *
 * @example
 * ```ts
 * const refs = References(
 *   Reference({ name: "Jane Smith", title: "CTO", company: "ABC Corp", email: "jane@abc.com" })
 * );
 * ```
 */
export function References(
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
 * A single reference entry.
 *
 * @param config - Reference configuration.
 * @param styles - Optional style overrides.
 * @returns A section component producing paragraphs for one reference.
 */
export function Reference(
  config: ReferenceConfig,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () => {
    const s = getStyles(styles);
    const paragraphs: Paragraph[] = [];

    // Name
    paragraphs.push(paragraphFromToken(s.company, config.name));

    // Title and company
    const details = [config.title, config.company].filter(Boolean).join(" at ");
    if (details) {
      paragraphs.push(paragraphFromToken(s.text, details));
    }

    // Contact
    const contact = [config.email, config.phone].filter(Boolean).join(" | ");
    if (contact) {
      paragraphs.push(paragraphFromToken(s.smallText, contact));
    }

    return withSpacingAfter(paragraphs, spacingAfter);
  };
}

// Re-use Text from generic for string fallback
import { Text } from "./generic.js";
