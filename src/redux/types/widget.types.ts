export interface Widget {
  _id: string;
  videos: Video[];
  title: string;
  description: string;
  position: WidgetPosition;
  type: WidgetType;
  font: FontType;
  logo: Logo;
  color: string;
  frameColor: string;
  brand: any;
  callToAction: CallToAction | null;
}

export type FontType = {
  family: string;
  url: string;
  style: string;
};
export type WidgetPosition = "Left" | "Right";

export type LogoPosition =
  | "Top-Left"
  | "Top-Center"
  | "Top-Right"
  | "Bottom-Left"
  | "Bottom-Right"
  | "Bottom-Center";

export interface Video {
  category: string;
  thumbnail: string;
  callToAction: CallToAction | null;
  source: string;
  quote: string;
  question: string;
  recorder: VideoRecorder;
}

export type WidgetType = "PopUp" | "Modal" | "Story" | "Iframe";

export type CallToAction = LinkCallToAction;

export interface LinkCallToAction {
  title: string;
  link: string;
}

export interface VideoRecorder {
  name: string;
  job: string;
}

export interface Logo {
  position: LogoPosition;
  url: string;
}
export interface PositionWithLabel {
  value: WidgetPosition; // value will be of type WidgetPosition
  label: string; // label will be a formatted string for display
}
// Helper arrays for positions with labels
export const widgetPositions: { value: WidgetPosition; label: string }[] = [
  { value: "Left", label: "Left" },
  { value: "Right", label: "Right" },
];

export const logoPositions: { value: LogoPosition; label: string }[] = [
  { value: "Top-Center", label: "Top Center" },
  { value: "Top-Left", label: "Top Left" },
  { value: "Top-Right", label: "Top Right" },
  { value: "Bottom-Left", label: "Bottom Left" },
  { value: "Bottom-Right", label: "Bottom Right" },
  { value: "Bottom-Center", label: "Bottom Center" },
];

export type TextType = {
  value: string;
  font: string;
  fontSize: number;
  color: string;
};
