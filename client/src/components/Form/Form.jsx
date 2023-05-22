import styles from './Form.module.css'
import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { validateField ,validateForm} from './Validations';
import { postVideogame, getAllVideogames,handleNumber} from '../../redux/actions';
import { NavLink } from 'react-router-dom';

const Form = () => {
    const { genres } = useSelector(state => state);
    const platforms = ['PC', 'Linux', 'PS4', 'PS5', 'Xbox ONE', 'Xbox ONE X', 'Nintendo Switch'];
    const dispatch = useDispatch()

        const [game, setGame] = useState({
        name: "",
        description: "",
        platforms: [],
        image: '',
        releaseDate: '',
        rating: '',
        genres: []
        });
    
        const [errors, setErrors] = useState({
        name: "",
        description: "",
        platforms: "",
        image: '',
        releaseDate: '',
        rating: '',
        genres: ""
        });
    
        const handleChange = (event) => {
            const { name, value } = event.target;
            const error = validateField(name, value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: error
            }));
            setGame((prevGame) => ({
                ...prevGame,
                [name]: value
            }));
        };
    
        const handleCheckboxChange = (event) => {
            const { name, checked } = event.target;
                // Realizar las validaciones directamente
                let errorMessage = "";
                if (name === "platforms" && !checked && game.platforms.length === 1) {
                errorMessage = "At least one platform must be selected.";
                } else if (name === "genres" && !checked && game.genres.length === 1) {
                errorMessage = "At least one genre must be selected.";
                }
                // Actualizar el estado de `game`
                setGame((prevGame) => {
                if (checked) {
                    return {
                    ...prevGame,
                    [name]: [...prevGame[name], event.target.value]
                    };
                } else {
                    return {
                    ...prevGame,
                    [name]: prevGame[name].filter((value) => value !== event.target.value)
                    };
                }
                });
            
                // Actualizar el estado de `errors`
                setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage
                }));
            };
    
        const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(game,setErrors)) {
            dispatch(postVideogame(game))
            console.log(game);
            alert('Videogame created!')
        } else {
            console.log(errors);
        }
        };
    
        return (
                <div className={styles.container}>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                <NavLink to="/home">
                    <button
                    onClick={() => {
                        dispatch(getAllVideogames());
                        dispatch(handleNumber(1));
                    }}
                    className={styles.button}
                    >
                    Home
                    </button>
                </NavLink>
            
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={game.name} onChange={handleChange} className={styles.input} />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
            
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" value={game.description} onChange={handleChange} className={styles.input}></textarea>
                    {errors.description && <span className={styles.error}>{errors.description}</span>}
                </div>
                    
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="text" name="image" value={game.image} onChange={handleChange} className={styles.input} />
                    {errors.image && <span className={styles.error}>{errors.image}</span>}
                </div>
            
                <div>
                    <label htmlFor="releaseDate">Release Date:</label>
                    <input
                    type="text"
                    name="releaseDate"
                    value={game.releaseDate}
                    onChange={handleChange}
                    className={styles.input}
                    />
                    {errors.releaseDate && <span className={styles.error}>{errors.releaseDate}</span>}
                </div>
            
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input type="text" name="rating" value={game.rating} onChange={handleChange} className={styles.input} />
                    {errors.rating && <span className={styles.error}>{errors.rating}</span>}
                </div>
            
                <div className={styles.checkboxGroup}>
                    <label htmlFor="platforms">Platforms:</label>
                    <div className={styles.checkboxContainer}>
                    {platforms.map((platform) => (
                        <label key={platform}>
                        <input
                            type="checkbox"
                            name="platforms"
                            value={platform}
                            checked={game.platforms.includes(platform)}
                            onChange={handleCheckboxChange}
                            className={styles.checkbox}
                        />
                        {platform}
                        </label>
                    ))}
                    </div>
                    {errors.platforms && <span className={styles.error}> {errors.platforms}</span>}
                </div>
            
                <div className={styles.checkboxGroup}>
                    <label htmlFor="genres">Genres:</label>
                    <div className={styles.checkboxContainer}>
                    {genres.map((genre) => (
                        <label key={genre.name}>
                        <input
                            type="checkbox"
                            name="genres"
                            value={genre.name}
                            checked={game.genres.includes(genre.name)}
                            onChange={handleCheckboxChange}
                            className={styles.checkbox}
                        />
                        {genre.name}
                        </label>
                    ))}
                    </div>
                    {errors.genres && <span className={styles.error}> {errors.genres}</span>}
                </div>
            
                <button type="submit" className={styles.button}>Create Game</button>
                </form>
                </div>
            );
        
    };

export default Form