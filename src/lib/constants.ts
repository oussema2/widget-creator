// export const API_URL = "https://widget-backend.vercel.app/api";
export const API_URL = "http://localhost:4444/api";
export const VIDEO_URL = "https://cdn.thecliquify.co/";
export const UPLOAD_URL = "http://localhost:4444/uploads";
// export const UPLOAD_URL = "https://widget-backend.vercel.app/uploads";
import {
  LogoPosition,
  WidgetPosition,
  WidgetType,
} from "@/redux/types/widget.types";

export type AbsolutePosition = {
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  top?: number | string;
};

export type PositionAttribute = Record<LogoPosition, AbsolutePosition>;
export type WidgetPositionAttribute = Record<WidgetPosition, string>;
export type WidgetTypeAttribute = Record<WidgetType, string>;

export const POSITION_ATTRIBUTES: PositionAttribute = {
  "Bottom-Center": { bottom: 16, left: "calc(50% - 25px)" },
  "Bottom-Left": { bottom: 16, left: 16 },
  "Bottom-Right": { bottom: 16, right: 16 },
  "Top-Center": { top: 16, left: "calc(50% - 25px)" },
  "Top-Left": { top: 16, left: 16 },
  "Top-Right": { top: 16, right: 16 },
};

export const AspectRatioDimenstions: Record<
  AspectRatio,
  { width: number; height: number }
> = {
  Crop: { height: 350, width: 316 },
  Landscape: { height: 200, width: 316 },
  Portrait: { height: 450, width: 316 },
  Square: { height: 316, width: 316 },
};

export const WIDGET_POSTITIONS_ATTRIBUTES: WidgetPositionAttribute = {
  Left: "left",
  Right: "right",
};

export const WIDGET_TYPE: WidgetTypeAttribute = {
  Iframe: "Iframe",
  Modal: "Modal",
  PopUp: "PopUp",
  Story: "Story",
};

export type IconProps = {
  fill?: string;
  size?: number;
};

export type TabsProps = {
  title: string;
  component: ReactElement;
  value: string;
};

import { ReactElement } from "react";

// Example: Importing your React icons or components

export type AspectRatio = "Landscape" | "Portrait" | "Crop" | "Square";

export type AspectRatioAttribute = {
  title: AspectRatio;
  aspectRatioTitle: string;
  aspectRatioValue: number;
  icon: ReactElement;
};

export type AspectRatioData = Record<AspectRatio, AspectRatioAttribute>;
