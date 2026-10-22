import {
  Resume,
  Header,
  Name,
  Designation,
  Contact,
  Summary,
  SectionHeading,
  Experience,
  ExperienceItem,
  Skills,
  Skill,
  Education,
  EducationItem,
  Projects,
  Project,
  Certifications,
  Certification,
  PageBreak,
  exportFile,
} from "../packages/main/dist/index.js";

// Fictional sample content. Replace names, dates, tools, and metrics with verified details.
const resume = Resume(
  Header(
    Name("Aarav Mehta"),
    Designation("Senior Software Engineer | Full Stack and Cloud Platforms"),
    Contact({
      email: "aarav.mehta@example.com",
      phone: "+91 98765 43210",
      linkedin: "linkedin.com/in/aaravmehta",
      github: "github.com/aaravmehta",
      location: "Bengaluru, India",
    }),
  ),

  SectionHeading("Professional Summary"),
  Summary(
    "Senior software engineer with 8 years of experience delivering TypeScript and JavaScript products across frontend, backend, and cloud infrastructure. Builds accessible React applications, Node.js services, REST and GraphQL APIs, and event-driven systems. Experienced in AWS, PostgreSQL, Redis, Docker, Kubernetes, CI/CD, automated testing, observability, and technical leadership.",
  ),

  SectionHeading("Technical Skills"),
  Skills(
    Skill("Languages: TypeScript, JavaScript, SQL, Python"),
    Skill("Frontend: React, Next.js, Redux Toolkit, HTML5, CSS3, accessibility"),
    Skill("Backend: Node.js, Express, REST APIs, GraphQL, microservices, Kafka"),
    Skill("Data: PostgreSQL, Redis, schema design, query optimization"),
    Skill("Cloud and DevOps: AWS, Docker, Kubernetes, Terraform, GitHub Actions, CI/CD"),
    Skill("Quality and operations: Jest, Vitest, Playwright, OpenTelemetry, Datadog"),
  ),

  SectionHeading("Professional Experience"),
  Experience(
    ExperienceItem({
      company: "Northstar Technologies",
      designation: "Senior Software Engineer",
      duration: "2022 - Present",
      points: [
        "Led a 5-engineer project to split a legacy application into TypeScript services, improving deployment independence and reducing release rollback frequency by 30%.",
        "Designed Node.js REST APIs and PostgreSQL data models for subscription and billing workflows serving 180,000 monthly active users.",
        "Reduced p95 API latency from 820 ms to 490 ms through query-plan analysis, Redis caching, and connection-pool tuning.",
        "Introduced contract tests, Jest coverage gates, and GitHub Actions CI/CD checks, cutting escaped API regressions by 35% over two quarters.",
      ],
    }),
    ExperienceItem({
      company: "Orbit Labs",
      designation: "Software Engineer",
      duration: "2019 - 2022",
      points: [
        "Built customer-facing React and TypeScript workflows for a SaaS collaboration platform, improving task completion in usability tests by 18%.",
        "Implemented GraphQL resolvers and event-driven processing with Kafka for notifications and audit events.",
        "Containerized Node.js services with Docker and deployed them to AWS ECS; added health checks, structured logs, and Datadog dashboards.",
      ],
    }),
  ),

  PageBreak(),
  SectionHeading("Professional Experience Continued"),
  Experience(
    ExperienceItem({
      company: "Maple Systems",
      designation: "Junior Software Engineer",
      duration: "2017 - 2019",
      points: [
        "Delivered JavaScript and React features for internal operations tools used by support and finance teams.",
        "Wrote SQL reports and optimized PostgreSQL queries, reducing a recurring month-end report from 14 minutes to under 6 minutes.",
        "Added unit and integration tests with Jest and documented API behavior for partner teams.",
      ],
    }),
  ),

  SectionHeading("Selected Projects"),
  Projects(
    Project({
      name: "Document Generation Platform",
      description: "TypeScript library for composing accessible DOCX documents from semantic components.",
      points: [
        "Designed a reusable component API, centralized style tokens, and Node.js and browser export paths.",
        "Added deterministic page breaks and heading keep-with-next behavior for controlled multi-page documents.",
      ],
    }),
    Project({
      name: "Service Health Dashboard",
      description: "Operational dashboard for service-level indicators, deployment health, and incident trends.",
      points: [
        "Aggregated OpenTelemetry metrics and AWS deployment events into searchable service views.",
        "Added role-based access control and alert thresholds for latency and error-rate objectives.",
      ],
    }),
  ),

  SectionHeading("Education"),
  Education(
    EducationItem({
      degree: "B.Tech in Computer Science",
      institution: "Pune Institute of Technology",
      year: "2017",
    }),
  ),

  SectionHeading("Certifications"),
  Certifications(
    Certification({
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2024",
    }),
    Certification({
      name: "Certified Kubernetes Application Developer",
      issuer: "Cloud Native Computing Foundation",
      date: "2023",
    }),
  ),
);

await exportFile(resume, {
  outputDir: "./exports",
  fileName: "aarav-mehta-multipage-resume",
});

console.log("Created exports/aarav-mehta-multipage-resume.docx");
