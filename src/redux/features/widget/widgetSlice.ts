import { isCallToAction } from "@/lib/typeCheks";
import {
  FontType,
  LogoPosition,
  Widget,
  WidgetType,
  WidgetPosition,
} from "@/redux/types/widget.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBrand, fetchWidget, updateWidget } from "./widgetThunks";
type WidgetState = {
  data: Widget;
  loading: boolean;
  error: string | null;
  selectedVideo: number;
  loadingBrand: boolean;
  scriptGenerated: boolean;
};

const initialState: WidgetState = {
  data: {
    brand: {},
    _id: "",
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
      },
    ],
  },
  error: null,
  loading: false,
  selectedVideo: 0,
  loadingBrand: false,
  scriptGenerated: false,
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
        state.data = action.payload; // Store the created data
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
        state.data = { ...action.payload, brand: state.data.brand }; // Store the created data
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
} = widgetSlice.actions;
export default widgetSlice.reducer;
