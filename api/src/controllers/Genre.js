const axios = require('axios')
const {Genre} = require('../db')

const getAllGenres = async (req, res) => {
    try {
      
        const GenresDB = await Genre.findAll();
        if (GenresDB.length > 0) {
        return res.status(200).json(GenresDB);
        }

      
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