import type { ResumeStyles, StyleToken, SectionComponent } from "../types/index.js";
import { defaultStyles } from "../styles/index.js";
import {
  Paragraph,
  TextRun,
  Document,
  AlignmentType,
  HeadingLevel,
  Tab,
  TabStopPosition,
  TabStopType,
  ImageRun,
  BorderStyle,
  HeightRule,
  TableRow,
  Table,
  WidthType,
  convertInchesToTwip,
  LevelFormat,
  Packer,
} from "docx";
import type { IParagraphOptions } from "docx";

const BORDER_STYLE_MAP: Record<string, (typeof BorderStyle)[keyof typeof BorderStyle]> = {
  single: BorderStyle.SINGLE,
  double: BorderStyle.DOUBLE,
  thick: BorderStyle.THICK,
  none: BorderStyle.NONE,
};

/**
 * Tracks the construction options of every paragraph so that spacing can be
 * re-applied later (e.g. the shared `spacingAfter` component parameter).
 */
const paragraphOptions = new WeakMap<Paragraph, IParagraphOptions>();

function trackParagraph(
  paragraph: Paragraph,
  options: IParagraphOptions,
): Paragraph {
  paragraphOptions.set(paragraph, options);
  return paragraph;
}

/**
 * Apply an extra `spacing.after` value to the last paragraph of a list.
 * When `spacingAfter` is undefined the list is returned unchanged.
 */
export function withSpacingAfter(
  paragraphs: Paragraph[],
  spacingAfter?: number,
): Paragraph[] {
  if (spacingAfter === undefined || paragraphs.length === 0) {
    return paragraphs;
  }

  const last = paragraphs[paragraphs.length - 1];
  const options = paragraphOptions.get(last);

  if (options) {
    paragraphs[paragraphs.length - 1] = new Paragraph({
      ...options,
      spacing: { ...(options.spacing ?? {}), after: spacingAfter },
    });
  }

  return paragraphs;
}

/**
 * Extract an optional trailing `spacingAfter` number from variadic component
 * arguments (components use rest parameters, so the value is passed last).
 */
export function splitSpacingAfter(
  args: Array<SectionComponent | string | number>,
): { items: Array<SectionComponent | string>; spacingAfter?: number } {
  if (args.length > 0 && typeof args[args.length - 1] === "number") {
    return {
      items: args.slice(0, -1) as Array<SectionComponent | string>,
      spacingAfter: args[args.length - 1] as number,
    };
  }
  return { items: args as Array<SectionComponent | string> };
}

/**
 * Create a TextRun from a StyleToken.
 */
export function textRunFromToken(
  token: StyleToken,
  text: string,
): TextRun {
  const displayText = token.uppercase ? text.toUpperCase() : text;

  return new TextRun({
    text: displayText,
    font: token.font,
    size: token.size,
    bold: token.bold,
    italics: token.italics,
    color: token.color,
  });
}

/**
 * Create a Paragraph from a StyleToken and text content.
 */
export function paragraphFromToken(
  token: StyleToken,
  text: string,
  options?: {
    alignment?: StyleToken["alignment"];
    bullet?: boolean;
    numbering?: { reference: string; level: number };
  },
): Paragraph {
  const alignmentMap: Record<string, (typeof AlignmentType)[keyof typeof AlignmentType]> = {
    left: AlignmentType.LEFT,
    center: AlignmentType.CENTER,
    right: AlignmentType.RIGHT,
  };

  const borderConfig: Record<string, { style: (typeof BorderStyle)[keyof typeof BorderStyle]; size: number; color: string; space: number }> = {};
  if (token.border?.bottom) {
    borderConfig.bottom = {
      style: BORDER_STYLE_MAP[token.border.bottom.style ?? "single"] ?? BorderStyle.SINGLE,
      size: token.border.bottom.size ?? 6,
      color: token.border.bottom.color ?? "000000",
      space: token.border.bottom.space ?? 1,
    };
  }

  const children = [textRunFromToken(token, text)];

  return trackParagraph(
    new Paragraph({
      children,
      spacing: token.spacing,
      alignment: alignmentMap[options?.alignment ?? token.alignment ?? "left"],
      numbering: options?.numbering,
      border: Object.keys(borderConfig).length > 0 ? borderConfig : undefined,
    }),
    {
      children,
      spacing: token.spacing,
      alignment: alignmentMap[options?.alignment ?? token.alignment ?? "left"],
      numbering: options?.numbering,
      border: Object.keys(borderConfig).length > 0 ? borderConfig : undefined,
    },
  );
}

/**
 * Create a Paragraph with mixed inline runs (e.g., company + duration on one line).
 */
export function inlineParagraph(
  runs: Array<{ token: StyleToken; text: string }>,
  options?: {
    spacing?: StyleToken["spacing"];
    alignment?: StyleToken["alignment"];
    tabStop?: boolean;
  },
): Paragraph {
  const alignmentMap: Record<string, (typeof AlignmentType)[keyof typeof AlignmentType]> = {
    left: AlignmentType.LEFT,
    center: AlignmentType.CENTER,
    right: AlignmentType.RIGHT,
  };

  const children: (TextRun | Tab)[] = [];

  for (const [index, run] of runs.entries()) {
    const text = index > 0 && options?.tabStop ? `\t${run.text}` : run.text;
    children.push(textRunFromToken(run.token, text));
  }

  return trackParagraph(
    new Paragraph({
      children,
      spacing: options?.spacing,
      alignment: options?.alignment
        ? alignmentMap[options.alignment]
        : undefined,
      tabStops: options?.tabStop
        ? [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ]
        : undefined,
    }),
    {
      children,
      spacing: options?.spacing,
      alignment: options?.alignment
        ? alignmentMap[options.alignment]
        : undefined,
      tabStops: options?.tabStop
        ? [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ]
        : undefined,
    },
  );
}

/**
 * Create a divider (horizontal rule) paragraph.
 */
export function dividerParagraph(): Paragraph {
  return trackParagraph(
    new Paragraph({
      spacing: { before: 70, after: 120 },
      border: {
        bottom: {
          color: "000000",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 4,
        },
      },
    }),
    {
      spacing: { before: 70, after: 120 },
      border: {
        bottom: {
          color: "000000",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 4,
        },
      },
    },
  );
}

/**
 * Create a spacer paragraph with configurable height.
 */
export function spacerParagraph(points: number = 60): Paragraph {
  return trackParagraph(
    new Paragraph({ spacing: { after: points }, children: [] }),
    { spacing: { after: points }, children: [] },
  );
}

/**
 * Get the styles object, defaulting to built-in styles.
 */
export function getStyles(styles?: ResumeStyles): ResumeStyles {
  return styles ?? defaultStyles;
}

/**
 * The numbering reference key for bullet lists.
 */
export const BULLET_NUMBERING = "doclang-bullets";

/**
 * Create the numbering configuration for bullet lists.
 */
export function createBulletNumbering() {
  return [
    {
      reference: BULLET_NUMBERING,
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: {
              indent: { left: 440, hanging: 220 },
            },
          },
        },
      ],
    },
  ];
}

export {
  trackParagraph,
  Paragraph,
  TextRun,
  Document,
  AlignmentType,
  HeadingLevel,
  Tab,
  TabStopPosition,
  TabStopType,
  ImageRun,
  BorderStyle,
  HeightRule,
  TableRow,
  Table,
  WidthType,
  convertInchesToTwip,
  Packer,
  LevelFormat,
};
