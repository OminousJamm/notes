const { Router } = require('express');
const router = Router();
const { renderNoteForm, createNote, renderNotes, renderEditNote, updateNote, deleteNote } = require('../controllers/notes.controller');
const {isAuthenticated} = require('../helpers/auth');

//Create a new note

router.get('/note/add', isAuthenticated, renderNoteForm);
router.post('/note/new-note', createNote);

//Get all notes
router.get('/notes', isAuthenticated, renderNotes);

//Edit Notes
router.get('/note/edit/:id', isAuthenticated, renderEditNote);
router.put('/note/edit/:id', isAuthenticated, updateNote);

//Delete Notes
router.delete('/note/delete/:id', isAuthenticated, deleteNote);

module.exports = router;