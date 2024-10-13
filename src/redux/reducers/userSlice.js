import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPath } from "../../apiPath";
import { toast } from "sonner";
const initialState = {
  loading: false,
  currentUser: null,
  dashboardData: null,
  todayWorkoutData: null,
  resourceData: null,
  extra: null,
  error: null,
};
export const fetchData = createAsyncThunk(
  "fetchData",
  async ({ keyName, url, method, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("fittrack-app-token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios[method](`${apiPath}/${url}`, data && data);
      // console.log({ token });
      if (
        method === "get" ||
        keyName === "currentUser" ||
        keyName === "resourceData"
      ) {
        return { data: response.data, keyName, method };
      } else {
        return {
          data: { keyName, message: response.data.message },
          keyName: "extra",
          method,
        };
      }
    } catch (err) {
      console.log({ axios: err });
      // throw err.response;
      return rejectWithValue(err.response.data);
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
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { keyName, data, method } = action.payload;
        if (keyName === "currentUser") {
          state.extra = null;
          if (method === "post") {
            localStorage.setItem("fittrack-app-token", data.token);
            state.extra = { keyName: "currentUser" };
            toast.success("Success", {
              className: "my-classname",
              description: data.message,
              duration: 1000,
            });
          } else {
            state[keyName] = data.data;
          }
        } else if (method === "get") {
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
        toast.error("Error", {
          className: "my-classname",
          description: action.payload.message,
          duration: 1000,
        });
        state.error = action.meta.arg.keyName;
        state.loading = false;
      });
  },
});

export const { updateStoreData, logout } = userSlice.actions;

export default userSlice.reducer;
