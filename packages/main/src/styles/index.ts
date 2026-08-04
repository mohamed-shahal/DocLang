import type { ResumeStyles } from "../types/index.js";

/**
 * Default style tokens for the resume.
 * Override individual tokens via {@link createStyles}.
 */
export const defaultStyles: ResumeStyles = {
  name: {
    font: "Arial",
    size: 38,
    bold: true,
    color: "000000",
    spacing: { before: 0, after: 50, line: 276 },
  },
  designation: {
    font: "Arial",
    size: 18,
    bold: false,
    color: "000000",
    spacing: { before: 0, after: 65, line: 276 },
  },
  contact: {
    font: "Arial",
    size: 17,
    color: "000000",
    spacing: { before: 0, after: 0, line: 240 },
  },
  sectionHeading: {
    font: "Arial",
    size: 20,
    bold: true,
    uppercase: true,
    color: "000000",
    spacing: { before: 160, after: 44, line: 276 },
    border: {
      bottom: {
        style: "single",
        size: 8,
        color: "000000",
        space: 1,
      },
    },
  },
  text: {
    font: "Arial",
    size: 18,
    color: "000000",
    spacing: { before: 0, after: 50, line: 276 },
  },
  smallText: {
    font: "Arial",
    size: 17,
    color: "000000",
    spacing: { before: 0, after: 20, line: 240 },
  },
  bullet: {
    font: "Arial",
    size: 18,
    color: "000000",
    spacing: { before: 0, after: 30, line: 276 },
  },
  company: {
    font: "Arial",
    size: 17,
    italics: true,
    color: "333333",
    spacing: { before: 0, after: 48, line: 276 },
  },
  duration: {
    font: "Arial",
    size: 17,
    color: "333333",
    spacing: { before: 0, after: 0, line: 276 },
  },
  heading: {
    font: "Arial",
    size: 20,
    bold: true,
    color: "000000",
    spacing: { before: 0, after: 60, line: 276 },
  },
  subHeading: {
    font: "Arial",
    size: 18,
    bold: true,
    color: "000000",
    spacing: { before: 80, after: 40, line: 276 },
  },
  skill: {
    font: "Arial",
    size: 18,
    color: "000000",
    spacing: { before: 0, after: 24, line: 276 },
  },
};

/**
 * Create a merged style configuration from partial overrides.
 *
 * @param overrides - Partial style overrides to apply on top of defaults.
 * @returns Complete {@link ResumeStyles} configuration.
 *
 * @example
 * ```ts
 * const customStyles = createStyles({
 *   heading: { color: "FF0000", size: 32 },
 *   name: { font: "Georgia" },
 * });
 * ```
 */
export function createStyles(
  overrides: Partial<ResumeStyles> = {},
): ResumeStyles {
  const merged = { ...defaultStyles };

  for (const key of Object.keys(overrides) as Array<keyof ResumeStyles>) {
    if (overrides[key]) {
      merged[key] = { ...merged[key], ...overrides[key] };
    }
  }

  return merged;
}
