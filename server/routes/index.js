//index.js inside /api combines all api routes and exports one router middleware module
const router = require("express").Router();

const lyricsRoutes = require("./lyrics");

router.use(lyricsRoutes);

module.exports = router;
