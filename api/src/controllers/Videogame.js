const axios = require('axios')
const {createVideogame,getGameByid,getVideogameByName,getAllgames} = require('../handlers/VideogameHandler')

async function getAllVideogames(req, res) {
    const {name} = req.query
    const result =  name ? await getVideogameByName(name) : await getAllgames()
    try {
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: error });
    }
    }

const getVideogameByid = async (req,res) => {
    const {id} = req.params
    const source = isNaN(id) ? 'bdd' : 'api'
    try {
        const VideogameById = await getGameByid(id,source)
        res.status(200).json(VideogameById)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const postVideogame = async (req,res) => {
    try {
        const {name,description,platforms,image,releaseDate,rating,genres} = req.body
        const newVideogame = await createVideogame(name,description,platforms,image,releaseDate,rating,genres)
        res.status(201).json(newVideogame)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

    
module.exports = {
    getAllVideogames,
    getVideogameByid,
    postVideogame
}