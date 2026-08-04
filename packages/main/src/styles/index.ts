import type { ResumeStyles } from "../types/index.js";

/**
 * Default style tokens for the resume.
 * Override individual tokens via {@link createStyles}.
 */
export const defaultStyles: ResumeStyles = {
  name: {
    font: "Arial",
    size: 40,
    bold: true,
    color: "000000",
    spacing: { before: 0, after: 40, line: 240 },
  },
  designation: {
    font: "Arial",
    size: 22,
    bold: true,
    color: "333333",
    spacing: { before: 0, after: 30, line: 240 },
  },
  contact: {
    font: "Arial",
    size: 18,
    color: "333333",
    spacing: { before: 0, after: 80, line: 240 },
  },
  sectionHeading: {
    font: "Arial",
    size: 21,
    bold: true,
    uppercase: true,
    color: "000000",
    spacing: { before: 200, after: 50, line: 240 },
    border: {
      bottom: {
        style: "single",
        size: 6,
        color: "000000",
        space: 2,
      },
    },
  },
  text: {
    font: "Arial",
    size: 20,
    color: "000000",
    spacing: { before: 0, after: 50, line: 240 },
  },
  smallText: {
    font: "Arial",
    size: 18,
    color: "555555",
    spacing: { before: 0, after: 20, line: 240 },
  },
  bullet: {
    font: "Arial",
    size: 20,
    color: "000000",
    spacing: { before: 0, after: 40, line: 240 },
  },
  company: {
    font: "Arial",
    size: 20,
    bold: false,
    color: "000000",
    spacing: { before: 0, after: 30, line: 240 },
  },
  duration: {
    font: "Arial",
    size: 18,
    color: "555555",
    spacing: { before: 0, after: 0, line: 240 },
  },
  heading: {
    font: "Arial",
    size: 24,
    bold: true,
    color: "000000",
    spacing: { before: 0, after: 60, line: 240 },
  },
  subHeading: {
    font: "Arial",
    size: 21,
    bold: true,
    color: "333333",
    spacing: { before: 100, after: 30, line: 240 },
  },
  skill: {
    font: "Arial",
    size: 20,
    color: "000000",
    spacing: { before: 0, after: 30, line: 240 },
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
