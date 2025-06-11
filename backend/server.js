const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/notesDB');

const Note = mongoose.model('Note', { content: String });

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const newNote = new Note({ content: req.body.content });
  await newNote.save();
  res.json(newNote);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
