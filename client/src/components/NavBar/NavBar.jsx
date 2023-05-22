import styles from './NavBar.module.css'
import SearchBar from '../SearchBar/SearchBar'

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { resetVideogames,handleNumber } from '../../redux/actions';

const NavBar = ({onSearch}) => {
    const dispatch = useDispatch()
    return (
        <div className={styles.navBar}>
          <NavLink to="/home" className={styles.navLink}>
            <button
              className={styles.button}
              onClick={() => {
                dispatch(resetVideogames());
                dispatch(handleNumber(1))
              }}
            >
              Home
            </button>
          </NavLink>
          <NavLink to="/create" className={styles.navLink}> 
            <button className={styles.button}>Create</button> 
          </NavLink>
          <div className={styles.searchBar}>
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      );
    };

export default NavBar