import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { bookSlice } from './book';
import Book from './book/bookInterfaces';
import { LoadingStatuses } from '../constants/loadingStatuses';

export interface State {
  book: {
    totalItems: string,
    status: LoadingStatuses;
    entities: {
      [id: string]: Book;
    };
    ids: string[];
  };
}

const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
