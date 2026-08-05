import * as fs from "fs/promises";
import * as os from "os";
import * as path from "path";
import { describe, it, expect } from "vitest";
import { Packer, Document } from "docx";
import { inflateRawSync } from "zlib";
import {
  Resume,
  Header,
  Name,
  Designation,
  Contact,
  Address,
  PhotoPath,
  ResumeImage,
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

  it("ResumeImage returns a right-aligned image paragraph by default", () => {
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO1mX2kAAAAASUVORK5CYII=",
      "base64"
    );

    const result = ResumeImage({ data: png, width: 80, height: 80 })();
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("root");
  });

  it("ResumeImage respects a custom alignment", () => {
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO1mX2kAAAAASUVORK5CYII=",
      "base64"
    );

    const result = ResumeImage({
      data: png,
      width: 80,
      height: 80,
      alignment: "center",
    })();
    expect(result).toHaveLength(1);
  });

  it("ResumeImage floats beside text when side is set", async () => {
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO1mX2kAAAAASUVORK5CYII=",
      "base64"
    );

    const doc = Resume(
      ResumeImage({ data: png, width: 80, height: 80, side: "right" }),
      Text("This text should wrap beside the image.")
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

describe("spacingAfter", () => {
  async function documentXml(
    doc: InstanceType<typeof Document>
  ): Promise<string> {
    const buf = await Packer.toBuffer(doc);
    const eocd = buf.lastIndexOf(Buffer.from("PK\x05\x06"));
    const cdCount = buf.readUInt16LE(eocd + 10);
    const cdOffset = buf.readUInt32LE(eocd + 16);
    let off = cdOffset;

    for (let i = 0; i < cdCount; i++) {
      const nameLen = buf.readUInt16LE(off + 28);
      const extraLen = buf.readUInt16LE(off + 30);
      const commentLen = buf.readUInt16LE(off + 32);
      const compSize = buf.readUInt32LE(off + 20);
      const method = buf.readUInt16LE(off + 10);
      const localOff = buf.readUInt32LE(off + 42);
      const name = buf.slice(off + 46, off + 46 + nameLen).toString();

      if (name === "word/document.xml") {
        const lnameLen = buf.readUInt16LE(localOff + 26);
        const lextraLen = buf.readUInt16LE(localOff + 28);
        const data = buf.slice(
          localOff + 30 + lnameLen + lextraLen,
          localOff + 30 + lnameLen + lextraLen + compSize
        );
        return method === 8
          ? inflateRawSync(data).toString()
          : data.toString();
      }

      off += 46 + nameLen + extraLen + commentLen;
    }

    throw new Error("word/document.xml not found");
  }

  function pAfter(xml: string, text: string): string | undefined {
    const i = xml.indexOf(text);
    if (i === -1) return undefined;
    const pStart = xml.lastIndexOf("<w:p>", i);
    const pEnd = xml.indexOf("</w:p>", i);
    const block = xml.slice(pStart, pEnd);
    const m = block.match(/<w:spacing[^>]*w:after="(\d+)"/);
    return m ? m[1] : undefined;
  }

  it("Summary applies spacingAfter to its paragraph", async () => {
    const xml = await documentXml(Resume(Summary("Hello", undefined, 777)));
    expect(pAfter(xml, "Hello")).toBe("777");
  });

  it("leaf components apply spacingAfter without styles", async () => {
    const xml = await documentXml(Resume(Name("Jane Doe", undefined, 888)));
    expect(pAfter(xml, "Jane Doe")).toBe("888");
  });

  it("multi-paragraph components apply spacingAfter to the last paragraph", async () => {
    const xml = await documentXml(
      Resume(
        ExperienceItem(
          {
            company: "ABC",
            designation: "Dev",
            duration: "2020-2021",
            points: ["First point", "Last point"],
          },
          undefined,
          999
        )
      )
    );
    expect(pAfter(xml, "Last point")).toBe("999");
    expect(pAfter(xml, "First point")).not.toBe("999");
  });

  it("variadic containers accept a trailing spacingAfter number", async () => {
    const xml = await documentXml(
      Resume(
        Experience(
          ExperienceItem({
            company: "A",
            designation: "Dev",
            duration: "2020",
            points: ["Point"],
          }),
          444
        )
      )
    );
    expect(pAfter(xml, "Point")).toBe("444");
  });

  it("Skill applies spacingAfter to its paragraph", async () => {
    const xml = await documentXml(Resume(Skill("TypeScript", undefined, 555)));
    expect(pAfter(xml, "TypeScript")).toBe("555");
  });

  it("default output keeps the token spacing when spacingAfter is omitted", async () => {
    const xml = await documentXml(Resume(Summary("Plain")));
    expect(pAfter(xml, "Plain")).toBe("50");
  });
});
