import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleGetAllOrderService } from "../services/orderService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logOut } from "./userSlice";

const initialState = {
  allOrder: [],
};

export const fetchAllOrderRedux = createAsyncThunk(
  "admin/fetchAllOrderRedux",
  async (params, thunkAPI) => {
    try {
      let res = await handleGetAllOrderService(
        params?.userId,
        params?.status,
        params?.limit,
        params?.page
      );
      if (res && res.errCode === 0) {
        thunkAPI.dispatch(fetchAllOrderSuccess(res));
      } else {
        thunkAPI.dispatch(fetchAllOrderFailed());
      }
    } catch (error) {
      thunkAPI.dispatch(fetchAllOrderFailed());
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        thunkAPI.dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    fetchAllOrderSuccess: (state, action) => {
      state.allOrder = action.payload;
    },
    fetchAllOrderFailed: (state, action) => {
      state.allOrder = [];
    },
  },
});

export const { fetchAllOrderSuccess, fetchAllOrderFailed } =
  searchSlice.actions;

export default searchSlice.reducer;
