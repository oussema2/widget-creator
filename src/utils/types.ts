// export type Positions = "Bottom-Left" | "Bottom-Right";
// export type SelectType = { label: string; value: Positions | WidgetStyle };
// export const PositionsData: SelectType[] = [
//   { label: "Bottom Left", value: "Bottom-Left" },
//   { label: "Bottom Right", value: "Bottom-Right" },
// ];
// export type WidgetStyle = "Cercle" | "Tall-Rectangle" | "Rectangle" | "Pile";
// export const WidgetStyleData: SelectType[] = [
//   { label: "Cercle", value: "Cercle" },
//   { label: "Tall Rectangle", value: "Tall-Rectangle" },
//   { label: "Pile", value: "Pile" },
//   { label: "Rectangle", value: "Rectangle" },
// ];
// // Base Widget type
// export type Widget = {
//   videoUrl: string;
//   title: string;
//   description: string;
//   position: Positions;
//   widgetStyle: WidgetStyle;
// };

// // Iframe Widget type
// export type IframeWidget = {
//   videoUrl: string;
//   width: string;
//   height: string;
// };

// // Additional Widget Types with specific configurations
// export type VideoPopUpWidget = Widget & {
//   popUpWidth: number;
//   popUpHeight: number;
// };

// export type VideoModalWidget = Widget & {
//   modalWidth: number;
//   modalHeight: number;
// };

// // Union type for easy selection in the form
// export type WidgetTypes =
//   | VideoPopUpWidget
//   | VideoModalWidget
//   | IframeWidget
//   | Widget;

// export type WidgetConfig = {
//   type: "iframe" | "popup" | "modal";
//   config: WidgetTypes;
// };
