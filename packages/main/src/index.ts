export { defaultStyles, createStyles } from "./styles/index.js";

export type { ResumeStyles, StyleToken } from "./types/index.js";

export {
  textRunFromToken,
  paragraphFromToken,
  inlineParagraph,
  dividerParagraph,
  spacerParagraph,
  getStyles,
} from "./core/index.js";

export { formatContact, normalizeList, sectionId } from "./utils/index.js";
export { exportFile } from "./utils/export.js";
export type { ExportOptions, ExportResult } from "./utils/export.js";

// Generic
export {
  Heading,
  SubHeading,
  SectionHeading,
  Text,
  SmallText,
  Bullet,
  BulletList,
  Divider,
  Spacer,
} from "./components/generic.js";

// Header
export {
  Header,
  Name,
  Designation,
  Contact,
  Address,
  Photo,
} from "./components/header.js";
export { PhotoPath } from "./components/photo.js";
export { ResumeImage } from "./components/image.js";

// Profile
export { Summary, Objective } from "./components/profile.js";

// Experience
export {
  Experience,
  ExperienceItem,
  Company,
  Duration,
} from "./components/experience.js";

// Education
export {
  Education,
  EducationItem,
  Institution,
  Degree,
} from "./components/education.js";

// Skills
export { Skills, Skill } from "./components/skills.js";

// Projects
export { Projects, Project } from "./components/projects.js";

// Certifications
export { Certifications, Certification } from "./components/certifications.js";

// Languages
export { Languages, Language } from "./components/languages.js";

// Awards
export { Awards, Award } from "./components/awards.js";

// References
export { References, Reference } from "./components/references.js";

// Resume root
export { Resume } from "./components/resume.js";

// Types
export type {
  DocChild,
  Component,
  SectionComponent,
  ContactInfo,
  PhotoConfig,
  ImageConfig,
  ExperienceItemConfig,
  EducationItemConfig,
  ProjectConfig,
  CertificationConfig,
  LanguageConfig,
  AwardConfig,
  ReferenceConfig,
} from "./types/index.js";
