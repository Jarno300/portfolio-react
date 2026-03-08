import { saveAs } from "file-saver";
import {
  AlignmentType,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import type { Education } from "../../data/education";
import type { WorkExperience } from "../../data/work-experience";
import type { Volunteering } from "../../data/volunteering";
import type { ContactInfo } from "../../data/contact";
import profilePicture from "../../assets/images/me-blur.jpg";

type AboutData = {
  name: string;
  title: string;
  description: string;
};

export interface CvData {
  about: AboutData;
  contactInfo: ContactInfo;
  education: Education[];
  workExperience: WorkExperience[];
  volunteering: Volunteering[];
}

const createFileBaseName = (name: string) =>
  `${name.replace(/\s+/g, "_")}_CV`;

const sectionHeading = (text: string) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
  });

const bulletList = (items: string[]) =>
  items.map(
    (item) =>
      new Paragraph({
        text: item,
        bullet: { level: 0 },
      }),
  );

const sidebarHeading = (text: string) =>
  new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, bold: true })],
  });

export async function exportCvToWord({
  about,
  contactInfo,
  education,
  workExperience,
  volunteering,
}: CvData) {
  const title = createFileBaseName(about.name);
  const profileBuffer = await fetch(profilePicture)
    .then((response) => response.arrayBuffer())
    .then((buffer) => new Uint8Array(buffer));

  const header: Paragraph[] = [
    new Paragraph({
      text: about.name,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      text: about.title,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
  ];

  const sidebar: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new ImageRun({
          data: profileBuffer,
          type: "jpg",
          transformation: { width: 140, height: 140 },
        }),
      ],
    }),
    sidebarHeading("Contact"),
    new Paragraph({ text: contactInfo.email }),
    new Paragraph({ text: contactInfo.phone }),
    new Paragraph({ text: contactInfo.linkedin }),
    new Paragraph({ text: contactInfo.github }),
    sidebarHeading("Profile"),
    new Paragraph({ text: about.description }),
  ];

  const main: Paragraph[] = [
    sectionHeading("Education"),
    ...education.flatMap((item) => [
      new Paragraph({
        children: [
          new TextRun({ text: item.degree, bold: true }),
          new TextRun({ text: ` — ${item.institution}` }),
        ],
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: item.period, italics: true })],
      }),
      ...(item.details
        ? [
            new Paragraph({
              text: item.details,
              spacing: { after: 80 },
            }),
          ]
        : []),
      ...(item.internships && item.internships.length > 0
        ? [
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: "Internships: ", bold: true }),
                new TextRun({ text: item.internships.join(", ") }),
              ],
            }),
          ]
        : []),
    ]),
    sectionHeading("Volunteering"),
    ...volunteering.flatMap((item) => [
      new Paragraph({
        children: [
          new TextRun({ text: item.role, bold: true }),
          new TextRun({
            text: ` — ${item.organization}${item.location ? ` · ${item.location}` : ""}`,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: item.period, italics: true })],
      }),
      ...bulletList(item.responsibilities),
    ]),
    sectionHeading("Work Experience"),
    ...workExperience.flatMap((item) => [
      new Paragraph({
        children: [
          new TextRun({ text: item.role, bold: true }),
          new TextRun({
            text: ` — ${item.company}${item.location ? ` · ${item.location}` : ""}`,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: item.period, italics: true })],
      }),
      ...bulletList(item.responsibilities),
    ]),
  ];

  const layoutTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 32, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, color: "auto", fill: "F7F3F0" },
            children: sidebar,
          }),
          new TableCell({
            width: { size: 68, type: WidthType.PERCENTAGE },
            children: main,
          }),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        children: [...header, layoutTable],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${title}.docx`);
}
