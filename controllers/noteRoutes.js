const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");
const { writeToFile, readAndAppend } = require("../helper/fsUtil");

router.get("/", (req, res) => {
    fs.readFile("./database/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json(JSON.parse(data));
    });
})

router.post("/", (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, "./database/db.json");
        res.status(200).json("Note added successfully");
    } else {
        res.error("Error in adding note");
    }
})


module.exports = router;    