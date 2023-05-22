import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { handleNumber } from '../../redux/actions';

const SearchBar = ({onSearch}) => {
    const [name, setName] = useState("");
    const [isInputEmpty, setIsInputEmpty] = useState(true);

    const dispatch = useDispatch()

    function handleChange(event) {
    setName(event.target.value);
    setIsInputEmpty(event.target.value === '');
    }

    function submit(){
    onSearch(name)
    dispatch(handleNumber(1))
    }

    return (
        <div className={styles.searchBar}>
          <input
            className={styles.searchInput}
            onChange={handleChange}
            type="search"
            name="search"
          />
          <button className={`${styles.searchButton} ${isInputEmpty ? styles.button : ''}`} onClick={submit} disabled={isInputEmpty}>
            Search
          </button>
        </div>
      );
}

export default SearchBar