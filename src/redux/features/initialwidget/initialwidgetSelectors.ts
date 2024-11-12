import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const selectInitialWidget = (state: RootState) =>
  state.initialWidget.data;
export const selectLoadingError = createSelector(
  (state: RootState) => state.initialWidget.loading,
  (state: RootState) => state.initialWidget.error,
  (loading, error) => ({ loading, error })
);
