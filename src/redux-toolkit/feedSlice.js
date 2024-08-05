import { LIMIT } from "@/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  feed: [],
  feedPagination: [],
  totalPage: null,
};

export const fetchAllFeed = createAsyncThunk(
  "feed/fetchAllFeed",
  async (params, thunkAPI) => {
    try {
      const res = await fetch("/api/rss", {
        method: "GET",
      });
      const result = await res.json();
      // console.log(result);
      thunkAPI.dispatch(handleFetchFeed(result.items));
      //   const totalPages = Math.ceil(result.items.length / LIMIT);
      //   thunkAPI.dispatch(handleSetTotalPage(totalPages));
    } catch (error) {
      console.log(error);
    }
  }
);

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    handleFetchFeed: (state, action) => {
      state.feed = action.payload;
    },
    handlePaginateFeed: (state, action) => {
      const currentPage = action.payload.page;
      state.feedPagination = state.feed.slice(
        (currentPage - 1) * LIMIT,
        currentPage * LIMIT
      );
    },
    handleSetTotalPage: (state, action) => {
      const totalPages = Math.ceil(state.feed.length / LIMIT);
      state.totalPage = totalPages;
    },
  },
});

export const { handleFetchFeed, handlePaginateFeed, handleSetTotalPage } =
  feedSlice.actions;

export default feedSlice.reducer;
