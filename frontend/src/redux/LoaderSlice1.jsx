import { createSlice } from "@reduxjs/toolkit";

export const LoaderSlice1 = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    ShowLoading(state) {
      state.loading = true;
    },
    HideLoading(state) {
      state.loading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = loaderSlice.actions;

export default LoaderSlice1.reducer;
