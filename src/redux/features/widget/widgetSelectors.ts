import { RootState } from "../../app/store";

export const selectWidget = (state: RootState) => state.widget.data;
export const selectWidgetLoadingError = (state: RootState) => {
  return {
    loading: state.widget.loading,
    error: state.widget.error,
  };
};
export const selectVideoIndex = (state: RootState) =>
  state.widget.selectedVideo;

export const selectBrandLoading = (state: RootState) =>
  state.widget.loadingBrand;

export const selectScriptDisplayed = (state: RootState) =>
  state.widget.scriptGenerated;

export const selectOldData = (state: RootState) => state.widget.oldData;

export const selectSelectedVideo = (state: RootState) =>
  state.widget.data.videos[state.widget.selectedVideo];

export const selectCaptionState = (state: RootState) => ({
  loading: state.widget.captionLoading,
  progress: state.widget.captionProgress,
  isGenerationEnd: state.widget.isGenerationEnd,
  isGenerating: state.widget.isGenerating,
});
