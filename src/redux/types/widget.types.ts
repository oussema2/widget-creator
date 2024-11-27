import { AspectRatio } from "@/lib/constants";
import AliTemplate from "@/Organisms/captions-templates/ali-template";
import MaltaTemplate from "@/Organisms/captions-templates/malta-template";
import UmiTemplate from "@/Organisms/captions-templates/umi-template";

export interface Widget {
  id: string;
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
  id: number;
  category: string;
  thumbnail: string;
  callToAction: CallToAction | null;
  source: string;
  quote: string;
  question: string;
  recorder: VideoRecorder;
  videoPosition: number[];
  dimensions: Dimensions;
  aspectRatio: AspectRatio;
  caption: Caption;
  start: number;
  end: number;
  baseDuration: number;
  duration: number;
}

export interface Caption {
  fileName: string;
  id: string;
  url: string;
  segments: any[];
  size: number[];
  color: string;
  backgroundColor: string;
  template: CaptionTemplate;
}

export interface Dimensions {
  width: number;
  height: number;
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

export type CaptionTemplate = "UMI" | "MALTA" | "ALI";

export const CaptionTemplateAttributes: Record<CaptionTemplate, string> = {
  ALI: "ALI",
  MALTA: "MALTA",
  UMI: "UMI",
};
export const CaptionTemplateComponent: Record<
  CaptionTemplate,
  () => JSX.Element
> = {
  ALI: AliTemplate,
  MALTA: MaltaTemplate,
  UMI: UmiTemplate,
};
