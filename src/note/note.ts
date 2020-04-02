import {readFileSync, writeFileSync} from 'fs';

export class Note {
    private title: string;
    private text: string;

    constructor() {
        this.title = '';
        this.text = '';
    }

    addNote(title: string, text: string): boolean {
        this.title = title;
        this.text = text;

        let notes = Note.loadNotes();

        const duplicatedNotes = notes.filter(function (note: Note) {
            return note.title === title;
        });

        if (duplicatedNotes.length === 0) {
            notes.push({
                title: this.title,
                text: this.text
            });

            writeFileSync('storage/notes.json', JSON.stringify(notes));

            return true;
        }
        return false;
    }
    removeNote(title: string): boolean {
        let matchedNoteCount: number = 0;
        let notes = Note.loadNotes();

        const finalNotes = notes.filter(function (note: Note) {
            if (note.title !== title) {
                return true;
            }
            matchedNoteCount++;
            return false;
        });

        if (matchedNoteCount === 0) {
            return false;
        }

        writeFileSync('storage/notes.json', JSON.stringify(finalNotes));

        return true;
    }
    private static loadNotes() {
        try {
            const dataBuffer = readFileSync('storage/notes.json');
            const dataJSON = dataBuffer.toString();
            return JSON.parse(dataJSON);
        } catch (e) {
            return [];
        }
    }
}
