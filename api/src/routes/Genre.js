const express = require("express");
const router = express.Router();

const {getAllGenres} = require('../controllers/Genre')

router.get('/',getAllGenres)

module.exports = router