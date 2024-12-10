import { isCallToAction } from "@/lib/typeCheks";
import {
  FontType,
  LogoPosition,
  Widget,
  WidgetType,
  WidgetPosition,
  Caption,
  Video,
  CaptionTemplate,
} from "@/redux/types/widget.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchBrand,
  fetchCaptions,
  fetchProgress,
  fetchWidget,
  generateCaption,
  updateWidget,
} from "./widgetThunks";
import { AspectRatio } from "@/lib/constants";
import { isStringNumber } from "@/lib/utils";
type WidgetState = {
  data: Widget;
  loading: boolean;
  error: string | null;
  selectedVideo: number;
  loadingBrand: boolean;
  scriptGenerated: boolean;
  oldData: Widget | null;
  captionLoading: boolean;
  captionProgress: number;
  isGenerationEnd: boolean;
  isGenerating: boolean;
};

const initialState: WidgetState = {
  data: {
    brand: {},
    id: "",
    callToAction: null,
    description: "",
    type: "PopUp",
    title: "",
    font: { family: "", style: "", url: "" },
    color: "",
    frameColor: "red",
    logo: {
      url: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/06/Starbucks_Corporation_Logo_2011.svg-e1657703028844.png?auto=format&q=60&fit=max&w=930",
      position: "Top-Left",
    },
    position: "Right",
    videos: [
      {
        category: "",
        callToAction: null,
        source:
          "https://cdn-us.altrulabs.com/uploads/production/videos/video-55745/video_55745_NnbO-E5kkmjjg_IeG5F3-g.mp4#t=0.001",
        quote: "",
        question: "",
        recorder: { job: "", name: "" },
        thumbnail: "",
        videoPosition: [50],
        dimensions: { height: 0, width: 0 },
        aspectRatio: "Portrait",
        caption: {
          fileName: "",
          id: "",
          url: "",
          size: [16],
          segments: [],
          color: "white",
          backgroundColor: "black",
          template: "ALI",
        },
        baseDuration: 0,
        duration: 0,
        end: 0,
        id: 0,
        start: 0,
      },
    ],
    dimensions: { height: 0, width: 0 },
  },
  error: null,
  loading: false,
  captionLoading: false,
  captionProgress: 0,
  selectedVideo: 0,
  loadingBrand: false,
  scriptGenerated: false,
  oldData: null,
  isGenerationEnd: false,
  isGenerating: false,
};

