import styles from './Videogame.module.css'
import { NavLink } from "react-router-dom";


const Videogame = ({ id, image, name, genres }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} />
            <NavLink to={`/detail/${id}`} className={styles.link}>
                <h2>{name}</h2>
            </NavLink>
            <p>Genres: {genres?.join(', ')}</p>
            
        </div>
    );
}

export default Videogame
