import type { ResumeStyles, StyleToken } from "../types/index.js";
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

const BORDER_STYLE_MAP: Record<string, (typeof BorderStyle)[keyof typeof BorderStyle]> = {
  single: BorderStyle.SINGLE,
  double: BorderStyle.DOUBLE,
  thick: BorderStyle.THICK,
  none: BorderStyle.NONE,
};

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

  return new Paragraph({
    children: [textRunFromToken(token, text)],
    spacing: token.spacing,
    alignment: alignmentMap[options?.alignment ?? token.alignment ?? "left"],
    numbering: options?.numbering,
    border: Object.keys(borderConfig).length > 0 ? borderConfig : undefined,
  });
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

  if (options?.tabStop) {
    children.push(
      new Tab(),
    );
  }

  for (const run of runs) {
    children.push(textRunFromToken(run.token, run.text));
  }

  return new Paragraph({
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
  });
}

/**
 * Create a divider (horizontal rule) paragraph.
 */
export function dividerParagraph(): Paragraph {
  return new Paragraph({
    spacing: { before: 70, after: 120 },
    border: {
      bottom: {
        color: "000000",
        space: 1,
        style: BorderStyle.SINGLE,
        size: 4,
      },
    },
  });
}

/**
 * Create a spacer paragraph with configurable height.
 */
export function spacerParagraph(points: number = 60): Paragraph {
  return new Paragraph({
    spacing: { after: points },
    children: [],
  });
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
