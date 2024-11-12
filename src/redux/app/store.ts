import { configureStore } from "@reduxjs/toolkit";
import initialWidgetReducer from "../features/initialwidget/initialwidgetSlice";
import widgetReducer from "../features/widget/widgetSlice";

const store = configureStore({
  reducer: {
    initialWidget: initialWidgetReducer,
    widget: widgetReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
