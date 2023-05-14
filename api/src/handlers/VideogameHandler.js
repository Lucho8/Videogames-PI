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
            rating:game.rating,
            created:false
        }
    })



// const createVideogame = async (name,description,platforms,image,releaseDate,rating) => {
//     const newVideogame = await Videogame.create({name,description,platforms,image,releaseDate,rating})
//     return newVideogame
// }

const createVideogame = async (name,description,platforms,image,releaseDate,rating, genres) => {
    // Crear el nuevo videojuego
    const newVideogame = await Videogame.create({
        name,
        description,
        platforms,
        image,
        releaseDate,
        rating
    });

    // Verificar que los géneros existen y agregarlos a la tabla de asociación
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
        const game = await Videogame.findByPk(id)
        return game
    }
        const { data } = await axios(`${process.env.URL}/games/${id}?key=${process.env.API_KEY}`);
            const game =  {
                id:data.id,
                name:data.name,
                description:data.description,
                image:data.background_image,
                releaseDate:data.released,
                platforms:data.parent_platforms.map((platform) => platform.platform.name),
                rating:data.rating,
                created:false
            }
        return game
}

const getAllgames = async () => {

    const databaseVideogames  = await Videogame.findAll()

    const apiVideogamesRaw = (
        await axios.get(`${process.env.URL}/games?key=${process.env.API_KEY}`)
    ).data.results

        const apiVideogames = cleanArray(apiVideogamesRaw)

        return [...databaseVideogames , ...apiVideogames]

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

    return [...databaseVideogames, ...apiVideogames.slice(0, apiVideogamesLimit)];
};


module.exports = {
    createVideogame,
    getGameByid,
    getAllgames,
    getVideogameByName
}