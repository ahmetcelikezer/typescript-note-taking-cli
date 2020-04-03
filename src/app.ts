import {green, red, yellow} from 'chalk';
import {command} from 'yargs';

import {Note} from './note/note';

command('add', 'Adds a new note.', {
    title: {
        describe: 'The title of note.',
        demandOption: true,
        type: 'string'
    },
    text: {
        describe: 'Text content for note',
        demandOption: true,
        type: 'string',
    }
}, (argv) => {
    if(new Note().addNote(argv.title, argv.text)) {
        console.log(green(`The new note "${argv.title}" added to your notes!`));
    } else {
        console.log(red(`There is already note exists with title of "${argv.title}"`));
    }
}).parse();

command('remove', 'Removes a existent note.', {
    title: {
        describe: 'The title of note to remove.',
        demandOption: true,
        type: 'string',
    }
}, (argv) => {
    if (new Note().removeNote(argv.title)) {
        console.log(yellow(`Message has been removed titled has "${argv.title}".`));
    } else {
        console.log(red(`There is no note can found with title of "${argv.title}"`));
    }
}).parse();
