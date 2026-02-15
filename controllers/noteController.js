import Note from '../models/Note.js';

export async function listNotes(req, res) {
    try {
        const all_notes = await Note.find({ userId: 'temp-user-id' }).sort({ createdAt: -1 }); // find all notes for the user and sort by creation date (newest first)
        res.render('index', { notes: all_notes });
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send('Failed to fetch notes');
    }
}

export async function createNewNote(req, res) {
    try {
        let { title, content } = req.body; // read submitted form data from request body
        if (!title || !content) { // server-side validation: check to make sure both title and content are provided
            return res.status(400).send('Title and content are required');
        }
        await Note.create({ title, content, userId: 'temp-user-id' });
        listNotes(req, res); // after creating a new note, fetch and display the updated list of notes
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).send('Failed to create note');
    }
}

export async function updateNote(req, res) {
    try {
        const { id } = req.params; // read note id from URL (eg, /notes/123)
        let { title, content } = req.body; 
        if (!title || !content) {
            return res.status(400).send('Title and content are required');
        }
        const updatedNote = await Note.findOneAndUpdate(
            { _id: id, userId: 'temp-user-id' }, // find the note by id and userId to ensure users can only update their own notes
            { title, content }, // update the note's title and content
        );
        if (!updatedNote) { // if no note was found with the given id and userId, return a 404 error
            return res.status(404).send('Note not found');
        }
        listNotes(req, res); // re-render list page so user sees updated data
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).send('Failed to update note');
    }
}

export async function deleteNote(req, res) {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findOneAndDelete(
            { _id: id, userId: 'temp-user-id' }
        );
        if (!deletedNote) {
            return res.status(404).send('Note not found');
        }
        listNotes(req, res);
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).send('Failed to delete note');
    }
}


export async function redirectToNewNote(req, res) {
    res.render('notes/new', { title: 'New Note' }); // render the form for creating a new note
}

export async function redirectToEditNote(req, res) {
    try {
        const { id } = req.params;
        const note = await Note.findOne(
            { _id: id, userId: 'temp-user-id' }
        );
        if (!note) {
            return res.status(404).send('Note not found');
        }
        res.render('notes/edit', { title: 'Edit Note', note });
    } catch (error) {
        console.error('Error loading edit page:', error);
        res.status(500).send('Failed to load edit page');
    }
}

export async function redirectToDeleteNote(req, res) {
    try {
        const { id } = req.params;
        const note = await Note.findOne(
            { _id: id, userId: 'temp-user-id' }
        );
        if (!note) {
            return res.status(404).send('Note not found');
        }
        res.render('notes/delete', { title: 'Delete Note', note });
    } catch (error) {
        console.error('Error loading delete page:', error);
        res.status(500).send('Failed to load delete page');
    }
}