const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    setInitialWidget: (state, action: PayloadAction<Widget>) => {
      state.data = {
        ...state.data,
        ...action.payload,
        videos: action.payload.videos.map((video) => {
          const initialVideo = state.data.videos[0];
          return {
            callToAction: initialVideo.callToAction,
            category: "",
            source: video.source,
            name: "",
            recorder: { job: "", name: "" },
            quote: "",
            question: "",
            thumbnail: video.thumbnail,
            videoPosition: [50],
            dimensions: { height: 0, width: 0 },
            aspectRatio: "Portrait",
            caption: {
              fileName: "",
              id: "",
              url: "",
              size: [16],
              segments: [],
              color: "white",
              backgroundColor: "black",
              template: "ALI",
            },
            baseDuration: 0,
            duration: 0,
            end: 0,
            id: 0,
            start: 0,
          };
        }),
      };
    },
    setWidgetTitle: (state, action: PayloadAction<string>) => {
      state.data.title = action.payload;
    },
    setWidgetPosition: (state, action: PayloadAction<WidgetPosition>) => {
      state.data.position = action.payload;
    },
    setWidgetLayout: (state, action: PayloadAction<WidgetType>) => {
      state.data.type = action.payload;
    },
    setWidgetDescription: (state, action: PayloadAction<string>) => {
      state.data.description = action.payload;
    },
    setSelectedVideo: (state, action: PayloadAction<number>) => {
      state.selectedVideo = action.payload;
    },
    setVideoQuote: (state, action: PayloadAction<string>) => {
      state.data.videos = state.data.videos.map((video, index) => {
        if (index === state.selectedVideo) {
          return { ...video, quote: action.payload };
        }
        return video;
      });
    },
    setVideoCategory: (state, action: PayloadAction<string>) => {
      state.data.videos = state.data.videos.map((video, index) => {
        if (index === state.selectedVideo) {
          return { ...video, category: action.payload };
        }
        return video;
      });
    },
    setLogo: (state, action: PayloadAction<string>) => {
      state.data.logo.url = action.payload;
    },
    setVideoQuestion: (state, action: PayloadAction<string>) => {
      state.data.videos = state.data.videos.map((video, index) => {
        if (index === state.selectedVideo) {
          return { ...video, question: action.payload };
        }
        return video;
      });
    },
    setFont: (state, action: PayloadAction<FontType>) => {
      state.data.font = action.payload;
    },
    setVideoRecorderName: (state, action: PayloadAction<string>) => {
      state.data.videos[state.selectedVideo].recorder.name = action.payload;
    },
    setVideoRecorderJob: (state, action: PayloadAction<string>) => {
      state.data.videos[state.selectedVideo].recorder.job = action.payload;
    },
    setVideoPosition: (state, action: PayloadAction<number[]>) => {
      state.data.videos[state.selectedVideo].videoPosition = action.payload;
    },
    setVideoAspectRatio: (state, action: PayloadAction<AspectRatio>) => {
      state.data.videos[state.selectedVideo].aspectRatio = action.payload;
    },
    initiateCallToAction: (state) => {
      state.data.callToAction = { link: "", title: "" };
    },
    setCallToActionTitle: (state, action: PayloadAction<string>) => {
      // if (
      //   state.data.videos[state.selectedVideo] &&
      //   state.data.videos[state.selectedVideo].callToAction &&
      //   isCallToAction(state.data.videos[state.selectedVideo].callToAction)
      // ) {
      //   // Assign the value to title safely
      //   state.data.videos[state.selectedVideo].callToAction.title =
      //     action.payload;
      // }
      if (
        isCallToAction(state.data.callToAction) &&
        typeof state.data.callToAction?.title === "string"
      ) {
        state.data.callToAction.title = action.payload;
      }
    },
    setCallToActionLink: (state, action: PayloadAction<string>) => {
      // if (
      //   state.data.videos[state.selectedVideo] &&
      //   state.data.videos[state.selectedVideo].callToAction &&
      //   isCallToAction(state.data.videos[state.selectedVideo].callToAction)
      // ) {
      //   // Assign the value to title safely
      //   state.data.videos[state.selectedVideo].callToAction.link =
      //     action.payload;
      // }
      if (
        isCallToAction(state.data.callToAction) &&
        typeof state.data.callToAction?.link === "string"
      ) {
        state.data.callToAction.link = action.payload;
      }
    },
    setVideoUrl: (state, action: PayloadAction<string>) => {
      state.data.videos[state.selectedVideo].source = action.payload;
    },
    setVideoCaption: (state, action: PayloadAction<Caption>) => {
      state.data.videos[state.selectedVideo].caption = action.payload;
    },
    setRemoveCallToAction: (state) => {
      state.data.callToAction = null;
    },
    setLogoPosittion: (state, payload: PayloadAction<LogoPosition>) => {
      state.data.logo.position = payload.payload;
    },
    setFrameColor: (state, action: PayloadAction<LogoPosition>) => {
      state.data.frameColor = action.payload;
    },
    setWidgetType: (state, action: PayloadAction<WidgetType>) => {
      state.data.type = action.payload;
    },
    showScript: (state) => {
      state.scriptGenerated = true;
    },
    setVideoCaptionSize: (state, action: PayloadAction<number[]>) => {
      state.data.videos[state.selectedVideo].caption.size = action.payload;
    },
    setVideoCaptionColor: (state, action: PayloadAction<string>) => {
      state.data.videos[state.selectedVideo].caption.color = action.payload;
    },
    setVideoCaptionBackgroundColor: (state, action: PayloadAction<string>) => {
      state.data.videos[state.selectedVideo].caption.backgroundColor =
        action.payload;
    },
    setVideoCaptionTemplate: (
      state,
      action: PayloadAction<CaptionTemplate>
    ) => {
      state.data.videos[state.selectedVideo].caption.template = action.payload;
    },
    setWidgetHeightDimension: (state, action: PayloadAction<string>) => {
      state.data.dimensions.height = isStringNumber(action.payload)
        ? Number(action.payload)
        : 0;
    },
    setWidgetWidthDimension: (state, action: PayloadAction<string>) => {
      state.data.dimensions.width = isStringNumber(action.payload)
        ? Number(action.payload)
        : 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the createFeatureAData thunk lifecycle
      .addCase(fetchWidget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWidget.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = {
          ...action.payload,
          dimensions: action.payload.dimensions || { height: 0, width: 0 },
          font: action.payload.font
            ? action.payload.font
            : { family: "", style: "", url: "" },
          logo: action.payload.logo
            ? action.payload.logo
            : { position: "Top-Left", url: "" },
          callToAction: action.payload.callToAction?.link
            ? action.payload.callToAction
            : { link: "", title: "" },
          videos: action.payload.videos.map((video: Video) => ({
            ...video,
            videoPosition: video.videoPosition ? video.videoPosition : [50],
            caption: {
              ...video.caption,
              size: [16],
              color: "white",
              backgroundColor: "black",
            },
          })),
        }; // Store the created data
        console.log(action.payload);
        state.data.id = action.payload.id;
        state.oldData = action.payload;
      })
      .addCase(fetchWidget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message
      })
      .addCase(updateWidget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWidget.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = { ...action.payload, brand: state.data.brand };
        state.oldData = { ...action.payload, brand: state.data.brand }; // Store the created data
      })
      .addCase(updateWidget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message
      })
      .addCase(fetchBrand.pending, (state) => {
        state.loadingBrand = true;
        state.error = null;
      })
      .addCase(fetchBrand.fulfilled, (state, action: PayloadAction<any>) => {
        state.loadingBrand = false;
        state.data.brand = action.payload; // Store the created data
      })
      .addCase(fetchBrand.rejected, (state, action) => {
        state.loadingBrand = false;
        state.error = action.payload as string; // Set error message
      })
      .addCase(generateCaption.pending, (state) => {
        state.captionLoading = true;
        state.captionProgress = 0;
        state.isGenerationEnd = false;
        state.isGenerating = false;
      })
      .addCase(
        generateCaption.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.data.videos[state.selectedVideo].caption = {
            fileName: action.payload.fileName,
            id: action.payload.id,
            url: "",
            segments: [],
            size: [16],
            color: "white",
            backgroundColor: "black",
            template: "ALI",
          };
          state.isGenerating = true;
        }
      )
      .addCase(generateCaption.rejected, (state) => {
        state.captionLoading = false;
      })
      .addCase(fetchProgress.fulfilled, (state, action: PayloadAction<any>) => {
        state.captionProgress = action.payload.progress;
        if (action.payload.progress >= 100) {
          state.isGenerationEnd = true;
          state.isGenerating = false;
        }
      })
      .addCase(fetchCaptions.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.data.videos[state.selectedVideo].caption = action.payload.caption;

        state.captionLoading = false;
      });
  },
});

export const {
  setInitialWidget,
  setSelectedVideo,
  setWidgetDescription,
  setWidgetTitle,
  initiateCallToAction,
  setCallToActionLink,
  setRemoveCallToAction,
  setVideoCategory,
  setVideoQuote,
  setCallToActionTitle,
  setVideoRecorderJob,
  setVideoRecorderName,
  setVideoQuestion,
  setLogoPosittion,
  setLogo,
  setFont,
  setFrameColor,
  setWidgetPosition,
  setWidgetLayout,
  setWidgetType,
  showScript,
  setVideoPosition,
  setVideoAspectRatio,
  setVideoUrl,
  setVideoCaption,
  setVideoCaptionSize,
  setVideoCaptionColor,
  setVideoCaptionBackgroundColor,
  setVideoCaptionTemplate,
  setWidgetHeightDimension,
  setWidgetWidthDimension,
} = widgetSlice.actions;
export default widgetSlice.reducer;
