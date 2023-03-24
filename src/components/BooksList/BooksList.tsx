import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAreBooksLoading, selectBookEntities } from "../../store/book/selectors";
import BooksListItem from "../BooksListItem/BooksListItem";
import Book from "../../store/book/bookInterfaces";
import { State } from "../../store";

interface Props {
  books: Record<string, Book>;
}


const BooksList = ({ books } : Props ) => {

  return (
    <div className={styles.books__container}>
        {Object.values(books).map((bookData) => {
            return (
              <Link key={bookData.id} to={`/${bookData.id}`}>
                <BooksListItem bookData={bookData}/>
              </Link>
            );
          })}
    </div>
  );
}

export default BooksList;
