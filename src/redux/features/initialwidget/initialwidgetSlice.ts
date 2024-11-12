import { Video, Widget } from "@/redux/types/widget.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createInitialWidget } from "./initialwidgetThunks";

interface WidgetState {
  data: Widget;
  loading: boolean;
  error: string | null;
}

export const dummyVideo: Video = {
  category: "",
  callToAction: null,
  source: "",
  quote: "",
  question: "",
  recorder: { job: "", name: "" },
  thumbnail: "",
};

const initialState: WidgetState = {
  data: {
    _id: "",
    description: "",
    callToAction: null,
    brand: {},
    color: "",
    frameColor: "",
    type: "PopUp",
    title: "",
    font: { family: "", style: "", url: "" },
    logo: {
      url: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/06/Starbucks_Corporation_Logo_2011.svg-e1657703028844.png?auto=format&q=60&fit=max&w=930",
      position: "Top-Left",
    },
    position: "Right",
    videos: [],
  },
  error: null,
  loading: false,
};

const initialWidgetSlice = createSlice({
  name: "initialWidget",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.data.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.data.description = action.payload;
    },
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.data.videos = action.payload;
    },
    pushVideo: (state, action: PayloadAction<Video>) => {
      state.data.videos = [...state.data.videos, action.payload];
    },
    removeVideo: (state, action: PayloadAction<string>) => {
      console.log(
        [...state.data.videos].filter(
          (video) => video.source === action.payload
        )
      );
      state.data.videos = state.data.videos.filter(
        (video) => video.source !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the createFeatureAData thunk lifecycle
      .addCase(createInitialWidget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createInitialWidget.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload; // Store the created data
        }
      )
      .addCase(createInitialWidget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message
      });
  },
});

export const { setTitle, setVideos, setDescription, pushVideo, removeVideo } =
  initialWidgetSlice.actions;
export default initialWidgetSlice.reducer;
