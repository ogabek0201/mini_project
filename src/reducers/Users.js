import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data = [] } = await axiosRequest.get("users");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUsers = createAsyncThunk(
  "users/addUsers",
  async (e, { rejectWithValue, dispatch }) => {
    try {
      const { data = [] } = await axiosRequest.post("users",e);
      dispatch(getUsers())
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteUsers = createAsyncThunk(
  "users/deleteUsers",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data = [] } = await axiosRequest.delete(`users/${id}`);
      dispatch(getUsers())
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editUsers = createAsyncThunk(
  "users/editUsers",
  async (obj, { rejectWithValue, dispatch }) => {
    try {
      const { data = [] } = await axiosRequest.put(`users/${obj.id}`,obj.obj);
      dispatch(getUsers())
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setLoading = (state) => {
  state.loading = true;
};

export const slice = createSlice({
  name: "users",
  initialState: {
    user: [],
    
    idx:null,
  },
  reducers: {
    addId:(state , action )=>{
        state.idx=action.payload
    }
  },
  extraReducers:{    
    [getUsers.pending]: setLoading,
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getUsers.rejected]: (state) => {
      state.user = [];
    },
  },
});

export const { addId } = slice.actions;

export default slice.reducer;
