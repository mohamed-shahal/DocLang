import * as fs from "fs/promises";
import * as os from "os";
import * as path from "path";
import { describe, it, expect } from "vitest";
import { Packer } from "docx";
import {
  Resume,
  Header,
  Name,
  Designation,
  Contact,
  Address,
  PhotoPath,
  Summary,
  Objective,
  Experience,
  ExperienceItem,
  Company,
  Duration,
  Education,
  EducationItem,
  Institution,
  Degree,
  Skills,
  Skill,
  Projects,
  Project,
  Certifications,
  Certification,
  Languages,
  Language,
  Awards,
  Award,
  References,
  Reference,
  Heading,
  SubHeading,
  SectionHeading,
  Text,
  SmallText,
  Bullet,
  BulletList,
  Divider,
  Spacer,
  defaultStyles,
  createStyles,
  formatContact,
} from "../src/index.js";

describe("Generic Components", () => {
  it("Heading returns a paragraph", () => {
    const result = Heading("Test Heading")();
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("root");
  });

  it("SubHeading returns a paragraph", () => {
    const result = SubHeading("Sub Title")();
    expect(result).toHaveLength(1);
  });

  it("SectionHeading returns a paragraph", () => {
    const result = SectionHeading("Section")();
    expect(result).toHaveLength(1);
  });

  it("Text returns a paragraph", () => {
    const result = Text("Hello World")();
    expect(result).toHaveLength(1);
  });

  it("SmallText returns a paragraph", () => {
    const result = SmallText("Small info")();
    expect(result).toHaveLength(1);
  });

  it("Bullet returns a paragraph", () => {
    const result = Bullet("Point one")();
    expect(result).toHaveLength(1);
  });

  it("BulletList returns multiple paragraphs", () => {
    const result = BulletList(["Item 1", "Item 2", "Item 3"])();
    expect(result).toHaveLength(3);
  });

  it("BulletList accepts SectionComponent items", () => {
    const result = BulletList([Bullet("A"), Bullet("B")])();
    expect(result).toHaveLength(2);
  });

  it("Divider returns a paragraph", () => {
    const result = Divider()();
    expect(result).toHaveLength(1);
  });

  it("Spacer returns a paragraph", () => {
    const result = Spacer(200)();
    expect(result).toHaveLength(1);
  });
});

describe("Header Components", () => {
  it("Name returns a paragraph", () => {
    const result = Name("John Doe")();
    expect(result).toHaveLength(1);
  });

  it("Designation returns a paragraph", () => {
    const result = Designation("Software Engineer")();
    expect(result).toHaveLength(1);
  });

  it("Contact returns a paragraph with formatted contact info", () => {
    const result = Contact({
      email: "john@example.com",
      phone: "+1234567890",
    })();
    expect(result).toHaveLength(1);
  });

  it("Address returns a paragraph", () => {
    const result = Address("123 Main St, City")();
    expect(result).toHaveLength(1);
  });

  it("Header combines multiple children", () => {
    const result = Header(
      Name("John"),
      Designation("Dev"),
      Contact({ email: "a@b.com" })
    )();
    expect(result).toHaveLength(3);
  });

  it("PhotoPath returns a left-aligned image paragraph from a file path", async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "doclang-photo-"));
    const imagePath = path.join(tempDir, "photo.png");
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO1mX2kAAAAASUVORK5CYII=",
      "base64"
    );

    await fs.writeFile(imagePath, png);

    const result = PhotoPath(imagePath, { width: 80, height: 80 })();
    expect(result).toHaveLength(1);

    const doc = Resume(
      Header(
        Name("John Doe"),
        PhotoPath(imagePath, { width: 80, height: 80 })
      )
    );

    const buffer = await Packer.toBuffer(doc);
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });
});

describe("Profile Components", () => {
  it("Summary returns a paragraph", () => {
    const result = Summary("A great summary.")();
    expect(result).toHaveLength(1);
  });

  it("Objective returns a paragraph", () => {
    const result = Objective("My career objective.")();
    expect(result).toHaveLength(1);
  });
});

