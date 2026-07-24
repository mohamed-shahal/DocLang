import type {
  SectionComponent,
  ResumeStyles,
  ExperienceItemConfig,
} from "../types/index.js";
import { paragraphFromToken, inlineParagraph, getStyles, Paragraph, BULLET_NUMBERING } from "../core/index.js";

/**
 * A section heading labeled "Experience".
 *
 * @param label - Optional custom label (default "Experience").
 * @param styles - Optional style overrides.
 * @returns A section component producing a section heading.
 */
export function Experience(
  ...items: Array<SectionComponent | string>
): SectionComponent {
  return () => {
    const paragraphs: Paragraph[] = [];

    for (const item of items) {
      if (typeof item === "string") {
        paragraphs.push(...Text(item)());
      } else {
        paragraphs.push(...item());
      }
    }

    return paragraphs;
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
): SectionComponent {
  return () => {
    const s = getStyles(styles);
    const paragraphs: Paragraph[] = [];

    // Company name and duration on one line
    paragraphs.push(
      inlineParagraph(
        [
          { token: s.company, text: config.company },
          { token: s.duration, text: config.duration },
        ],
        { tabStop: true, spacing: { before: 120, after: 0, line: 276 } },
      ),
    );

    // Designation
    paragraphs.push(paragraphFromToken(s.designation, config.designation));

    // Bullet points
    for (const point of config.points) {
      paragraphs.push(
        paragraphFromToken(s.bullet, point, {
          numbering: { reference: BULLET_NUMBERING, level: 0 },
        }),
      );
    }

    return paragraphs;
  };
}

/**
 * The company name component for inline use.
 *
 * @param name - Company name.
 * @param styles - Optional style overrides.
 * @returns A section component producing a company paragraph.
 */
export function Company(
  name: string,
  styles?: ResumeStyles,
): SectionComponent {
  return () => [paragraphFromToken(getStyles(styles).company, name)];
}

/**
 * The duration component for inline use.
 *
 * @param text - Duration text (e.g., "2020 - Present").
 * @param styles - Optional style overrides.
 * @returns A section component producing a duration paragraph.
 */
export function Duration(
  text: string,
  styles?: ResumeStyles,
): SectionComponent {
  return () => [paragraphFromToken(getStyles(styles).duration, text)];
}

// Re-use Text from generic for string fallback in Experience
import { Text } from "./generic.js";
