const express = require("express");
const router = express.Router();

const { getAllVideogames,
        getVideogameByid,
        postVideogame } = require('../controllers/Videogame')

router.get("/",getAllVideogames)
router.get('/:id',getVideogameByid)
router.post('/',postVideogame)

module.exports = router