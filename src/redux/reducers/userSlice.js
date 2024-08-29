import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPath } from "../../apiPath";
import { toast } from "sonner";
const token = localStorage.getItem("fittrack-app-token");
axios.defaults.headers.common["Authorization"] = token;
const initialState = {
  loading: false,
  currentUser: null,
  dashboardData: null,
  todayWorkoutData: null,
  extra: null,
};
export const fetchData = createAsyncThunk(
  "fetchData",
  async ({ keyName, url, method, data }) => {
    try {
      console.log(token);
      const response = await axios[method](`${apiPath}/${url}`, data && data);
      if (method === "get" || keyName === "currentUser") {
        return { data: response.data, keyName, method };
      } else {
        return {
          data: { keyName, message: response.data.message },
          keyName: "extra",
          method,
        };
      }
    } catch (err) {
      throw err;
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateStoreData: (state, action) => {
      const { payload, meta } = action.payload;
      state[meta] = payload;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("fittrack-app-token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        const { keyName, data, method } = action.payload;
        if (method === "get" || keyName === "currentUser") {
          state.extra = null;
          state[keyName] = data;
        } else {
          state[keyName] = data;
          toast.success("Success", {
            className: "my-classname",
            description: data.message,
            duration: 1000,
          });
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log({ action });
        state.loading = false;
      });
  },
});

export const { updateStoreData, logout } = userSlice.actions;

export default userSlice.reducer;
