import type { SectionComponent, ResumeStyles } from "../types/index.js";
import { paragraphFromToken, textRunFromToken, getStyles, withSpacingAfter, splitSpacingAfter, trackParagraph, Paragraph, TextRun } from "../core/index.js";

/**
 * A skills section displaying skill tags inline.
 *
 * @param skills - Skill components or plain text strings.
 * @returns A section component producing skill paragraphs.
 *
 * @example
 * ```ts
 * const skills = Skills(
 *   Skill("TypeScript"),
 *   Skill("React"),
 *   "Node.js"
 * );
 * ```
 */
export function Skills(
  ...skills: Array<SectionComponent | string | number>
): SectionComponent {
  return () => {
    const { items, spacingAfter } = splitSpacingAfter(skills);
    const paragraphs: Paragraph[] = [];

    for (const skill of items) {
      if (typeof skill === "string") {
        paragraphs.push(...Text(skill)());
      } else {
        paragraphs.push(...skill());
      }
    }

    return withSpacingAfter(paragraphs, spacingAfter);
  };
}

/**
 * A single skill displayed as a bullet point.
 *
 * @param name - The skill name.
 * @param styles - Optional style overrides.
 * @param spacingAfter - Optional extra space (in twips) after the paragraph.
 * @returns A section component producing a skill paragraph.
 */
export function Skill(
  name: string,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () => {
    const s = getStyles(styles);
    const options = {
      children: [textRunFromToken(s.skill, name)],
      spacing: s.skill.spacing,
    };
    return withSpacingAfter(
      [trackParagraph(new Paragraph(options), options)],
      spacingAfter,
    );
  };
}

// Re-use Text from generic for string fallback
import { Text } from "./generic.js";
