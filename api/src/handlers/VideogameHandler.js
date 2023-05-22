const {Videogame,Genre} = require('../db')
const { Op } = require('sequelize');
const axios = require('axios')

const cleanArray = (arr) => 
    arr.map((game) => {
        return {
            id:game.id,
            name:game.name,
            description:game.description,
            image:game.background_image,
            releaseDate:game.released,
            platforms:game.parent_platforms.map((platform) => platform.platform.name),
            genres:game.genres.map((genre) => genre.name),
            rating:game.rating,
            created:false,
        }
    })



const createVideogame = async (name,description,platforms,image,releaseDate,rating, genres) => {
    // Crea el nuevo videojuego
    const newVideogame = await Videogame.create({
        name,
        description,
        platforms,
        image,
        releaseDate,
        rating
    });

    // Verificamos que los géneros existen y agregarlos a la tabla de asociación
    if (genres && genres.length > 0) {
        const genresToAdd = await Promise.all(genres.map(async (genre) => {
        const genreInstance = await Genre.findOne({ where: { name: genre } });
        if (!genreInstance) {
            throw new Error(`Genre: ${genre} does not exist.`);
        }
        return genreInstance;
        }));
    await newVideogame.addGenres(genresToAdd);
    }
    return newVideogame;
    
};


const getGameByid = async (id,source) => {
    if (source === 'bdd') {
        const game = await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                as: 'Genres',
            }],
        });
    
        if (!game) {
            throw Error('There is no Game with that ID')
        }
    
        const { Genres, ...rest } = game.toJSON();
        const gameWithGenres = {
            ...rest,
            genres: Genres.map((genre) => genre.name),
        };
    
        return gameWithGenres;
    }
        const { data } = await axios(`${process.env.URL}/games/${id}?key=${process.env.API_KEY}`);
            const game =  {
                id:data.id,
                name:data.name,
                description:data.description,
                image:data.background_image,
                releaseDate:data.released,
                platforms:data.parent_platforms.map((platform) => platform.platform.name),
                genres:data.genres.map((genre) => genre.name),
                rating:data.rating,
                created:false
            }
        if (!game) {
            throw Error('There is no Game with that ID')
        }
        return game
}

const getAllgames = async () => {

    const databaseVideogames = await Videogame.findAll({
        include: [{
        model: Genre,
        as: 'Genres',
        }],
    });

    const databaseVideogamesWithGenres = databaseVideogames.map((videogame) => {
        const { Genres, ...rest } = videogame.toJSON();
        return {
            ...rest,
            genres: Genres.map((genre) => genre.name),
        };
    });

    const pageSize = 40; // Cantidad de resultados por página
    const totalPages = 3; // Cantidad total de páginas que quieres obtener (en este caso, 5 páginas con 20 resultados cada una)

    const apiVideogamesRaw = [];

    for (let page = 1; page <= totalPages; page++) {
    const response = await axios.get(`${process.env.URL}/games?key=${process.env.API_KEY}&page=${page}&page_size=${pageSize}`);
    const results = response.data.results;
    apiVideogamesRaw.push(...results);
    }

        const apiVideogames = cleanArray(apiVideogamesRaw)


    return [...databaseVideogamesWithGenres , ...apiVideogames]

}

const getVideogameByName = async (name) => {
    const databaseVideogames = await Videogame.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        },
        limit: 15
    });

    const apiVideogamesLimit = 15 - databaseVideogames.length;

    const apiVideogamesRaw = (
        await axios.get(`${process.env.URL}/games?search=${name}&key=${process.env.API_KEY}`)
    ).data.results;

    const apiVideogames = cleanArray(apiVideogamesRaw);

    const allGames = [...databaseVideogames, ...apiVideogames.slice(0, apiVideogamesLimit)];
    console.log(allGames);
    if (!allGames) {
        throw  Error (`There are no games with the name ${name}`)
    }

    return allGames
};


module.exports = {
    createVideogame,
    getGameByid,
    getAllgames,
    getVideogameByName
}