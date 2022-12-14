const fs = require("fs");
const chalk = require("chalk");

const success = (msg) => {
  console.log(chalk.green.bold(msg));
};

const error = (msg) => {
  console.log(chalk.red.bold(msg));
};

const getNotes = () => "Your notes..";

const addNote = (title, body) => {
  const notes = loadNotes();

  if (!notes.find((note) => note.title === title)) {
    notes.push({
      title,
      body,
    });

    saveNotes(notes);

    success("Save notes successfully");
  } else {
    error("Title's already taken");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  if (notes.find((note) => note.title === title)) {
    const removedNotes = notes.filter((note) => note.title !== title);
    saveNotes(removedNotes);
    success("Note removed successfully");
  } else {
    error("No note found");
  }
};

const listNotes = () => {
  const notes = loadNotes();

  notes.map((note, index) => {
    console.log(`Title ${index + 1}: `, chalk.blue.bold(note.title));
  });
};

const readNote = (title) => {
  const notes = loadNotes();

  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(`Title ${chalk.inverse.white(note.title)}`);
    console.log(`Body ${chalk.inverse.white(note.body)}`);
  } else {
    error("Note not found");
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = JSON.parse(dataBuffer.toString());
    return dataJSON;
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote,
};
