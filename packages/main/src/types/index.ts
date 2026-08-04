import type {
  Paragraph,
  Table,
  ImageRun,
  ExternalHyperlink,
} from "docx";

/**
 * A single child element that can be rendered inside a section or component.
 */
export type DocChild =
  | Paragraph
  | Table
  | ImageRun
  | ExternalHyperlink
  | DocChild[];

/**
 * A component function that produces docx child elements.
 */
export type Component = () => DocChild[];

/**
 * A section component that produces a block of paragraphs for the document body.
 */
export type SectionComponent = () => Paragraph[];

/**
 * Contact information for the resume header.
 */
export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  location?: string;
}

/**
 * Configuration for a photo in the resume header.
 */
export interface PhotoConfig {
  data: string | Buffer;
  width: number;
  height: number;
  /**
   * Circular photo crop (border radius).
   */
  circular?: boolean;
}

/**
 * Configuration for a generic image component.
 */
export interface ImageConfig {
  data: string | Buffer;
  width: number;
  height: number;
  /**
   * Paragraph alignment. Defaults to "right".
   */
  alignment?: "left" | "center" | "right";
}

/**
 * Configuration for an experience item.
 */
export interface ExperienceItemConfig {
  company: string;
  designation: string;
  duration: string;
  points: string[];
}

/**
 * Configuration for an education item.
 */
export interface EducationItemConfig {
  degree: string;
  institution: string;
  year: string;
}

/**
 * Configuration for a project item.
 */
export interface ProjectConfig {
  name: string;
  description?: string;
  points?: string[];
  link?: string;
}

/**
 * Configuration for a certification item.
 */
export interface CertificationConfig {
  name: string;
  issuer?: string;
  date?: string;
}

/**
 * Configuration for a language item.
 */
export interface LanguageConfig {
  name: string;
  proficiency?: string;
}

/**
 * Configuration for an award item.
 */
export interface AwardConfig {
  title: string;
  date?: string;
  issuer?: string;
}

/**
 * Configuration for a reference item.
 */
export interface ReferenceConfig {
  name: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
}

/**
 * Style token definition with optional overrides.
 */
export interface StyleToken {
  font?: string;
  size?: number;
  bold?: boolean;
  italics?: boolean;
  uppercase?: boolean;
  color?: string;
  spacing?: {
    before?: number;
    after?: number;
    line?: number;
  };
  alignment?: "left" | "center" | "right";
  border?: {
    bottom?: {
      style?: "single" | "double" | "thick" | "none";
      size?: number;
      color?: string;
      space?: number;
    };
  };
}

/**
 * Complete style configuration for a resume theme.
 */
export interface ResumeStyles {
  heading: StyleToken;
  subHeading: StyleToken;
  sectionHeading: StyleToken;
  designation: StyleToken;
  text: StyleToken;
  smallText: StyleToken;
  bullet: StyleToken;
  company: StyleToken;
  duration: StyleToken;
  name: StyleToken;
  contact: StyleToken;
  skill: StyleToken;
}
