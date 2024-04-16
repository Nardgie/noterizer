const express = require('express');
const path = require('path');
// const fs = require('fs');
// const { readFromFile, writeToFile, readAndAppend } = require('./helper/fsUtil');
// const notes = require('./db/db.json');

// api routes
const api = require("./controllers/index.js");

const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
console.log(uuidv4());

const app = express();

// const PORT = process.env.PORT || 3001;
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', api);

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
// app.get("/api/notes", (req, res) => {
//     console.info(`${req.method} request received for notes`)

//       readFromFile("./database/db.json")
//       .then(notes => {
//         res.json(JSON.parse(notes));
//     }).catch(err => {
//         console.error(err);
//         res.status(500).json({ error: 'An error occurred while fetching notes.' });
//     });
//     //   .then((data) => res.json(JSON.parse(data))); 

// })

// // DELETE Route for a specific tip
// app.delete('/api/notes/:id', (req, res) => {
//   const noteId = req.params.id;
//   readFromFile('./database/db.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       // Make a new array of all tips except the one with the ID provided in the URL
//       const result = json.filter((note) => note.id !== noteId);

//       // Save that array to the filesystem
//       writeToFile('./database/db.json', result);

//       // Respond to the DELETE request
//       res.json(`Item ${noteId} has been deleted 🗑️`);
//     });
// });


// app.post("/api/notes", (req, res) => {
//     console.info(`${req.method} request received to add a note`);

//     const { title, text } = req.body;

//     // if (req.body) {
//         if (title && text) {
//             const newNote = {
//                 title,
//                 text,
//                 note_id: uuidv4()
//             };

    
//             // const notes = JSON.stringify(newNote);
//                 // notes.push(newNote);

//             readAndAppend(newNote, './database/db.json');
//                 // res.json(`Note added successfully`);
            
//             console.log(readAndAppend(`${newNote}`, './database/db.json'));
//             const response = {
//                 status: 'success',
//                 body: newNote,
//                 };

//                 console.log(response);
//                 res.status(201).json(response);
//             } else {
//                 res.status(500).json('Error in posting review');
//             }
            
// })

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