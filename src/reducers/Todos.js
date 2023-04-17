import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data = [] } = await axiosRequest.get("todos");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const completeTodos = createAsyncThunk(
  "todos/completeTodos",
  async (id, { rejectWithValue, dispatch,getState }) => {
    let obj = getState().todos.todo.find(todo => todo.id === id);
    try {
      const { data = [] } = await axiosRequest.put(`todos/${id}`,{
        title:obj.title,
        complete:!obj.complete
      });
      dispatch(getTodos())
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (id, { rejectWithValue, dispatch,getState }) => {
    try {
      const { data = [] } = await axiosRequest.delete(`todos/${id}`);
      dispatch(getTodos())
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postTodos = createAsyncThunk(
  "todos/postTodos",
  async (title, { rejectWithValue, dispatch,getState }) => {
    try {
      const { data = [] } = await axiosRequest.post(`todos`,{
        title: title,
        complete:false,
      });
      dispatch(getTodos())
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTodos = createAsyncThunk(
  "todos/editTodos",
  async (title, { rejectWithValue, dispatch,getState }) => {
    try {
      const { data = [] } = await axiosRequest.put(`todos/${title.id}`,{
        title: title.title,
        complete:false,
      });
      dispatch(getTodos())
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
  name: "todos",
  initialState: {
    todo: [],
    idx:null,
  },
  reducers: {
    addId:(state , action )=>{
        state.idx=action.payload
    }
  },
  extraReducers:{    
    [getTodos.pending]: setLoading,
    [getTodos.fulfilled]: (state, action) => {
      state.todo = action.payload;
    },
    [getTodos.rejected]: (state) => {
      state.todo = [];
    },
  },
});

export const { addId } = slice.actions;

export default slice.reducer;
