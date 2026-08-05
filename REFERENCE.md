# DocLang Library Reference

A TypeScript library for creating professional Microsoft Word resumes using semantic components.

---

## Table of Contents

- [Installation](#installation)
- [CDN Usage](#cdn-usage)
- [Core](#core)
- [Generic Components](#generic-components)
- [Header Components](#header-components)
- [Profile Components](#profile-components)
- [Experience Components](#experience-components)
- [Education Components](#education-components)
- [Skills Components](#skills-components)
- [Projects Components](#projects-components)
- [Certifications Components](#certifications-components)
- [Languages Components](#languages-components)
- [Awards Components](#awards-components)
- [References Components](#references-components)
- [Styles System](#styles-system)
- [Types](#types)
- [Utilities](#utilities)
  - [`exportFile`](#exportfiledocument-options)
- [Full Example](#full-example)

---

## Installation

```bash
npm install doclang docx
# or
pnpm add doclang docx
```

`docx` is a peer dependency used for packing the final document.

---

## CDN Usage

```html
<script src="https://unpkg.com/doclang/dist/doclang.min.js"></script>
<script>
  const { Resume, Header, Name } = DocLang;
  const { Packer } = DocLang.docx;
</script>
```

See [README.md](./README.md) for full CDN setup instructions.

---

## Core

### `Resume(...sections)`

The root component that assembles all sections into a `docx.Document`.

```ts
function Resume(...sections: Array<SectionComponent | string>): Document
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `sections` | `(SectionComponent \| string)[]` | Child components or raw strings |

**Returns:** `Document` from the `docx` package, ready to be packed.

**Example (recommended):**

```ts
import { Resume, Header, Name, Summary, exportFile } from "doclang";

const doc = Resume(
  Header(Name("John Doe")),
  Summary("Experienced developer.")
);

await exportFile(doc, { fileName: "resume" });
```

**Example (manual packing):**

```ts
import { Packer } from "docx";
import { Resume, Header, Name, Summary } from "doclang";

const doc = Resume(
  Header(Name("John Doe")),
  Summary("Experienced developer.")
);

const buffer = await Packer.toBuffer(doc);
```

Page margins are set to 0.8in top/bottom and 1in left/right by default.

---

### `spacingAfter` (available on every component)

Every component accepts an optional trailing `spacingAfter` argument — a number of twips (`1/20` pt, so `240` twips = one blank line at single spacing) — that sets the space rendered below the component's last paragraph.

When omitted, the component's default spacing is used, so existing code is unaffected.

```ts
function Summary(text: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:**

```ts
Summary("Experienced developer.", undefined, 300)   // 300 twips of space below
```

**Conventions:**

- Leaf components take it as a trailing third argument: `Summary(text, styles?, spacingAfter?)`.
- Variadic containers (`Header`, `Experience`, `Education`, `Skills`, `Projects`, `Certifications`, `Languages`, `Awards`, `References`) take it as the trailing argument: `Experience(item, 300)`.
- `Photo` and `ResumeImage` take it as the trailing second argument: `Photo(config, spacingAfter?)`.
- `Spacer` takes it as `Spacer(points?, spacingAfter?)`; `Divider` as `Divider(spacingAfter?)`.
- It applies to the **last** paragraph of the component's output.

---

## Generic Components

Basic building blocks usable anywhere in the resume.

### `Heading(text, styles?, spacingAfter?)`

A large heading paragraph.

```ts
function Heading(text: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:** `Heading("My Resume")`

---

### `SubHeading(text, styles?, spacingAfter?)`

A sub-heading paragraph for subsection titles.

```ts
function SubHeading(text: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:** `SubHeading("Technical Details")`

---

### `SectionHeading(text, styles?, spacingAfter?)`

A section heading with a distinctive accent color. Used automatically by container components like `Experience`, `Education`, etc.

```ts
function SectionHeading(text: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:** `SectionHeading("EXPERIENCE")`

---

### `Text(text, styles?, spacingAfter?)`

A normal text paragraph.

```ts
function Text(text: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:** `Text("This is a paragraph of text.")`

---

### `SmallText(text, styles?, spacingAfter?)`

A small text paragraph for secondary information.

```ts
function SmallText(text: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:** `SmallText("Published on Jan 1, 2024")`

---

### `Bullet(text, styles?, spacingAfter?)`

A single bullet point paragraph.

```ts
function Bullet(text: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:** `Bullet("Built a REST API with 99.9% uptime")`

---

### `BulletList(items, styles?, spacingAfter?)`

A list of multiple bullet points.

```ts
function BulletList(
  items: Array<string | SectionComponent>,
  styles?: ResumeStyles,
  spacingAfter?: number
): SectionComponent
```

**Example:**

```ts
BulletList([
  "Developed React applications",
  "Improved performance by 40%",
  "Mentored 5 junior developers"
])
```

---

### `Divider(spacingAfter?)`

A horizontal divider line.

```ts
function Divider(spacingAfter?: number): SectionComponent
```

**Example:** `Divider()`

---

### `Spacer(points?, spacingAfter?)`

Vertical spacing between sections. Default is 100 twips.

```ts
function Spacer(points?: number, spacingAfter?: number): SectionComponent
```

**Example:** `Spacer(200)`

---

## Header Components

Components for the resume header (name, title, contact info).

### `Header(...children, spacingAfter?)`

Container for all header content. Wraps Name, Designation, Contact, Address, Photo, and PhotoPath components. A trailing number sets the space below the header block.

```ts
function Header(...children: Array<SectionComponent | string | number>): SectionComponent
```

**Example:**

```ts
Header(
  Name("Jane Smith"),
  Designation("Product Designer"),
  Contact({ email: "jane@example.com", phone: "+1 555 123 4567" })
)
```

---

### `Name(name, styles?, spacingAfter?)`

The candidate's name, displayed prominently (large, centered).

```ts
function Name(name: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:** `Name("John Doe")`

---

### `Designation(title, styles?, spacingAfter?)`

The candidate's professional title, displayed below the name.

```ts
function Designation(title: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:** `Designation("Senior Software Engineer")`

---

### `Contact(info, styles?, spacingAfter?)`

Contact information displayed as a single line with pipe (`|`) separators.

```ts
function Contact(info: ContactInfo, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:**

```ts
Contact({
  email: "john@example.com",
  phone: "+1 234 567 890",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  location: "New York, NY"
})
// Renders: "john@example.com | +1 234 567 890 | linkedin.com/in/johndoe | ..."
```

---

### `Address(address, styles?, spacingAfter?)`

Address line displayed in small text.

```ts
function Address(address: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:** `Address("123 Main St, New York, NY 10001")`

---

### `Photo(config, spacingAfter?)`

A photo in the header rendered as an inline image.

```ts
function Photo(config: PhotoConfig, spacingAfter?: number): SectionComponent
```

**Example:**

```ts
Photo({
  data: fs.readFileSync("photo.jpg"),
  width: 100,
  height: 100,
  circular: true
})
```

---

### `PhotoPath(imagePath, config)`

A photo in the header loaded from a local file path.

This helper reads the image from disk at runtime, so it is intended for Node.js usage and not the browser bundle.

```ts
function PhotoPath(imagePath: string, config: Omit<PhotoConfig, "data">): SectionComponent
```

**Example:**

```ts
PhotoPath("photo.jpg", {
  width: 100,
  height: 100,
  circular: true
})
```

---

### `ResumeImage(config, spacingAfter?)`

A generic image paragraph, right-aligned by default. Set `side` to `"left"` or `"right"` to float the image so following text wraps beside it.

```ts
function ResumeImage(config: ImageConfig, spacingAfter?: number): SectionComponent
```

**Config shape:**

```ts
interface ImageConfig {
  data: string | Buffer;
  width: number;
  height: number;
  alignment?: "left" | "center" | "right";
  side?: "left" | "right";
}
```

**Example:**

```ts
ResumeImage({ data: imageBuffer, width: 100, height: 100 })
```

---

## Profile Components

### `Summary(text, styles?, spacingAfter?)`

A professional summary paragraph.

```ts
function Summary(text: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:**

```ts
Summary(
  "Full-stack engineer with 8+ years of experience building scalable web applications."
)
```

---

### `Objective(text, styles?, spacingAfter?)`

A career objective paragraph.

```ts
function Objective(text: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:**

```ts
Objective(
  "Seeking a senior engineering role at a mission-driven company."
)
```

---

## Experience Components

### `Experience(...items, spacingAfter?)`

Container for experience entries. Renders a section heading labeled "Experience".

```ts
function Experience(...items: Array<SectionComponent | string | number>): SectionComponent
```

**Example:**

```ts
Experience(
  ExperienceItem({
    company: "Tech Corp",
    designation: "Senior Engineer",
    duration: "2020 - Present",
    points: ["Led microservices migration", "Mentored team of 5"]
  }),
  ExperienceItem({
    company: "StartupXYZ",
    designation: "Full Stack Developer",
    duration: "2017 - 2020",
    points: ["Built core product from scratch"]
  })
)
```

---

### `ExperienceItem(config, styles?, spacingAfter?)`

A single experience entry. Renders company and duration on one line (duration right-aligned via tab stop), designation below, and bullet points.

```ts
function ExperienceItem(
  config: ExperienceItemConfig,
  styles?: ResumeStyles,
  spacingAfter?: number
): SectionComponent
```

**Config shape:**

```ts
interface ExperienceItemConfig {
  company: string;
  designation: string;
  duration: string;
  points: string[];
}
```

---

### `Company(name, styles?, spacingAfter?)`

Company name as a standalone component for custom layouts.

```ts
function Company(name: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

---

### `Duration(text, styles?, spacingAfter?)`

Duration as a standalone component for custom layouts.

```ts
function Duration(text: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

---

## Education Components

### `Education(...items, spacingAfter?)`

Container for education entries. Renders a section heading labeled "Education".

```ts
function Education(...items: Array<SectionComponent | string | number>): SectionComponent
```

**Example:**

```ts
Education(
  EducationItem({
    degree: "M.S. Computer Science",
    institution: "Stanford University",
    year: "2015"
  }),
  EducationItem({
    degree: "B.S. Computer Science",
    institution: "MIT",
    year: "2013"
  })
)
```

---

### `EducationItem(config, styles?, spacingAfter?)`

A single education entry. Renders institution and year on one line (year right-aligned via tab stop), degree below.

```ts
function EducationItem(
  config: EducationItemConfig,
  styles?: ResumeStyles,
  spacingAfter?: number
): SectionComponent
```

**Config shape:**

```ts
interface EducationItemConfig {
  degree: string;
  institution: string;
  year: string;
}
```

---

### `Institution(name, styles?, spacingAfter?)`

Institution name as a standalone component.

```ts
function Institution(name: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

---

### `Degree(name, styles?, spacingAfter?)`

Degree as a standalone component.

```ts
function Degree(name: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

---

## Skills Components

### `Skills(...skills, spacingAfter?)`

Container for skill items. Renders a section heading labeled "Skills".

```ts
function Skills(...skills: Array<SectionComponent | string | number>): SectionComponent
```

**Example:**

```ts
Skills(
  Skill("TypeScript"),
  Skill("React"),
  Skill("Node.js"),
  Skill("PostgreSQL"),
  Skill("Docker")
)
```

---

### `Skill(name, styles?, spacingAfter?)`

A single skill displayed as a bullet point.

```ts
function Skill(name: string, styles?: ResumeStyles, spacingAfter?: number): SectionComponent
```

**Example:** `Skill("GraphQL")`

---

## Projects Components

### `Projects(...items, spacingAfter?)`

Container for project entries. Renders a section heading labeled "Projects".

```ts
function Projects(...items: Array<SectionComponent | string | number>): SectionComponent
```

**Example:**

```ts
Projects(
  Project({
    name: "Open Source CLI Tool",
    description: "A fast file processor built in Rust",
    points: ["500+ GitHub stars", "Used by 10k+ developers"],
    link: "github.com/user/cli-tool"
  })
)
```

---

### `Project(config, styles?, spacingAfter?)`

A single project entry with name, optional description, optional bullet points, and optional link.

```ts
function Project(
  config: ProjectConfig,
  styles?: ResumeStyles,
  spacingAfter?: number
): SectionComponent
```

**Config shape:**

```ts
interface ProjectConfig {
  name: string;
  description?: string;
  points?: string[];
  link?: string;
}
```

---

## Certifications Components

### `Certifications(...items, spacingAfter?)`

Container for certification entries. Renders a section heading labeled "Certifications".

```ts
function Certifications(...items: Array<SectionComponent | string | number>): SectionComponent
```

**Example:**

```ts
Certifications(
  Certification({
    name: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023"
  }),
  Certification({
    name: "Kubernetes Administrator",
    issuer: "CNCF",
    date: "2022"
  })
)
```

---

### `Certification(config, styles?, spacingAfter?)`

A single certification entry. If issuer/date exist, renders the name on the left with "issuer, date" right-aligned via tab stop; otherwise renders just the name.

```ts
function Certification(
  config: CertificationConfig,
  styles?: ResumeStyles,
  spacingAfter?: number
): SectionComponent
```

**Config shape:**

```ts
interface CertificationConfig {
  name: string;
  issuer?: string;
  date?: string;
}
```

---

## Languages Components

### `Languages(...items, spacingAfter?)`

Container for language entries. Renders a section heading labeled "Languages".

```ts
function Languages(...items: Array<SectionComponent | string | number>): SectionComponent
```

**Example:**

```ts
Languages(
  Language({ name: "English", proficiency: "Native" }),
  Language({ name: "Spanish", proficiency: "Fluent" }),
  Language({ name: "Japanese", proficiency: "Conversational" })
)
```

---

### `Language(config, styles?, spacingAfter?)`

A single language entry. If proficiency exists, renders `"Name — Proficiency"` as a single styled paragraph; otherwise renders just the name.

```ts
function Language(
  config: LanguageConfig,
  styles?: ResumeStyles,
  spacingAfter?: number
): SectionComponent
```

**Config shape:**

```ts
interface LanguageConfig {
  name: string;
  proficiency?: string;
}
```

---

## Awards Components

### `Awards(...items, spacingAfter?)`

Container for award entries. Renders a section heading labeled "Awards".

```ts
function Awards(...items: Array<SectionComponent | string | number>): SectionComponent
```

**Example:**

```ts
Awards(
  Award({
    title: "Best Engineering Hack",
    issuer: "TechCrunch Disrupt",
    date: "2023"
  }),
  Award({
    title: "Employee of the Year",
    date: "2022"
  })
)
```

---

### `Award(config, styles?, spacingAfter?)`

A single award entry. If issuer/date exist, renders the title on the left with "issuer, date" right-aligned via tab stop; otherwise renders just the title.

```ts
function Award(
  config: AwardConfig,
  styles?: ResumeStyles,
  spacingAfter?: number
): SectionComponent
```

**Config shape:**

```ts
interface AwardConfig {
  title: string;
  date?: string;
  issuer?: string;
}
```

---

## References Components

### `References(...items, spacingAfter?)`

Container for reference entries. Renders a section heading labeled "References".

```ts
function References(...items: Array<SectionComponent | string | number>): SectionComponent
```

**Example:**

```ts
References(
  Reference({
    name: "Alice Johnson",
    title: "VP of Engineering",
    company: "Tech Corp",
    email: "alice@techcorp.com",
    phone: "+1 555 987 6543"
  })
)
```

---

### `Reference(config, styles?, spacingAfter?)`

A single reference entry. Renders name, optional "title at company", and optional "email | phone".

```ts
function Reference(
  config: ReferenceConfig,
  styles?: ResumeStyles,
  spacingAfter?: number
): SectionComponent
```

**Config shape:**

```ts
interface ReferenceConfig {
  name: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
}
```

---

## Styles System

### `defaultStyles`

The built-in default style tokens used by all components.

```ts
const defaultStyles: ResumeStyles;
```

### `createStyles(overrides?)`

Create a merged style configuration from partial overrides. Pass any subset of tokens; unspecified tokens fall back to defaults.

```ts
function createStyles(overrides?: Partial<ResumeStyles>): ResumeStyles;
```

**Example:**

```ts
import { createStyles, Resume, Header, Name, Experience, ExperienceItem } from "doclang";

const customStyles = createStyles({
  name: { font: "Georgia", size: 36, bold: true, color: "1A1A2E" },
  sectionHeading: { color: "E94560", bold: true },
  text: { font: "Calibri", size: 20 },
});

const resume = Resume(
  Header(Name("John Doe", customStyles)),
  Experience(
    ExperienceItem({
      company: "Tech Corp",
      designation: "Engineer",
      duration: "2020 - Present",
      points: ["Built things"]
    }, customStyles)
  )
);
```

### Theme File (styles in a separate file)

Since `createStyles` returns a plain object, you can define the full theme once in its own file and import it anywhere. This keeps the resume builder clean and makes themes reusable.

**`theme.js`:**

```js
import { createStyles } from "doclang";

export const theme = createStyles({
  // Header
  name:          { font: "Georgia", size: 40, bold: true, color: "1F4E79", alignment: "center" },
  designation:   { font: "Georgia", size: 18, color: "444444", alignment: "center" },
  contact:       { font: "Arial",   size: 16, color: "555555", alignment: "center" },
  // Sections
  heading:       { font: "Georgia", size: 22, bold: true, color: "1F4E79" },
  subHeading:    { font: "Arial",   size: 18, bold: true, color: "333333" },
  sectionHeading:{ font: "Arial", size: 20, bold: true, uppercase: true,
                   color: "1F4E79",
                   border: { bottom: { style: "single", size: 8, color: "1F4E79", space: 1 } } },
  // Body
  text:          { font: "Arial", size: 17, color: "333333" },
  smallText:     { font: "Arial", size: 15, color: "666666" },
  bullet:        { font: "Arial", size: 17, color: "333333" },
  // Experience / Skills
  company:       { font: "Arial", size: 17, italics: true, color: "1F4E79" },
  duration:      { font: "Arial", size: 16, color: "888888" },
  skill:         { font: "Arial", size: 17, color: "333333" },
});
```

Any token you omit falls back to `defaultStyles`.

**`build.js`:**

```js
import { Resume, Header, Name, Designation, Contact, SectionHeading,
         Experience, ExperienceItem, Skills, Skill, exportFile } from "doclang";
import { theme } from "./theme.js";

const resume = Resume(
  Header(
    Name("Jane Smith", theme),
    Designation("Software Engineer", theme),
    Contact({ email: "jane@example.com" }, theme),
  ),
  SectionHeading("Experience", theme),
  Experience(
    ExperienceItem({
      company: "Tech Corp",
      designation: "Senior Engineer",
      duration: "2021 - Present",
      points: ["Led microservices migration"],
    }, theme)
  ),
  SectionHeading("Skills", theme),
  Skills(
    Skill("TypeScript", theme),
    Skill("Node.js", theme)
  ),
);

await exportFile(resume);
```

**Notes:**

- Styles are per-component — pass the theme as the last argument to every component that needs it. There is no global set-once.
- Export several themes to switch look-and-feel: `export const dark = createStyles({...})`, `export const modern = createStyles({...})`.
- `createStyles` merges shallowly — nested objects like `spacing` and `border` are replaced wholesale, so override them as complete objects.
- With TypeScript, the returned object is already typed as `ResumeStyles`, so you get autocomplete for every token field.

### Style Tokens

Every token is a `StyleToken` with these optional fields:

```ts
interface StyleToken {
  font?: string;       // Font family (e.g. "Arial", "Georgia")
  size?: number;       // Font size in half-points (e.g. 24 = 12pt)
  bold?: boolean;      // Bold text
  italics?: boolean;   // Italic text
  uppercase?: boolean; // Force uppercase text
  color?: string;      // Hex color without # (e.g. "FF0000")
  spacing?: {
    before?: number;   // Space before in twips
    after?: number;    // Space after in twips
    line?: number;     // Line spacing
  };
  alignment?: "left" | "center" | "right";
  border?: {
    bottom?: {
      style?: "single" | "double" | "thick" | "none";
      size?: number;   // Border thickness
      color?: string;  // Border color
      space?: number;  // Space between border and text
    };
  };
}
```

### Available Style Tokens

| Token | Used By |
|-------|---------|
| `heading` | `Heading` |
| `subHeading` | `SubHeading` |
| `sectionHeading` | `SectionHeading`, section containers (`Experience`, `Education`, `Skills`, etc.) |
| `name` | `Name` |
| `designation` | `Designation`, `ExperienceItem`, `EducationItem` |
| `text` | `Text`, `Summary`, `Objective` |
| `smallText` | `SmallText`, `Address` |
| `bullet` | `Bullet`, `BulletList` |
| `company` | `Company`, `Institution`, `Skill`, `Project`, `Certification`, `Language`, `Award` |
| `duration` | `Duration`, experience/education/certification/award dates |
| `contact` | `Contact` |
| `skill` | `Skill` |

---

## Types

### `DocChild`

```ts
type DocChild = Paragraph | Table | ImageRun | ExternalHyperlink | DocChild[];
```

A single renderable child element inside a section.

### `Component`

```ts
type Component = () => DocChild[];
```

A function that produces docx child elements.

### `SectionComponent`

```ts
type SectionComponent = () => Paragraph[];
```

A function that produces paragraphs for the document body. This is the return type of all components.

### `ContactInfo`

```ts
interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  location?: string;
}
```

### `PhotoConfig`

```ts
interface PhotoConfig {
  data: string | Buffer;
  width: number;
  height: number;
  circular?: boolean;
}
```

### `ImageConfig`

```ts
interface ImageConfig {
  data: string | Buffer;
  width: number;
  height: number;
  alignment?: "left" | "center" | "right";
  side?: "left" | "right";
}
```

### `ExperienceItemConfig`

```ts
interface ExperienceItemConfig {
  company: string;
  designation: string;
  duration: string;
  points: string[];
}
```

### `EducationItemConfig`

```ts
interface EducationItemConfig {
  degree: string;
  institution: string;
  year: string;
}
```

### `ProjectConfig`

```ts
interface ProjectConfig {
  name: string;
  description?: string;
  points?: string[];
  link?: string;
}
```

### `CertificationConfig`

```ts
interface CertificationConfig {
  name: string;
  issuer?: string;
  date?: string;
}
```

### `LanguageConfig`

```ts
interface LanguageConfig {
  name: string;
  proficiency?: string;
}
```

### `AwardConfig`

```ts
interface AwardConfig {
  title: string;
  date?: string;
  issuer?: string;
}
```

### `ReferenceConfig`

```ts
interface ReferenceConfig {
  name: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
}
```

### `ResumeStyles`

```ts
interface ResumeStyles {
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
```

### `StyleToken`

```ts
interface StyleToken {
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
```

---

## Utilities

### `formatContact(info)`

Formats a `ContactInfo` object into a single string with pipe separators.

```ts
function formatContact(info: ContactInfo): string;
```

**Example:**

```ts
formatContact({ email: "a@b.com", phone: "+1234" });
// Returns: "a@b.com | +1234"
```

---

### `normalizeList(items)`

Normalizes a list of strings, filtering out `undefined`, `null`, and empty entries.

```ts
function normalizeList(items: (string | undefined | null)[]): string[];
```

**Example:**

```ts
normalizeList(["a", undefined, "", "b", null]);
// Returns: ["a", "b"]
```

---

### `sectionId(label)`

Creates a consistent section separator name from a label.

```ts
function sectionId(label: string): string;
```

**Example:**

```ts
sectionId("experience");
// Returns: "section_experience"
```

---

### `exportFile(document, options?)`

The recommended way to save a DocLang document to disk. Handles DOCX generation, file writing, and optional PDF conversion in a single call. No need to import `Packer`, `fs`, or `child_process`.

```ts
async function exportFile(
  document: Document,
  options?: ExportOptions
): Promise<ExportResult>
```

**Options:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `outputDir` | `string` | `"./exports"` | Directory to save files in (created automatically) |
| `fileName` | `string` | `"resume"` | Base file name (without extension) |
| `pdf` | `boolean` | `false` | Convert DOCX to PDF using LibreOffice |

**Returns:**

```ts
interface ExportResult {
  docx: string;   // Absolute path to the .docx file
  pdf?: string;   // Absolute path to the .pdf file (only if pdf: true)
}
```

**Throws:** Meaningful errors if DOCX generation, file writing, or PDF conversion fails.

**Requirements for PDF:**
- LibreOffice must be installed and available as `soffice` in PATH.
- Install: https://www.libreoffice.org/get-help/install/

**Example:**

```ts
import {
  Resume, Header, Name, Designation, Contact,
  Summary, Experience, ExperienceItem,
  exportFile,
} from "doclang";

const resume = Resume(
  Header(
    Name("John Doe"),
    Designation("Software Engineer"),
    Contact({ email: "john@example.com", phone: "+1 234 567 890" })
  ),
  Summary("Experienced developer with 8+ years of experience.")
);

// Save as DOCX only
const { docx } = await exportFile(resume, {
  outputDir: "./exports",
  fileName: "john_doe",
});

// Save as DOCX + PDF
const { docx, pdf } = await exportFile(resume, {
  outputDir: "./exports",
  fileName: "john_doe",
  pdf: true,
});
```

---

## Full Example

```ts
import {
  Resume, Header, Name, Designation, Contact,
  Summary, Experience, ExperienceItem,
  Education, EducationItem,
  Skills, Skill,
  Projects, Project,
  Certifications, Certification,
  Languages, Language,
  Awards, Award,
  References, Reference,
  Divider, Spacer,
  createStyles,
  exportFile,
} from "doclang";

const styles = createStyles({
  name: { font: "Georgia", size: 36, bold: true, color: "1A1A2E" },
  sectionHeading: { color: "E94560", bold: true },
});

const resume = Resume(
  // Header
  Header(
    Name("Jane Smith", styles),
    Designation("Senior Software Engineer"),
    Contact({
      email: "jane@example.com",
      phone: "+1 555 123 4567",
      linkedin: "linkedin.com/in/janesmith",
      github: "github.com/janesmith",
      location: "San Francisco, CA",
    })
  ),

  Spacer(100),

  // Summary
  Summary(
    "Full-stack engineer with 8+ years of experience building scalable " +
    "distributed systems and leading high-performing teams."
  ),

  Divider(),

  // Experience
  Experience(
    ExperienceItem({
      company: "Tech Corp",
      designation: "Senior Software Engineer",
      duration: "2021 - Present",
      points: [
        "Led migration of monolith to microservices, reducing deploy time by 70%",
        "Designed event-driven architecture serving 10M+ daily requests",
        "Mentored 6 engineers; 2 promoted to senior roles",
      ],
    }),
    ExperienceItem({
      company: "StartupXYZ",
      designation: "Full Stack Developer",
      duration: "2018 - 2021",
      points: [
        "Built core product from 0 to 1, reaching 100k MAU",
        "Implemented CI/CD pipeline reducing release cycle from weeks to hours",
        "Introduced TypeScript across the frontend codebase",
      ],
    })
  ),

  Divider(),

  // Skills
  Skills(
    Skill("TypeScript"),
    Skill("React"),
    Skill("Node.js"),
    Skill("Go"),
    Skill("PostgreSQL"),
    Skill("Redis"),
    Skill("Docker"),
    Skill("Kubernetes"),
    Skill("AWS"),
    Skill("GraphQL")
  ),

  Divider(),

  // Education
  Education(
    EducationItem({
      degree: "M.S. Computer Science",
      institution: "Stanford University",
      year: "2018",
    }),
    EducationItem({
      degree: "B.S. Computer Science",
      institution: "UC Berkeley",
      year: "2016",
    })
  ),

  Divider(),

  // Projects
  Projects(
    Project({
      name: "OpenDB",
      description: "Lightweight embedded database for edge computing",
      points: [
        "Written in Go with <2MB binary size",
        "500+ GitHub stars, used in production by 20+ companies",
      ],
      link: "github.com/janesmith/opendb",
    })
  ),

  Divider(),

  // Certifications
  Certifications(
    Certification({ name: "AWS Solutions Architect Professional", issuer: "Amazon Web Services", date: "2023" }),
    Certification({ name: "Certified Kubernetes Administrator", issuer: "CNCF", date: "2022" })
  ),

  Divider(),

  // Languages
  Languages(
    Language({ name: "English", proficiency: "Native" }),
    Language({ name: "Spanish", proficiency: "Professional" }),
    Language({ name: "Japanese", proficiency: "Conversational" })
  ),

  Divider(),

  // Awards
  Awards(
    Award({ title: "Best Engineering Hack", issuer: "TechCrunch Disrupt", date: "2023" }),
    Award({ title: "Employee of the Year", issuer: "Tech Corp", date: "2022" })
  ),

  Divider(),

  // References
  References(
    Reference({
      name: "Alice Johnson",
      title: "VP of Engineering",
      company: "Tech Corp",
      email: "alice@techcorp.com",
      phone: "+1 555 987 6543",
    }),
    Reference({
      name: "Bob Williams",
      title: "CTO",
      company: "StartupXYZ",
      email: "bob@startupxyz.com",
    })
  )
);

// Save as DOCX
await exportFile(resume, {
  outputDir: "./exports",
  fileName: "jane_smith",
});

// Or save as DOCX + PDF (requires LibreOffice)
await exportFile(resume, {
  outputDir: "./exports",
  fileName: "jane_smith",
  pdf: true,
});
```
