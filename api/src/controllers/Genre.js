const axios = require('axios')
const {Genre} = require('../db')

// const getAllGenres = (req,res) => {
//     try {
//         axios.get(`${process.env.URL}/genres?key=${process.env.API_KEY}`).then(({ data }) => {
//             if (data){
//                 const genres = data.results.map((gen) => {
//                     const genre = {
//                         id : gen.id,
//                         name : gen.name
//                     }
//                     return genre
//                 })
//                 res.status(200).json(genres)
//             }  else {
//                 res.status(500).json({ message: "Error in getting the genres" });
//             }
//         })
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }

// }


const getAllGenres = async (req, res) => {
    try {
      // Verificar si ya existen géneros en la base de datos
        const GenresDB = await Genre.findAll();
        if (GenresDB.length > 0) {
        return res.status(200).json(GenresDB);
        }

      // Si no existen géneros, obtenerlos de la API y guardarlos en la base de datos
        const { data } = await axios.get(`${process.env.URL}/genres?key=${process.env.API_KEY}`);
        if (!data) {
        return res.status(500).json({ message: "Error in getting the genres" });
        }

        const genres = data.results.map((gen) => ({
        name: gen.name,
        }));

        const savedGenres = await Genre.bulkCreate(genres);

        res.status(200).json(savedGenres);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getAllGenres,
}