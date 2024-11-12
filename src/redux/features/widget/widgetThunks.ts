import api from "@/api";
import { Widget } from "@/redux/types/widget.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWidget = createAsyncThunk(
  "widget/fetchData",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/widgets/${_id}`);
      const data = response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Failed to fetch data");
    }
  }
);

export const updateWidget = createAsyncThunk(
  "widget/update",
  async (widget: Widget, { rejectWithValue }) => {
    try {
      widget = {
        ...widget,
        videos: widget.videos.map((video) => {
          if (video.callToAction?.title.length === 0) {
            return { ...video, callToAction: null };
          }
          return video;
        }),
      };
      const response = await api.put(`/widgets/${widget._id}`, widget);
      const data = response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Failed to fetch data");
    }
  }
);
export const fetchBrand = createAsyncThunk(
  "widget/fetchBranc",
  async (_id: string, { rejectWithValue }) => {
    try {
      const brand = await axios.get(
        "https://api.thecliquify.co/api/brand-kit/entity/1"
      );

      const data = brand.data.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Failed to fetch data");
    }
  }
);
