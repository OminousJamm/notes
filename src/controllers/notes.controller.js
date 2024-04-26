const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

notesCtrl.createNote = async  (req, res) => {
    const {title, description} = req.body;
    const note = new Note({title,description});
    note.user = req.user.id;
    await note.save();
    req.flash('success_msg','Note created successfully');
    res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res) => {
    const notes =  await Note.find({user: req.user.id}).sort({createdAt: 'desc'});
    res.render('notes/all-notes',{notes});
};

notesCtrl.renderEditNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(note.user != req.user.id){
        req.flash('error_msg','Not Authorized');
        return res.redirect('/notes');
    };
    res.render('notes/edit-note',{note});  
};

notesCtrl.updateNote = async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg','Note updated successfully');
    res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Note deleted successfully');
    res.redirect('/notes');
};

module.exports = notesCtrl;