import {GET_ALL_VIDEOGAMES,GET_VIDEOGAME_BY_NAME,RESET_VIDEOGAMES,GET_ALL_GENRES,GET_VIDEOGAME_SOURCE,GET_VIDEOGAME_BY_GENRE,ORDER_VIDEOGAME_BY_NAME,
        ORDER_VIDEOGAME_BY_RATING,POST_VIDEOGAME,RESET_VIDEOGAMES_SEARCHED,
        NEXT_PAGE,PREV_PAGE,HANDLE_NUMBER} from './actionTypes'

const initialState = {
allVideogames : [],
Videogames: [],
searchedVideogames:[],
genres:[],
location:'BOTH',
numPage: 1,
}

const reducer = (state=initialState,{ type, payload }) => {
    switch(type){
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                allVideogames : payload,
                Videogames : payload
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: payload
            }
        case GET_VIDEOGAME_BY_NAME:
            return{
                ...state,
                Videogames: payload,
                searchedVideogames:payload
            }
        case RESET_VIDEOGAMES:
            return {
            ...state,
            Videogames: [...state.allVideogames],
            searchedVideogames:[]
        };

        case RESET_VIDEOGAMES_SEARCHED:
            return{
                ...state,
                Videogames: [...state.searchedVideogames],
            }
            
        case GET_VIDEOGAME_SOURCE:
            let sourceVideogamesFiltered

            if(state.searchedVideogames.length === 0){
                if( payload === 'API' )  sourceVideogamesFiltered = state.allVideogames.filter(videogame => videogame.created === false )
                else if(payload ==='DB')  sourceVideogamesFiltered = state.allVideogames.filter(videogame => videogame.created === true)
                else sourceVideogamesFiltered = [...state.allVideogames]
            } else {
                if( payload === 'API' )  sourceVideogamesFiltered = state.searchedVideogames.filter(videogame => videogame.created === false )
                else if(payload ==='DB')  sourceVideogamesFiltered = state.searchedVideogames.filter(videogame => videogame.created === true)
                else sourceVideogamesFiltered = [...state.searchedVideogames]
            }
            return {
                ...state,
                location: payload,
                Videogames:sourceVideogamesFiltered
            }

        case GET_VIDEOGAME_BY_GENRE:
            let genreVideogamesFiltered = []

            if(state.searchedVideogames.length === 0 && state.location === 'BOTH'){
                genreVideogamesFiltered = state.allVideogames.filter(videogame => videogame.genres.includes(payload));
            } else if (state.location === 'BOTH'){
                genreVideogamesFiltered = state.searchedVideogames.filter(videogame => videogame.genres?.includes(payload));
            }

            if(state.searchedVideogames.length === 0 && state.location === 'API'){
                genreVideogamesFiltered = state.allVideogames.filter(videogame => videogame.genres.includes(payload) && videogame.created === false );
            } else if (state.location === 'API'){
                genreVideogamesFiltered = state.searchedVideogames.filter(videogame => videogame.genres?.includes(payload) && videogame.created === false);
            }

            if(state.searchedVideogames.length === 0 && state.location === 'DB'){
                genreVideogamesFiltered = state.allVideogames.filter(videogame => videogame.genres.includes(payload) && videogame.created === true);
            } else if (state.location === 'DB'){
                genreVideogamesFiltered = state.searchedVideogames.filter(videogame => videogame.genres?.includes(payload) && videogame.created === true);
            }

            return {
                ...state,
                Videogames: genreVideogamesFiltered
            }
        case ORDER_VIDEOGAME_BY_NAME:
            const orderVideogamesbyNameCopy = [...state.Videogames];
            return {
                ...state,
                Videogames: payload === 'A'
                ? orderVideogamesbyNameCopy.sort((a, b) => a.name.localeCompare(b.name))
                : orderVideogamesbyNameCopy.sort((a, b) => b.name.localeCompare(a.name))
            };

        case ORDER_VIDEOGAME_BY_RATING:
            const orderVideogamesbyRatingCopy = [...state.Videogames];
            return {
                ...state,
                Videogames: payload === 'A'
                ? orderVideogamesbyRatingCopy.sort((a, b) => a.rating - b.rating)
                : orderVideogamesbyRatingCopy.sort((a, b) => b.rating - a.rating)
            }

        case POST_VIDEOGAME:
            return{
                ...state,
                allVideogames:[...state.allVideogames, payload],
                Videogames:[...state.allVideogames, payload]
            }



        case HANDLE_NUMBER:
            return {
                ...state,
                numPage: payload,
            };
        case NEXT_PAGE:
            return {
                ...state,
                numPage: state.numPage + 1,
            };
        case PREV_PAGE:
            return {
                ...state,
                numPage: state.numPage - 1,
            };

        default:
            return{...state}
    }
}

export default reducer