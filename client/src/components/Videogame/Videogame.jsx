import styles from './Videogame.module.css'
import { NavLink } from "react-router-dom";


const Videogame = ({id,image,name,genres}) => {
    return(
        <div className={styles.videogame}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={image} alt={name} />
                    <div className={styles.overlay}>
                        <NavLink to={`/detail/${id}`}><h2 className={styles.title}>{name}</h2></NavLink> 
                        <p className={styles.genre}>Genres: {genres?.join(', ')}</p>
                    </div>
            </div>
        </div>
    )
}

export default Videogame
