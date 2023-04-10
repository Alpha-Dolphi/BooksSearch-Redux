import { useState, useEffect } from 'react';
import BooksList from "../../components/BooksList/BooksList";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import { useDispatch, useSelector } from "react-redux";
import { bookSlice, fetchBooks, reset } from "../../store/book";
import { AppDispatch, State } from "../../store";
import searchQueryParameters from "../../store/book/bookInterfaces"
import styles from "./styles.module.scss";
import { selectAreBooksLoading, selectBookEntities } from "../../store/book/selectors";
import Book from "../../store/book/bookInterfaces";
import SearchProps from "../../components/PropsInterace";
import { SortingOption } from "../../constants/statesEnums";

const BooksListPage: React.FC<SearchProps> = ({value, setValue, category, setCategory, sortingOption, setSortingOption}) => {
  const totalItems = useSelector((state: State) => state.book.totalItems);
  const dispatch: AppDispatch = useDispatch();
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 30;

  const isLoading = useSelector(selectAreBooksLoading);

  useEffect(() => {
    dispatch(reset())
  }, [sortingOption, value, category]);

  useEffect(() => {
    dispatch(fetchBooks({
      sortingOption: sortingOption,
      searchQuery: value ? value : "{}",
      startIndex: startIndex,
      maxResults: maxResults,
      category: category,
    } as searchQueryParameters));
  }, [startIndex, sortingOption, value, category]);

  const books = useSelector(selectBookEntities);

  return (
        <div className={styles.content}>
            <SearchPanel value={value} setValue={setValue} category={category} setCategory={setCategory} sortingOption={sortingOption} setSortingOption={setSortingOption}/>

            <div className={styles.total_items}>
              <h2>Found {totalItems ? totalItems : 0} results</h2>
            </div>

            <BooksList books={books}/>
            <div className={styles.loading_indicator}>
              {isLoading ? <h2>Loading Books..</h2> : ""}
            </div>

            <button className={styles.loader__button} onClick={() => setStartIndex(startIndex+30)}>Load more</button>
        </div>
  );
};

export default BooksListPage;