describe("Experience Components", () => {
  it("ExperienceItem returns paragraphs for company, designation, and points", () => {
    const result = ExperienceItem({
      company: "ABC Corp",
      designation: "Developer",
      duration: "2020 - Present",
      points: ["Built apps", "Led team"],
    })();
    expect(result.length).toBeGreaterThanOrEqual(3);
  });

  it("Company returns a paragraph", () => {
    const result = Company("Tech Inc")();
    expect(result).toHaveLength(1);
  });

  it("Duration returns a paragraph", () => {
    const result = Duration("2020 - 2023")();
    expect(result).toHaveLength(1);
  });

  it("Experience combines multiple items", () => {
    const result = Experience(
      ExperienceItem({
        company: "A",
        designation: "Dev",
        duration: "2020-2021",
        points: ["Did stuff"],
      }),
      ExperienceItem({
        company: "B",
        designation: "Sr Dev",
        duration: "2021-Present",
        points: ["Did more"],
      })
    )();
    expect(result.length).toBeGreaterThanOrEqual(6);
  });
});

describe("Education Components", () => {
  it("EducationItem returns paragraphs for institution and degree", () => {
    const result = EducationItem({
      degree: "B.Tech CS",
      institution: "XYZ University",
      year: "2023",
    })();
    expect(result).toHaveLength(2);
  });

  it("Institution returns a paragraph", () => {
    const result = Institution("MIT")();
    expect(result).toHaveLength(1);
  });

  it("Degree returns a paragraph", () => {
    const result = Degree("MSc Physics")();
    expect(result).toHaveLength(1);
  });

  it("Education combines multiple items", () => {
    const result = Education(
      EducationItem({ degree: "B.Tech", institution: "A", year: "2020" }),
      EducationItem({ degree: "M.Tech", institution: "B", year: "2022" })
    )();
    expect(result.length).toBeGreaterThanOrEqual(4);
  });
});

describe("Skills Components", () => {
  it("Skill returns a paragraph", () => {
    const result = Skill("TypeScript")();
    expect(result).toHaveLength(1);
  });

  it("Skills combines multiple skills", () => {
    const result = Skills(
      Skill("TypeScript"),
      Skill("React"),
      Skill("Node.js")
    )();
    expect(result).toHaveLength(3);
  });
});

describe("Projects Components", () => {
  it("Project returns paragraphs for name, description, and points", () => {
    const result = Project({
      name: "MyApp",
      description: "A cool app",
      points: ["Built with React", "Deployed on Vercel"],
    })();
    expect(result.length).toBeGreaterThanOrEqual(3);
  });

  it("Projects combines multiple projects", () => {
    const result = Projects(
      Project({ name: "A", description: "App A" }),
      Project({ name: "B", description: "App B" })
    )();
    expect(result.length).toBeGreaterThanOrEqual(4);
  });
});

describe("Certifications Components", () => {
  it("Certification returns a paragraph", () => {
    const result = Certification({
      name: "AWS Architect",
      issuer: "Amazon",
      date: "2023",
    })();
    expect(result).toHaveLength(1);
  });

  it("Certifications combines multiple certifications", () => {
    const result = Certifications(
      Certification({ name: "Cert A" }),
      Certification({ name: "Cert B" })
    )();
    expect(result).toHaveLength(2);
  });
});

describe("Languages Components", () => {
  it("Language with proficiency returns a paragraph", () => {
    const result = Language({ name: "English", proficiency: "Native" })();
    expect(result).toHaveLength(1);
  });

  it("Language without proficiency returns a paragraph", () => {
    const result = Language({ name: "French" })();
    expect(result).toHaveLength(1);
  });

  it("Languages combines multiple languages", () => {
    const result = Languages(
      Language({ name: "English", proficiency: "Native" }),
      Language({ name: "Spanish", proficiency: "Intermediate" })
    )();
    expect(result).toHaveLength(2);
  });
});

describe("Awards Components", () => {
  it("Award returns a paragraph", () => {
    const result = Award({
      title: "Best Developer",
      date: "2023",
      issuer: "ABC Corp",
    })();
    expect(result).toHaveLength(1);
  });

  it("Awards combines multiple awards", () => {
    const result = Awards(
      Award({ title: "Award A" }),
      Award({ title: "Award B" })
    )();
    expect(result).toHaveLength(2);
  });
});

