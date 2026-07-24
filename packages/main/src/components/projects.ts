import type {
  SectionComponent,
  ResumeStyles,
  ProjectConfig,
} from "../types/index.js";
import { paragraphFromToken, inlineParagraph, textRunFromToken, getStyles, Paragraph, TextRun, BULLET_NUMBERING } from "../core/index.js";

/**
 * A projects section containing multiple project entries.
 *
 * @param items - Project components or plain text strings.
 * @returns A section component producing project paragraphs.
 *
 * @example
 * ```ts
 * const projects = Projects(
 *   Project({
 *     name: "DocLang",
 *     description: "Resume builder library",
 *     points: ["Built with TypeScript", "Uses docx package"]
 *   })
 * );
 * ```
 */
export function Projects(
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
 * A single project entry with name, optional description, and bullet points.
 *
 * @param config - Project configuration.
 * @param styles - Optional style overrides.
 * @returns A section component producing paragraphs for one project entry.
 */
export function Project(
  config: ProjectConfig,
  styles?: ResumeStyles,
): SectionComponent {
  return () => {
    const s = getStyles(styles);
    const paragraphs: Paragraph[] = [];

    // Project name
    paragraphs.push(paragraphFromToken(s.company, config.name));

    // Description
    if (config.description) {
      paragraphs.push(paragraphFromToken(s.text, config.description));
    }

    // Bullet points
    if (config.points) {
      for (const point of config.points) {
        paragraphs.push(
          paragraphFromToken(s.bullet, point, {
            numbering: { reference: BULLET_NUMBERING, level: 0 },
          }),
        );
      }
    }

    return paragraphs;
  };
}

// Re-use Text from generic for string fallback
import { Text } from "./generic.js";
