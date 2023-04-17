import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

export const getAlbums = createAsyncThunk(
  "albums/getAlbums",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data = [] } = await axiosRequest.get("albums");
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAlbum = createAsyncThunk( 
  "albums/postAlbums",
  async (picture,{dispatch}) => {
    try {
    const { data } = await axiosRequest.post("albums", {
      link: picture,
    });
    dispatch(getAlbums())
  } catch (error) {}
});

const setLoading = (state) => {
  state.loading = true;
};

export const slice = createSlice({
  name: "albums",
  initialState: {
    album: [],
    idx:null,
  },
  reducers: {
    addId:(state , action )=>{
        state.idx=action.payload
    }
  },
  extraReducers:{    
    [getAlbums.pending]: setLoading,
    [getAlbums.fulfilled]: (state, action) => {
      state.loading = false;
      state.album = action.payload;
    },
    [getAlbums.rejected]: (state) => {
      state.questions = [];
    },
  },
});

export const { addId } = slice.actions;

export default slice.reducer;
