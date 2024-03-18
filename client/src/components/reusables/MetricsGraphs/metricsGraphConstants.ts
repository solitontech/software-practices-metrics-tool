import { ModeBarDefaultButtons } from "plotly.js";

export const GRAPH_MODE_BAR_BUTTONS_TO_REMOVE: ModeBarDefaultButtons[] = [
  "lasso2d",
  "select2d",
  "autoScale2d",
  "zoom2d",
];

export const GRAPH = Object.freeze({
  HOVER_INFO: "text",
  FONT_FAMILY: "Roboto",
  HOVER_ALIGN: "left",
  AXIS_RANGE_MODE: "nonnegative",
  WIDTH: 1100,
  HEIGHT: 550,
  TOOL_TIP_BACKGROUND_COLOR: "#4f5355",
  DRAG_MODE: "pan",
});

export const ANNOTATIONS = Object.freeze({
  X_POSITION: 0.5,
  Y_POSITION: 1.09,
  AXIS_REFERENCE: "paper",
  BORDER_COLOR: "#000000",
  BORDER_WIDTH: 2,
  BORDER_PAD: 6,
  FONT_SIZE: 14,
});
