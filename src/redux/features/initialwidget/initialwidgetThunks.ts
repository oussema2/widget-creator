import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTitle } from "./initialwidgetSlice";
import api from "@/api";
import { Widget } from "@/redux/types/widget.types";
// Define an async thunk to fetch data
export const fetchFeatureAData = createAsyncThunk(
  "widget/fetchData",
  async (_, { dispatch }) => {
    const response = await fetch("/api/featureA");
    const data = await response.json();
    dispatch(setTitle(data.value));
  }
);

export const createInitialWidget = createAsyncThunk(
  "widget/initiate",
  async (initialWidget: Widget, { rejectWithValue }) => {
    try {
      const response = await api.post("/widgets/initiate", initialWidget);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response?.data || "Failed to post data");
    }
  }
);
