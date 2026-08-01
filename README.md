# DocLang

A TypeScript library for creating professional Microsoft Word resumes using semantic components.

## Install

```bash
npm install doclang
# or
pnpm add doclang
```

## CDN Usage

After publishing to npm, you can import directly from a CDN:

```js
import { Resume, Header, Name, Summary, exportFile } from "https://esm.sh/doclang";
import { Packer } from "https://esm.sh/docx";
```

Available CDN services:

- **esm.sh**: `https://esm.sh/doclang`
- **unpkg**: `https://unpkg.com/doclang`
- **jsDelivr**: `https://cdn.jsdelivr.net/npm/doclang`

## Quick Start

```ts
import {
  Resume,
  Header,
  Name,
  Designation,
  Contact,
  Summary,
  Experience,
  ExperienceItem,
  Skills,
  Skill,
  Education,
  EducationItem,
  exportFile,
} from "doclang";

const resume = Resume(
  Header(
    Name("John Doe"),
    Designation("Software Engineer"),
    Contact({
      email: "john@example.com",
      phone: "+91xxxxxxxxxx",
    })
  ),

  Summary(
    "Passionate software engineer with experience building scalable applications."
  ),

  Experience(
    ExperienceItem({
      company: "ABC Technologies",
      designation: "Frontend Developer",
      duration: "2023 - Present",
      points: [
        "Developed React applications",
        "Improved application performance",
      ],
    })
  ),

  Skills(
    Skill("TypeScript"),
    Skill("React"),
    Skill("Node.js")
  ),

  Education(
    EducationItem({
      degree: "B.Tech Computer Science",
      institution: "XYZ University",
      year: "2023",
    })
  )
);

// Save as DOCX
await exportFile(resume, { fileName: "john_doe" });

// Save as DOCX + PDF (requires LibreOffice)
await exportFile(resume, { fileName: "john_doe", pdf: true });
```

## Components

### Root

| Component | Description |
|-----------|-------------|
| `Resume(...sections)` | Assembles all sections into a `docx.Document` |

### Generic

| Component | Description |
|-----------|-------------|
| `Heading(text)` | Large heading paragraph |
| `SubHeading(text)` | Sub-heading paragraph |
| `SectionHeading(text)` | Section heading with accent color |
| `Text(text)` | Normal text paragraph |
| `SmallText(text)` | Small secondary text |
| `Bullet(text)` | Single bullet point |
| `BulletList(items)` | Multiple bullet points |
| `Divider()` | Horizontal divider line |
| `Spacer(points?)` | Vertical spacing |

### Header

| Component | Description |
|-----------|-------------|
| `Header(...children)` | Container for header content |
| `Name(text)` | Candidate name (large, centered) |
| `Designation(text)` | Professional title |
| `Contact(info)` | Contact line with pipe separators |
| `Address(text)` | Address in small text |
| `Photo(config)` | Photo image |
| `PhotoPath(imagePath, config)` | Photo image loaded from a local file path |

### Profile

| Component | Description |
|-----------|-------------|
| `Summary(text)` | Professional summary |
| `Objective(text)` | Career objective |

### Experience

| Component | Description |
|-----------|-------------|
| `Experience(...items)` | Container for experience entries |
| `ExperienceItem(config)` | Entry with company, designation, duration, points |
| `Company(name)` | Company name standalone |
| `Duration(text)` | Duration standalone |

### Education

| Component | Description |
|-----------|-------------|
| `Education(...items)` | Container for education entries |
| `EducationItem(config)` | Entry with degree, institution, year |
| `Institution(name)` | Institution name standalone |
| `Degree(name)` | Degree name standalone |

### Skills

| Component | Description |
|-----------|-------------|
| `Skills(...items)` | Container for skills |
| `Skill(name)` | Single skill item |

### Projects

| Component | Description |
|-----------|-------------|
| `Projects(...items)` | Container for projects |
| `Project(config)` | Entry with name, description, points |

### Certifications

| Component | Description |
|-----------|-------------|
| `Certifications(...items)` | Container for certifications |
| `Certification(config)` | Entry with name, issuer, date |

### Languages

| Component | Description |
|-----------|-------------|
| `Languages(...items)` | Container for languages |
| `Language(config)` | Entry with name, proficiency |

### Awards

| Component | Description |
|-----------|-------------|
| `Awards(...items)` | Container for awards |
| `Award(config)` | Entry with title, date, issuer |

### References

| Component | Description |
|-----------|-------------|
| `References(...items)` | Container for references |
| `Reference(config)` | Entry with name, title, company, email, phone |

## Styling

All typography is centralized in a style system. Override any token via `createStyles`:

```ts
import { createStyles, Resume, Header, Name } from "doclang";

const customStyles = createStyles({
  heading: { color: "FF0000", size: 32 },
  name: { font: "Georgia" },
});

const resume = Resume(
  Header(Name("John Doe", customStyles)),
  // ...
);
```

### Style Tokens

| Token | Used By |
|-------|---------|
| `heading` | `Heading` |
| `subHeading` | `SubHeading` |
| `sectionHeading` | `SectionHeading` |
| `name` | `Name` |
| `designation` | `Designation`, `ExperienceItem`, `EducationItem` |
| `text` | `Text`, `Summary`, `Objective` |
| `smallText` | `SmallText`, `Address` |
| `bullet` | `Bullet`, `BulletList` |
| `company` | `Company`, `Institution`, `Skill`, `Project`, `Certification`, `Language`, `Award` |
| `duration` | `Duration`, experience/education/certification/award dates |
| `contact` | `Contact` |
| `skill` | `Skill` |

## Project Structure

```
packages/main/src/
├── types/index.ts          # TypeScript interfaces
├── styles/index.ts         # Centralized style tokens
├── core/index.ts           # Docx primitives
├── utils/index.ts          # Utility helpers
├── components/
│   ├── generic.ts          # Heading, Text, Bullet, Divider, Spacer, etc.
│   ├── header.ts           # Header, Name, Designation, Contact, etc.
│   ├── profile.ts          # Summary, Objective
│   ├── experience.ts       # Experience, ExperienceItem
│   ├── education.ts        # Education, EducationItem
│   ├── skills.ts           # Skills, Skill
│   ├── projects.ts         # Projects, Project
│   ├── certifications.ts   # Certifications, Certification
│   ├── languages.ts        # Languages, Language
│   ├── awards.ts           # Awards, Award
│   ├── references.ts       # References, Reference
│   └── resume.ts           # Resume root component
├── components.test.ts      # Tests
└── index.ts                # Public exports
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Type check
pnpm lint

# Build
pnpm build
```

## License

MIT
