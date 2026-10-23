import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  Resume,
  ResumeImage,
  Header,
  Name,
  Designation,
  Contact,
  Summary,
  SectionHeading,
  Skills,
  Skill,
  Experience,
  ExperienceItem,
  Projects,
  Project,
  Education,
  EducationItem,
  Certifications,
  Certification,
  Languages,
  Language,
  PageBreak,
  exportFile,
} from "../packages/main/dist/index.js";

const portraitPath = fileURLToPath(
  new URL("../exports/rohan-iyer-headshot.png", import.meta.url),
);
const portrait = await readFile(portraitPath);

// All candidate details below are fictional sample content.
const resume = Resume(
  ResumeImage(
    { data: portrait, width: 104, height: 104, side: "right" },
    0,
  ),
  Header(
    Name("Rohan Iyer"),
    Designation("Senior Product Designer | UX Strategy and Design Systems"),
    Contact({
      email: "rohan.iyer@example.com",
      phone: "+91 90000 12345",
      linkedin: "linkedin.com/in/rohan-iyer-design",
      location: "Chennai, India",
    }),
  ),

  SectionHeading("Professional Summary"),
  Summary(
    "Senior product designer with 7+ years of experience shaping B2B SaaS and commerce products from discovery through delivery. Combines user research, interaction design, prototyping, accessibility, and product analytics to solve complex workflow problems. Partners closely with product management and engineering teams to ship measurable improvements and scalable design systems.",
  ),

  SectionHeading("Core Skills"),
  Skills(
    Skill("Product strategy, UX research, usability testing, journey mapping"),
    Skill("Interaction design, information architecture, wireframing, prototyping"),
    Skill("Figma, FigJam, design systems, component libraries, design tokens"),
    Skill("Accessibility (WCAG), responsive design, mobile-first workflows"),
    Skill("Product analytics, experimentation, stakeholder facilitation, handoff"),
  ),

  SectionHeading("Professional Experience"),
  Experience(
    ExperienceItem({
      company: "Northstar Digital",
      designation: "Senior Product Designer",
      duration: "2022 - Present",
      points: [
        "Led discovery and end-to-end design for a B2B order-management platform, reducing median task completion time by 28% in moderated usability studies.",
        "Established a Figma component library and token system adopted by four product teams, improving interface consistency and reducing duplicate UI work.",
        "Partnered with product analytics to define funnel events and run onboarding experiments; the redesigned setup flow increased activation by 16% over two releases.",
      ],
    }),
    ExperienceItem({
      company: "Atlas Commerce",
      designation: "Product Designer",
      duration: "2019 - 2022",
      points: [
        "Redesigned search, filtering, and checkout for a multi-category marketplace, improving successful mobile checkout completion by 12% in an A/B test.",
        "Interviewed customers and mapped service journeys to identify friction across discovery, cart, payment, and post-purchase support.",
        "Worked with engineering on responsive specifications, accessibility reviews, design QA, and iterative release validation.",
      ],
    }),
  ),

  PageBreak(),
  SectionHeading("Professional Experience Continued"),
  Experience(
    ExperienceItem({
      company: "Common Ground Studio",
      designation: "UX Designer",
      duration: "2017 - 2019",
      points: [
        "Designed responsive account and reporting experiences for small-business clients, from early wireframes to production-ready interface specifications.",
        "Ran prototype tests with customers and translated findings into prioritized design changes for weekly product planning.",
        "Created reusable page patterns and annotated interaction states to improve developer handoff and reduce review cycles.",
      ],
    }),
  ),

  SectionHeading("Selected Projects"),
  Projects(
    Project({
      name: "Merchant Onboarding",
      description:
        "A guided setup experience for new sellers configuring products, payments, and delivery preferences.",
      points: [
        "Simplified a multi-step workflow using progressive disclosure, inline validation, and clear completion states.",
        "Validated the prototype with first-time sellers and partnered with engineering on staged rollout and analytics.",
      ],
    }),
    Project({
      name: "Unified Design System",
      description:
        "A shared component library and usage guidance for a growing SaaS product suite.",
      points: [
        "Audited duplicated patterns and prioritized accessible foundations, form controls, navigation, and data displays.",
        "Documented responsive behavior and interaction states to support consistent design and implementation.",
      ],
    }),
  ),

  SectionHeading("Education"),
  Education(
    EducationItem({
      degree: "Bachelor of Design, Communication Design",
      institution: "National Institute of Design",
      year: "2017",
    }),
  ),

  SectionHeading("Certifications and Languages"),
  Certifications(
    Certification({
      name: "Google UX Design Professional Certificate",
      issuer: "Google",
      date: "2021",
    }),
  ),
  Languages(Language("English - Fluent"), Language("Tamil - Native")),
);

await exportFile(resume, {
  outputDir: "./exports",
  fileName: "rohan-iyer-product-designer-resume",
});

console.log("Created exports/rohan-iyer-product-designer-resume.docx");
