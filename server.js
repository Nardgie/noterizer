const express = require('express');
const path = require('path');
// const fs = require('fs');
const { readFromFile, writeToFile, readAndAppend } = require('./helper/fsUtil');
// const notes = require('./db/db.json');

// const api = require("")

const { v4: uuidv4 } = require('uuid');
console.log(uuidv4());

const app = express();

// const PORT = process.env.PORT || 3001;
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// API route to get all notes
app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received for notes`)

      readFromFile("./database/db.json").then((data) => res.json(JSON.parse(data)));

})

app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    // if (req.body) {
        if (title && text) {
            const newNote = {
                title,
                text,
                note_id: uuidv4()
            };

    
            // const notes = JSON.stringify(newNote);
                // notes.push(newNote);

            readAndAppend(newNote, './database/db.json');
                res.json(`Note added successfully`);
            
  
            const response = {
                status: 'success',
                body: newNote,
                };

                console.log(response);
                res.status(201).json(response);
            } else {
                res.status(500).json('Error in posting review');
            }
            
        })

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
})

/*
// This API route is a GET Route for retrieving all the tips
app.get('/api/tips', (req, res) => {
  console.info(`${req.method} request received for tips`);
  readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
});

// This API route is a POST Route for a new UX/UI tip
app.post('/api/tips', (req, res) => {
  console.info(`${req.method} request received to add a tip`);

  const { username, topic, tip } = req.body;

  if (req.body) {
    const newTip = {
      username,
      tip,
      topic,
      tip_id: uuid(),
    };

    readAndAppend(newTip, './db/tips.json');
    res.json(`Tip added successfully`);
  } else {
    res.error('Error in adding tip');
  }
});
*/