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
