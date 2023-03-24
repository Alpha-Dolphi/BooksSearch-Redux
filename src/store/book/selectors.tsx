import { State } from "..";
import { LoadingStatuses } from "../../constants/loadingStatuses";


export const selectBooksModuleState = (state : State) => state.book;

export const selectBookIds = (state : State) => selectBooksModuleState(state)?.ids;

export const selectBookEntities = (state : State) =>
selectBooksModuleState(state)?.entities;

export const selectBooksById = (state : State, bookId : string ) => {
    console.log(state, bookId);
    return selectBookEntities(state)[bookId];
}


export const selectBooksLoadingStatus = (state : State) =>
selectBooksModuleState(state)?.status;

export const selectAreBooksLoading = (state : State) =>
  [LoadingStatuses.InProgress, LoadingStatuses.Idle].includes(
    selectBooksLoadingStatus(state)
  );

export const selectIsBookLoading = (state : State) =>
  LoadingStatuses.InProgress === selectBooksLoadingStatus(state);
