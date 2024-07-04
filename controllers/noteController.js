import Note from '../models/note.js';

export const addNote = async (req, res) => {
    const { title, content, tags } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        const newNote = new Note({
            title,
            content,
            tags: tags || [],
            userId: req.userData.userId,
        });

        await newNote.save();

        res.json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const editNote = async (req, res) => {
    const { title, content, tags, isPinned } = req.body;
    const { noteId } = req.params;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.userId !== req.userData.userId) {
            return res.status(403).json({ message: 'You are not authorized to edit this note' });
        }

        note.title = title;
        note.content = content;
        note.tags = tags || [];
        note.isPinned = isPinned || false;

        await note.save();

        res.json({ message: 'Note updated successfully', note });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userData.userId });

        res.json({ notes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
