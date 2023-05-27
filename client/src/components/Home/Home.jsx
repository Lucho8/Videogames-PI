import React, {useState}from 'react';
import styles from './Home.module.css'
import Videogame from '../Videogame/Videogame'
import NavBar from '../NavBar/NavBar';
import Paginate from '../Paginate/Paginate';
import { useSelector,useDispatch } from 'react-redux';
import { orderVideogamebyName,filterVideogameBySource,filterVideogameByGenre,handleNumber,orderVideogamebyRating,resetVideogames,resetVideogamesSearched,filtereVideogameByPlatform} from '../../redux/actions';

const Home = ({onSearch}) => {

    const {Videogames,genres,searchedVideogames} = useSelector(state => state);
    const { numPage } = useSelector((state) => state);
    const dispatch = useDispatch()
    const platforms = ['PC', 'Linux', 'PS4', 'PS5', 'Xbox ONE', 'Xbox ONE X', 'Nintendo Switch'];


    let desde = (numPage - 1) * 15; 
    let hasta = numPage * 15; 

    let cantPages = Math.floor(Videogames.length/15);
    console.log(Videogames);
    let viewVideogames = Videogames?.slice(desde, hasta);

    const [aux,setAux] = useState(false)

    const handleOrderByName = (event) => {
        dispatch(orderVideogamebyName(event.target.value))
        dispatch(handleNumber(1))
    }

    const handleSource = (event) => {
        dispatch(filterVideogameBySource(event.target.value))
        dispatch(handleNumber(1))
        setAux(true)
        console.log(aux);
        console.log(Videogames);
    }

    const handleGenre = (event) => {
        dispatch(filterVideogameByGenre(event.target.value))
        dispatch(handleNumber(1))
    }

    const handleOrderByRating=(event) => {
        dispatch(orderVideogamebyRating(event.target.value))
        dispatch(handleNumber(1))
    }
    
    const handlePlatform=(event)=>{
        dispatch(filtereVideogameByPlatform(event.target.value))
        dispatch(handleNumber(1))
    }

    const handleResetFilters = () => {
        document.getElementById("source").selectedIndex = 0;
        document.getElementById("orderByNAme").selectedIndex = 0;
        document.getElementById("orderByRating").selectedIndex = 0;
        document.getElementById("genre").selectedIndex = 0;
        searchedVideogames.length > 0 ? dispatch(resetVideogamesSearched()) : dispatch(resetVideogames())
        };

    return (
            <div>
            <NavBar onSearch={onSearch} />
        
                <div className={styles.filtersContainer}>
                    <div className={styles.selectContainer}>
                        <label htmlFor="source">Source</label>
                        <select name="source" id="source" onChange={handleSource}>
                        <option value="" disabled selected>...</option>
                        <option value="API">Api</option>
                        <option value="DB">DataBase</option>
                        <option value="BOTH">Both</option>
                        </select>
                    </div>

                    <div className={styles.selectContainer}>
                        <label htmlFor="orderByNAme">Order by name</label>
                        <select name="orderByNAme" id="orderByNAme" onChange={handleOrderByName}>
                        <option value="" disabled selected>...</option>
                        <option value="A">Ascendente</option>
                        <option value="D">Descendente</option>
                        </select>
                    </div>

                    <div className={styles.selectContainer}>
                        <label htmlFor="orderByRating">Order by rating</label>
                        <select name="orderByRating" id="orderByRating" onChange={handleOrderByRating}>
                        <option value="" disabled selected>...</option>
                        <option value="A">Ascendente</option>
                        <option value="D">Descendente</option>
                        </select>
                    </div>

                    <div className={styles.selectContainer}>
                        <label htmlFor="genre">Filter by genre</label>
                        <select name="genre" id="genre" onChange={handleGenre}>
                        <option value="" disabled selected>...</option>
                        {genres.map(genre => (
                            <option value={genre.name} key={genre.id}>{genre.name}</option>
                        ))}
                        </select>
                    </div>

                    <div className={styles.selectContainer}>
                        <label htmlFor="platforms">Filter by platform</label>
                        <select name="platform" id="platform" onChange={handlePlatform}>
                        <option value="" disabled selected>...</option>
                        {platforms.map(platform => (
                            <option value={platform} key={platform}>{platform}</option>
                        ))}
                        </select>
                    </div>


                        <button className={styles.button} onClick={handleResetFilters}>Reset Filters</button>
                    </div>

                <div className={styles.container}>
                    {viewVideogames?.map(videogame => (
                    <div className={styles.videogameContainer} key={videogame.id}>
                        <Videogame
                        id={videogame.id}
                        image={videogame.image}
                        name={videogame.name}
                        genres={videogame.genres}
                        />
                    </div>
                    ))}
                </div>
        
            <Paginate cantPages={cantPages} numPage={numPage} />
            </div>
        );
}

export default Home