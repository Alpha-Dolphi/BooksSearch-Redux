import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectAreBooksLoading, selectBookEntities, selectBooksById } from "../../store/book/selectors";
import { State } from "../../store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchBook } from "../../store/book";
import { AppDispatch } from "../../store";
import { ReactComponent as Logo } from '../../icons/Icon-Image.svg';


const BookDetails = () => {
    const { bookId } = useParams();
    const books = useSelector(selectBookEntities);
    const dispatch: AppDispatch = useDispatch();


    useEffect(() => {
        if (!Object.keys(books).length && bookId) {
            dispatch(fetchBook(bookId));
        }
      }, []);

  const bookData = useSelector((state: State) => {
    if (bookId) {
        return selectBooksById(state, bookId);
    }
    return null;
  })

  return (
    <div className={styles.book__info_container}>
        {bookData
        ? <><div className={styles.image__box}>
        {
            !bookData.volumeInfo.imageLinks?.smallThumbnail
            ? <Logo />
            : <img
                key={bookData.id}
                src={bookData.volumeInfo.imageLinks?.smallThumbnail}
                loading="lazy"
            />
        }
        </div>
        <div className={styles.info__box}>
            {bookData.volumeInfo.categories ? <h4>{bookData.volumeInfo.categories}</h4> : null}
            <h3>{bookData.volumeInfo.title}</h3>
            <div>
                {bookData.volumeInfo?.authors ? Object.values(bookData.volumeInfo.authors).map((author, index) => <h4 key={index}>{author}</h4>) : null}
                <p>{bookData.volumeInfo.description}</p>
            </div>
        </div></>

        : ""
    }</div>
  );
}

export default BookDetails;
