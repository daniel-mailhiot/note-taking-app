import Note from '../models/Note.js';

// Show all notes for the logged-in user (newest first)
export async function listNotes(req, res) {
    try {
        // Find all notes for the logged-in user and sort by creation date
        const allNotes = await Note.find({ userId: req.session.userId }).sort({ createdAt: -1 });
        
        return res.render('notes/index', {
            title: 'My Notes',
            notes: allNotes
        });
    } catch (error) {
        console.error('Error fetching notes:', error);
        return res.status(500).send('Failed to fetch notes');
    }
}

// Create a new note after validating required fields
export async function createNewNote(req, res) {
    try {
        // Read submitted form data from request body
        let { title, content } = req.body; 

        // Server-side validation: check to make sure both title and content are provided
        if (!title || !content) { 
            return res.status(400).send('Title and content are required');
        }

        // Attach the logged-in user's ID to the new note so we can associate it with the user
        await Note.create({
            title,
            content,
            userId: req.session.userId
        });

        // Re-render the list so the user can see the new note
        return listNotes(req, res); 
    } catch (error) {
        console.error('Error creating note:', error);
        return res.status(500).send('Failed to create note');
    }
}

// Update an existing note owned by the logged-in user
export async function updateNote(req, res) {
    try {
        const { id } = req.params; // read note id from URL (eg, /notes/123)
        let { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).send('Title and content are required');
        }

        // Enforce note ownership
        const updatedNote = await Note.findOneAndUpdate(
            { _id: id, userId: req.session.userId }, // find the note by id and userId to ensure users can only update their own notes
            { title, content }, // update the note's title and content
        );

        if (!updatedNote) { 
            return res.status(404).send('Note not found');
        }

        // Re-render list page so user sees updated data
        return listNotes(req, res); 
    } catch (error) {
        console.error('Error updating note:', error);
        return res.status(500).send('Failed to update note');
    }
}

// Delete a note owned by the logged-in user
export async function deleteNote(req, res) {
    try {
        const { id } = req.params;

        // Find the note by id and userId to ensure users can only delete their own notes
        const deletedNote = await Note.findOneAndDelete({
            _id: id,
            userId: req.session.userId
        });

        if (!deletedNote) {
            return res.status(404).send('Note not found');
        }

        return listNotes(req, res);
    } catch (error) {
        console.error('Error deleting note:', error);
        return res.status(500).send('Failed to delete note');
    }
}

// Render the form page for creating a new note
export async function redirectToNewNote(req, res) {
    return res.render('notes/new', { title: 'New Note' });
}

// Render the form page for editing an existing note owned by the logged-in user
export async function redirectToEditNote(req, res) {
    try {
        const { id } = req.params;

        const note = await Note.findOne({
            _id: id,
            userId: req.session.userId
        });

        if (!note) {
            return res.status(404).send('Note not found');
        }

        return res.render('notes/edit', { title: 'Edit Note', note });
    } catch (error) {
        console.error('Error loading edit page:', error);
        return res.status(500).send('Failed to load edit page');
    }
}

// Render the confirmation page for deleting a note owned by the logged-in user
export async function redirectToDeleteNote(req, res) {
    try {
        const { id } = req.params;

        const note = await Note.findOne({
            _id: id,
            userId: req.session.userId
        });

        if (!note) {
            return res.status(404).send('Note not found');
        }

        return res.render('notes/delete', {
            title: 'Delete Note',
            note
        });
    } catch (error) {
        console.error('Error loading delete page:', error);
        return res.status(500).send('Failed to load delete page');
    }
}