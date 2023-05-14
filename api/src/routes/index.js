const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Videogame = require("./Videogame");
const Genre = require('./Genre')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames',Videogame)
router.use('/genres',Genre)


module.exports = router;
