const fs = require('fs')
const chalk = require('chalk')
const { argv } = require('process')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added.'));
    } else {
        console.log(chalk.red.inverse('This title already exists.'));
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const remainingNotes = notes.filter(note => note.title !== title)

    if(notes.length !== remainingNotes.length){
        console.log(chalk.green.inverse("Note Removed."));
    } else {
        console.log(chalk.red.inverse("No note found."));
    }

    saveNotes(remainingNotes)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgBlue('Your Notes'));
    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteExists = notes.find(note => note.title === title)
    if(noteExists){
        console.log(chalk.bold(noteExists.title) + ": " + noteExists.body)
    } else {
        console.log(chalk.red.inverse('No note found.'));
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}
