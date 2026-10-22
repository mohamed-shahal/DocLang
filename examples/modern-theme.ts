import { createStyles } from "../packages/main/dist/index.js";

/** A clean blue-and-slate theme for the sample resume. */
export const modernTheme = createStyles({
  name: {
    font: "Georgia",
    size: 42,
    bold: true,
    color: "173B6C",
    alignment: "left",
  },
  designation: {
    font: "Arial",
    size: 22,
    bold: false,
    color: "356A9A",
    alignment: "left",
  },
  contact: {
    font: "Arial",
    size: 17,
    color: "52606D",
    alignment: "left",
  },
  sectionHeading: {
    font: "Arial",
    size: 21,
    bold: true,
    uppercase: true,
    color: "173B6C",
    border: {
      bottom: { style: "single", size: 8, color: "7FA7C9", space: 2 },
    },
  },
  text: {
    font: "Arial",
    size: 20,
    color: "263238",
  },
  company: {
    font: "Arial",
    size: 20,
    bold: true,
    color: "173B6C",
  },
});
