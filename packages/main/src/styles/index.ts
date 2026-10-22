import type { ResumeStyles } from "../types/index.js";

/**
 * Default style tokens for the resume.
 * Override individual tokens via {@link createStyles}.
 */
export const defaultStyles: ResumeStyles = {
  name: {
    font: "Arial",
    size: 52,
    bold: true,
    color: "000000",
    alignment: "left",
    spacing: { before: 0, after: 30, line: 280 },
  },
  designation: {
    font: "Arial",
    size: 23,
    color: "000000",
    alignment: "left",
    spacing: { before: 0, after: 55, line: 260 },
  },
  contact: {
    font: "Arial",
    size: 18,
    color: "000000",
    alignment: "left",
    spacing: { before: 0, after: 150, line: 250 },
  },
  sectionHeading: {
    font: "Arial",
    size: 22,
    bold: true,
    uppercase: true,
    color: "000000",
    spacing: { before: 190, after: 70, line: 260 },
    border: {
      bottom: {
        style: "single",
        size: 8,
        color: "000000",
        space: 3,
      },
    },
  },
  text: {
    font: "Arial",
    size: 20,
    color: "000000",
    spacing: { before: 0, after: 75, line: 270 },
  },
  smallText: {
    font: "Arial",
    size: 17,
    color: "000000",
    spacing: { before: 0, after: 35, line: 250 },
  },
  bullet: {
    font: "Arial",
    size: 20,
    color: "000000",
    spacing: { before: 0, after: 42, line: 260 },
  },
  company: {
    font: "Arial",
    size: 20,
    bold: true,
    color: "000000",
    spacing: { before: 0, after: 55, line: 260 },
  },
  duration: {
    font: "Arial",
    size: 17,
    italics: true,
    color: "000000",
    spacing: { before: 0, after: 0, line: 250 },
  },
  heading: {
    font: "Arial",
    size: 30,
    bold: true,
    color: "000000",
    spacing: { before: 0, after: 90, line: 300 },
  },
  subHeading: {
    font: "Arial",
    size: 23,
    bold: true,
    color: "000000",
    spacing: { before: 120, after: 55, line: 270 },
  },
  skill: {
    font: "Arial",
    size: 20,
    color: "000000",
    spacing: { before: 0, after: 45, line: 260 },
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
      const base = merged[key];
      const override = overrides[key]!;
      merged[key] = {
        ...base,
        ...override,
        spacing: override.spacing
          ? { ...base.spacing, ...override.spacing }
          : base.spacing,
        border: override.border
          ? {
              ...base.border,
              ...override.border,
              bottom: override.border.bottom
                ? { ...base.border?.bottom, ...override.border.bottom }
                : base.border?.bottom,
            }
          : base.border,
      };
    }
  }

  return merged;
}
