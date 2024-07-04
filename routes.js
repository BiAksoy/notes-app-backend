import express from 'express';
import { signup, login } from './controllers/userController.js';
import { addNote } from './controllers/noteController.js';
import { authenticate } from './utils/jwt.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/add-note', authenticate, addNote);

router.get('/', (req, res) => {
    res.send('Hello world');
});

export default router;
