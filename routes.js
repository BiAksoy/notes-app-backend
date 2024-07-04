import express from 'express';
import { signup, login, getUser } from './controllers/userController.js';
import { addNote, editNote, getAllNotes, deleteNote, pinNote } from './controllers/noteController.js';
import { authenticate } from './utils/jwt.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', authenticate, getUser);
router.post('/add-note', authenticate, addNote);
router.put('/edit-note/:noteId', authenticate, editNote);
router.get('/notes', authenticate, getAllNotes);
router.delete('/delete-note/:noteId', authenticate, deleteNote);
router.put('/pin-note/:noteId', authenticate, pinNote);

router.get('/', (req, res) => {
    res.send('Hello world');
});

export default router;
