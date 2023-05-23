import {GET_ALL_VIDEOGAMES,GET_VIDEOGAME_BY_NAME,RESET_VIDEOGAMES,GET_ALL_GENRES,GET_VIDEOGAME_SOURCE,GET_VIDEOGAME_BY_GENRE,ORDER_VIDEOGAME_BY_NAME,
        ORDER_VIDEOGAME_BY_RATING,POST_VIDEOGAME,RESET_VIDEOGAMES_SEARCHED,
        NEXT_PAGE,PREV_PAGE,HANDLE_NUMBER} from './actionTypes'
import axios from 'axios';

export const getAllVideogames = () => {
    const endpoint = '/videogames'
    return async (dispatch) => {
        try {
            const {data}= await axios(endpoint)

            if (!data.length) throw Error ('Cant bring the Videogames')

            return dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: data,
            });

        } catch (error) {
            return alert('There are no Videogames with that ID')
        }
    }
}


export const getVideogameByName = (name) => {
    const endpoint = `/videogames?name=${name}`
    return async (dispatch) => {
        try {
            const {data}= await axios(endpoint)

            if (!data.length) throw Error ('There are no Videogames with that name')

            return dispatch({
                type: GET_VIDEOGAME_BY_NAME,
                payload: data,
            });

        } catch (error) {
            
            return alert('There are no Videogames with that name')
        }
    }
}

export const getAllGenres = () => {
    const endpoint = `/genres`
    return async (dispatch) => {
        try {
            const {data}= await axios(endpoint)

            if (!data.length) throw Error ('There are no Genres ')

            return dispatch({
                type: GET_ALL_GENRES,
                payload: data,
            });

        } catch (error) {
            return alert('Error Bringing the Genres')
        }
    }
}

export const postVideogame = (game) => {
    const endpoint = '/videogames'
    return async (dispatch) => {
        try {
            const {data} = await axios.post(endpoint,game);
            return dispatch({
            type: POST_VIDEOGAME,
            payload: data,
            });
        } catch (error) {
            return alert('Error creating the Videogame!')
        }
    }
}

export const filterVideogameBySource = (Source) => {
    return { type:GET_VIDEOGAME_SOURCE , payload:Source}
}

export const filterVideogameByGenre = (Genre) => {
    return { type:GET_VIDEOGAME_BY_GENRE , payload:Genre}
}

export const orderVideogamebyName = (order) => {
    return { type:ORDER_VIDEOGAME_BY_NAME , payload:order}
}

export const orderVideogamebyRating = (order) => {
    return { type:ORDER_VIDEOGAME_BY_RATING , payload:order}
}

export function resetVideogames() {
    return {
        type: RESET_VIDEOGAMES,
    };
}

export function resetVideogamesSearched() {
    return {
        type: RESET_VIDEOGAMES_SEARCHED,
    };
}

export function prevPage() {
    return {
    type: PREV_PAGE,
    };
}
    
export function nextPage() {
    return {
    type: NEXT_PAGE,
    };
}
export function handleNumber(num) {
    return {
        type: HANDLE_NUMBER,
        payload: num,
    };
}

