import type {
  SectionComponent,
  ResumeStyles,
  ExperienceItemConfig,
} from "../types/index.js";
import { paragraphFromToken, inlineParagraph, getStyles, withSpacingAfter, splitSpacingAfter, Paragraph, BULLET_NUMBERING } from "../core/index.js";

/**
 * A section heading labeled "Experience".
 *
 * @param label - Optional custom label (default "Experience").
 * @param styles - Optional style overrides.
 * @returns A section component producing a section heading.
 */
export function Experience(
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
 * A single experience entry with company, designation, duration, and bullet points.
 *
 * @param config - Experience item configuration.
 * @param styles - Optional style overrides.
 * @returns A section component producing paragraphs for one experience entry.
 *
 * @example
 * ```ts
 * const exp = ExperienceItem({
 *   company: "ABC Corp",
 *   designation: "Developer",
 *   duration: "2020 - Present",
 *   points: ["Built things", "Shipped features"]
 * });
 * ```
 */
export function ExperienceItem(
  config: ExperienceItemConfig,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () => {
    const s = getStyles(styles);
    const paragraphs: Paragraph[] = [];

    // Designation (job title) first, in bold
    paragraphs.push(paragraphFromToken(s.designation, config.designation));

    // Company name and duration on one line
    paragraphs.push(
      inlineParagraph(
        [
          { token: s.company, text: config.company },
          { token: s.duration, text: config.duration },
        ],
        { tabStop: true, spacing: { before: 0, after: 20, line: 240 } },
      ),
    );

    // Bullet points
    for (const point of config.points) {
      paragraphs.push(
        paragraphFromToken(s.bullet, point, {
          numbering: { reference: BULLET_NUMBERING, level: 0 },
        }),
      );
    }

    return withSpacingAfter(paragraphs, spacingAfter);
  };
}

/**
 * The company name component for inline use.
 *
 * @param name - Company name.
 * @param styles - Optional style overrides.
 * @param spacingAfter - Optional extra space (in twips) after the paragraph.
 * @returns A section component producing a company paragraph.
 */
export function Company(
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
 * The duration component for inline use.
 *
 * @param text - Duration text (e.g., "2020 - Present").
 * @param styles - Optional style overrides.
 * @param spacingAfter - Optional extra space (in twips) after the paragraph.
 * @returns A section component producing a duration paragraph.
 */
export function Duration(
  text: string,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () =>
    withSpacingAfter(
      [paragraphFromToken(getStyles(styles).duration, text)],
      spacingAfter,
    );
}

// Re-use Text from generic for string fallback in Experience
import { Text } from "./generic.js";
