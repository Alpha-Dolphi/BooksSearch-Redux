import { LoadingStatuses } from "../../constants/loadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import Book, { BookState } from "./bookInterfaces";
import searchQueryParameters from "./bookInterfaces";


export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async ({sortingOption, searchQuery, startIndex, maxResults}: searchQueryParameters, { rejectWithValue }) => {
    let prevSortingOption = sortingOption
    try {
      const response = await axios.get(`${(window as any).API_URL}?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${sortingOption}&key=${(window as any).API_KEY}`);
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (id : string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${(window as any).API_URL}/${id}`);
      return await response.data;
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

const bookEntityAdapter = createEntityAdapter<Book>({
  selectId: (book: Book) => book.id,
});

  const initialState: BookState = {
    totalItems: "",
    status: LoadingStatuses.Idle,
    entities: {},
    ids: [],
  };

  export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
      reset: () => initialState
    },
    extraReducers: (builder) =>
      builder
        .addCase(fetchBooks.pending, (state) => {
          state.status = LoadingStatuses.InProgress;
        })
        .addCase(fetchBooks.fulfilled, (state, { payload }) => {

          bookEntityAdapter.upsertMany(state, payload.items);
          state.totalItems = payload.totalItems;
          state.status = LoadingStatuses.Success;
        })
        .addCase(
            fetchBooks.rejected,
            (state) => {
              state.status = LoadingStatuses.Failed;
            }
        )
        .addCase(fetchBook.pending, (state) => {
          state.status = LoadingStatuses.InProgress;
        })
        .addCase(fetchBook.fulfilled, (state, { payload }) => {
          bookEntityAdapter.addOne(state, payload);
          state.status = LoadingStatuses.Success;
        })
        .addCase(
            fetchBook.rejected,
            (state) => {
              state.status = LoadingStatuses.Failed;
            }
        ),
});

export const { reset } = bookSlice.actions