describe("References Components", () => {
  it("Reference returns paragraphs for name, title, and contact", () => {
    const result = Reference({
      name: "Jane Smith",
      title: "CTO",
      company: "ABC Corp",
      email: "jane@abc.com",
    })();
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it("References combines multiple references", () => {
    const result = References(
      Reference({ name: "Person A" }),
      Reference({ name: "Person B" })
    )();
    expect(result.length).toBeGreaterThanOrEqual(2);
  });
});

describe("Styles System", () => {
  it("defaultStyles contains all required tokens", () => {
    expect(defaultStyles).toHaveProperty("heading");
    expect(defaultStyles).toHaveProperty("subHeading");
    expect(defaultStyles).toHaveProperty("sectionHeading");
    expect(defaultStyles).toHaveProperty("designation");
    expect(defaultStyles).toHaveProperty("text");
    expect(defaultStyles).toHaveProperty("smallText");
    expect(defaultStyles).toHaveProperty("bullet");
    expect(defaultStyles).toHaveProperty("company");
    expect(defaultStyles).toHaveProperty("duration");
    expect(defaultStyles).toHaveProperty("name");
    expect(defaultStyles).toHaveProperty("contact");
    expect(defaultStyles).toHaveProperty("skill");
  });

  it("createStyles merges overrides with defaults", () => {
    const custom = createStyles({
      heading: { color: "FF0000", size: 32 },
    });
    expect(custom.heading.color).toBe("FF0000");
    expect(custom.heading.size).toBe(32);
    expect(custom.heading.font).toBe("Arial");
  });

  it("createStyles with no args returns defaults", () => {
    const styles = createStyles();
    expect(styles).toEqual(defaultStyles);
  });
});

describe("Utility Functions", () => {
  it("formatContact joins email and phone with pipe", () => {
    const result = formatContact({ email: "a@b.com", phone: "+123" });
    expect(result).toBe("a@b.com | +123");
  });

  it("formatContact handles single field", () => {
    const result = formatContact({ email: "a@b.com" });
    expect(result).toBe("a@b.com");
  });

  it("formatContact handles empty object", () => {
    const result = formatContact({});
    expect(result).toBe("");
  });
});

describe("Resume Integration", () => {
  it("Resume returns a Document object", () => {
    const doc = Resume(
      Header(
        Name("John Doe"),
        Designation("Software Engineer"),
        Contact({ email: "john@example.com" })
      ),
      Summary("Passionate engineer."),
      Experience(
        ExperienceItem({
          company: "ABC Technologies",
          designation: "Frontend Developer",
          duration: "2023 - Present",
          points: ["Developed React apps", "Improved performance"],
        })
      ),
      Skills(Skill("TypeScript"), Skill("React"), Skill("Node.js")),
      Education(
        EducationItem({
          degree: "B.Tech CS",
          institution: "XYZ University",
          year: "2023",
        })
      )
    );

    expect(doc).toBeDefined();
    expect(doc).toHaveProperty("currentRelationshipId");
  });

  it("Complete resume can be packed successfully", async () => {
    const doc = Resume(
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

    const buffer = await Packer.toBuffer(doc);
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it("Resume with all section types can be packed", async () => {
    const doc = Resume(
      Header(
        Name("Jane Smith"),
        Designation("Senior Engineer"),
        Contact({
          email: "jane@example.com",
          phone: "+1234567890",
          linkedin: "linkedin.com/in/janesmith",
          github: "github.com/janesmith",
        }),
        Address("123 Main St, City, State")
      ),
      Summary("Experienced engineer."),
      Experience(
        ExperienceItem({
          company: "Tech Corp",
          designation: "Lead Developer",
          duration: "2020 - Present",
          points: ["Led team of 5", "Shipped product"],
        })
      ),
      Education(
        EducationItem({
          degree: "MSc Computer Science",
          institution: "MIT",
          year: "2020",
        })
      ),
      Skills(
        Skill("TypeScript"),
        Skill("Python"),
        Skill("AWS")
      ),
      Projects(
        Project({
          name: "Open Source Tool",
          description: "A helpful tool",
          points: ["500+ GitHub stars", "Used by 1000+ devs"],
        })
      ),
      Certifications(
        Certification({
          name: "AWS Solutions Architect",
          issuer: "Amazon",
          date: "2023",
        })
      ),
      Languages(
        Language({ name: "English", proficiency: "Native" }),
        Language({ name: "Spanish", proficiency: "Intermediate" })
      ),
      Awards(
        Award({
          title: "Best Innovation",
          date: "2023",
          issuer: "Tech Conference",
        })
      ),
      References(
        Reference({
          name: "Dr. Smith",
          title: "Professor",
          company: "MIT",
          email: "smith@mit.edu",
        })
      )
    );

    const buffer = await Packer.toBuffer(doc);
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });
});
