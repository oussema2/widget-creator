import api from "@/api";
import { Caption, Widget } from "@/redux/types/widget.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWidget = createAsyncThunk(
  "widget/fetchData",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/widgets/${id}`);

      const data = response.data;
      console.log(data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Failed to fetch data");
    }
  }
);

export const updateWidget = createAsyncThunk(
  "widget/update",
  async (widget: Widget, { rejectWithValue }) => {
    console.log(widget);

    try {
      widget = {
        ...widget,
        font: widget.font ? widget.font : { family: "", style: "", url: "" },
        logo: widget.logo ? widget.logo : { position: "Top-Left", url: "" },
        callToAction: widget.callToAction?.link
          ? widget.callToAction
          : { link: "", title: "" },
        videos: widget.videos.map((video) => {
          if (video.callToAction?.title.length === 0) {
            video = { ...video, callToAction: null };
          }
          return video;
        }),
      };
      const response = await api.put(`/widgets/${widget.id}`, widget);
      const data = response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Failed to fetch data");
    }
  }
);
export const fetchBrand = createAsyncThunk(
  "widget/fetchBrand",
  async (_: string, { rejectWithValue }) => {
    try {
      const brand = await axios.get(
        "https://api.thecliquify.co/api/brand-kit/entity/1"
      );
      console.log(brand);
      const data = brand.data.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Failed to fetch data");
    }
  }
);
export const generateCaption = createAsyncThunk<
  any,
  { videoUrl: string },
  { rejectValue: string }
>("caption/generate", async ({ videoUrl }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "https://transcribe-api.thecliquify.co/",
      {
        userId: "user_test_id",
        url: videoUrl,
        model: "large-v3",
      }
    );
    return response.data.transcribe;
  } catch (error) {
    return rejectWithValue("Failed to generate caption");
  }
});

export const fetchProgress = createAsyncThunk<
  { progress: number },
  { captionId: string },
  { rejectValue: string }
>("caption/fetchProgress", async ({ captionId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://transcribe-api.thecliquify.co/${captionId}/status`
    );
    return { progress: response.data.transcribe.progress };
  } catch (error) {
    return rejectWithValue("Failed to fetch progress");
  }
});

export const fetchCaptions = createAsyncThunk<
  string[],
  { caption: Caption; videoId: number },
  { rejectValue: string }
>(
  "caption/fetchCaptions",
  async ({ caption, videoId }, { rejectWithValue }) => {
    try {
      const urlResponse = await axios.get(
        `https://transcribe-api.thecliquify.co/${caption.id}/url`
      );
      const captionsResponse = await axios.get(urlResponse.data.url);
      if (captionsResponse) {
        const createCaptionResponse = await api.post(
          `/videos/createCaption/${videoId}`,
          {
            ...caption,
            caption: captionsResponse.data,
          }
        );
        return createCaptionResponse.data;
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch captions");
    }
  }
);
