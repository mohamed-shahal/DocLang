# DocLang

DocLang is a TypeScript library for building Microsoft Word resumes from reusable components. Compose a document from semantic sections, customize typography with style tokens, and export a `.docx` file from Node.js or a browser.

## Contents

- [Install](#install)
- [Quick start](#quick-start)
- [Pages and layout](#pages-and-layout)
- [Styling](#styling)
- [Browser use](#browser-use)
- [Components](#components)
- [Reference and examples](#reference-and-examples)
- [Development](#development)

## Install

```bash
npm install doclang
# or
pnpm add doclang
```

DocLang targets Node.js and modern browsers and is distributed as an ES module. TypeScript declarations are included. The `docx` package is installed as a runtime dependency.

## Quick start

Create a file such as `resume.ts`:

```ts
import {
  Resume,
  Header,
  Name,
  Designation,
  Contact,
  SectionHeading,
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
    Name("Jordan Lee"),
    Designation("Senior Software Engineer"),
    Contact({
      email: "jordan.lee@example.com",
      phone: "+1 555 010 2040",
      location: "Seattle, WA",
      linkedin: "linkedin.com/in/jordanlee",
    }),
  ),
  SectionHeading("Professional Summary"),
  Summary(
    "Software engineer with 8+ years of experience delivering cloud services, " +
      "improving platform reliability, and mentoring cross-functional teams.",
  ),
  SectionHeading("Experience"),
  Experience(
    ExperienceItem({
      company: "Northstar Systems",
      designation: "Senior Software Engineer",
      duration: "2021–Present",
      points: [
        "Led migration of 12 services to AWS, reducing infrastructure costs by 28%.",
        "Improved API p95 latency by 35% through profiling, caching, and query optimization.",
      ],
    }),
  ),
  SectionHeading("Technical Skills"),
  Skills(
    Skill("TypeScript"),
    Skill("Node.js"),
    Skill("AWS"),
    Skill("PostgreSQL"),
  ),
  SectionHeading("Education"),
  Education(
    EducationItem({
      degree: "B.S. Computer Science",
      institution: "University of Washington",
      year: "2016",
    }),
  ),
);

const result = await exportFile(resume, {
  outputDir: "./exports",
  fileName: "jordan-lee-resume",
});
console.log(`Created ${result.docx}`);
```

Run the TypeScript file with your preferred TypeScript runtime, or compile it with TypeScript. `exportFile` writes `./exports/jordan-lee-resume.docx` in Node.js.

To also create a PDF from Node.js, pass `pdf: true`; LibreOffice must be installed and available as `soffice` on `PATH`:

```ts
await exportFile(resume, { fileName: "jordan-lee-resume", pdf: true });
```

## Pages and layout

`Resume(...sections)` assembles components into a `docx.Document`. Documents use US Letter paper with 0.7-inch top/bottom margins and 0.85-inch left/right margins. Text and component defaults are black and left-aligned. Word naturally flows content onto additional pages; insert `PageBreak()` where a deliberate page boundary is needed:

```ts
import { Resume, Header, Name, PageBreak, SectionHeading, Projects, Project } from "doclang";

const resume = Resume(
  Header(Name("Jordan Lee")),
  SectionHeading("Experience"),
  // Experience(...),
  PageBreak(),
  SectionHeading("Selected Projects"),
  Projects(
    Project({ name: "Platform modernization", description: "Migrated services to AWS." }),
  ),
);
```

Every component is left-aligned by default. A component style can explicitly set `alignment: "center"` or `"right"` when a different layout is desired.

## Styling

The default design uses Arial, black text, left alignment, readable spacing, and restrained section rules. `createStyles` starts with these defaults and applies only the overrides you provide. Pass the resulting style object to each component you want to customize:

```ts
import { createStyles, Header, Name, Designation } from "doclang";

const resumeStyles = createStyles({
  name: { font: "Georgia", size: 38 },
  sectionHeading: {
    size: 24,
    spacing: { before: 240 },
  },
});

Header(
  Name("Jordan Lee", resumeStyles),
  Designation("Senior Software Engineer", resumeStyles),
);
```

Sizes are in half-points (`24` means 12 pt). Colors are six-digit hexadecimal strings without `#`. Spacing values are in twips (`20` twips = 1 point). Nested `spacing` and `border` overrides are merged with the defaults.

Available style tokens include `name`, `designation`, `contact`, `sectionHeading`, `heading`, `subHeading`, `text`, `smallText`, `bullet`, `company`, `duration`, and `skill`. See [REFERENCE.md](./REFERENCE.md#styles-system) for token mappings and component signatures.

## Browser use

Use the browser entry point for a bundler-based app:

```ts
import { Resume, Header, Name, exportFile } from "doclang/browser";

const document = Resume(Header(Name("Jordan Lee")));
await exportFile(document, { fileName: "jordan-lee-resume" });
```

In a browser, `exportFile` downloads a DOCX file. Browser export does not support PDF conversion or Node filesystem paths. `PhotoPath` is available only from the Node entry point; for browser images, use `Photo` or `ResumeImage` with image data.

To build a standalone browser bundle from this repository, run `pnpm build:browser`; the generated IIFE is `packages/main/dist/doclang.min.js` and exposes `DocLang` globally. For npm CDN delivery, publish the package first and confirm your CDN serves this generated bundle before using a script tag.

## Components

| Area | Components |
|---|---|
| Document | `Resume`, `PageBreak` |
| Generic text/layout | `Heading`, `SubHeading`, `SectionHeading`, `Text`, `SmallText`, `Bullet`, `BulletList`, `Divider`, `Spacer` |
| Header | `Header`, `Name`, `Designation`, `Contact`, `Address`, `Photo`, `PhotoPath` (Node only), `ResumeImage` |
| Profile | `Summary`, `Objective` |
| Experience | `Experience`, `ExperienceItem`, `Company`, `Duration` |
| Education | `Education`, `EducationItem`, `Institution`, `Degree` |
| Skills | `Skills`, `Skill` |
| Projects | `Projects`, `Project` |
| Certifications | `Certifications`, `Certification` |
| Languages | `Languages`, `Language` |
| Awards | `Awards`, `Award` |
| References | `References`, `Reference` |

Use `SectionHeading("Experience")` to add a visible section title; containers such as `Experience(...)` group entries but do not add their own heading automatically. Most component details and configuration shapes are documented in the [library reference](./REFERENCE.md).

## Reference and examples

- [Full API reference](./REFERENCE.md)
- [Multi-page resume example](./examples/sample-resume.ts)
- [Custom theme example](./examples/modern-theme.ts)

The sample resume uses fictional names and illustrative metrics. Replace them with accurate details before adapting it for real use.

## Development

This repository is a pnpm project. From the repository root:

```bash
pnpm install
pnpm build          # Compile ESM and TypeScript declarations to packages/main/dist
pnpm build:browser  # Build the browser IIFE bundle
pnpm test           # Run Vitest
pnpm lint           # Type-check without emitting files
```

The public Node exports are in `packages/main/src/index.ts`; browser-safe exports are in `packages/main/src/browser.ts`. Component implementation and centralized default styles live under `packages/main/src/components/` and `packages/main/src/styles/`.

## License

MIT
