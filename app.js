const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

// Customize yargs version
yargs.version("1.1.0");

// Create add command line arguments
yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    description: {
      describe: "Note description",
      demandOption: false,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Removing a note",
  builder: {
    title: {
      describe: "Title to remove",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

// Challenge:: Add to new commands
//
// 1. Setup command to support 'list' command (print placeholder message for now)
// 2. Setup command to support 'read' command (print placeholder message for now)
// 3. Test your work by running both commands and ensure correct output (node file.js --help)

yargs.command({
  command: "list",
  describe: "list the note",
  builder: {},
  handler: (argv) => {
    console.log(chalk.inverse.white("List titles: "));
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "read the note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  },
});

yargs.parse();
// console.log(yargs.argv);
