import type { SectionComponent, ResumeStyles } from "../types/index.js";
import { paragraphFromToken, getStyles, withSpacingAfter } from "../core/index.js";

/**
 * A professional summary paragraph.
 *
 * @param text - The summary text.
 * @param styles - Optional style overrides.
 * @returns A section component producing a summary paragraph.
 *
 * @example
 * ```ts
 * const summary = Summary("Passionate engineer with 5+ years of experience.");
 * ```
 */
export function Summary(
  text: string,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () =>
    withSpacingAfter(
      [paragraphFromToken(getStyles(styles).text, text)],
      spacingAfter,
    );
}

/**
 * A career objective paragraph.
 *
 * @param text - The objective text.
 * @param styles - Optional style overrides.
 * @returns A section component producing an objective paragraph.
 */
export function Objective(
  text: string,
  styles?: ResumeStyles,
  spacingAfter?: number,
): SectionComponent {
  return () =>
    withSpacingAfter(
      [paragraphFromToken(getStyles(styles).text, text)],
      spacingAfter,
    );
}
