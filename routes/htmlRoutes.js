const path = require("path");
const router = require("express").Router();

//----routing----


    router.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "./public/index.html"))
    });

    router.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"))
    });

    router.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"))
    });

    router.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, ""))
    });

//----export router

module.exports = router;