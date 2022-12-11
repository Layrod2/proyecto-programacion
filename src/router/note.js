const express = require('express');
const router = express.Router();
const {OnSession,OffSession} = require('../bin/auth.js');
const Note = require('../schemas/note.js');

router.get('/note', OnSession, async (req, res) => {
  const note = await Note.find({create_by:req.user._id}).lean();
  res.render('note', {note, note_pag:true});
});

router.get('/note/create', OnSession, (req, res) => {
  res.render('note', {create:true});
});

router.get('/note/update/:id', OnSession, async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render('note', {update:true, update_values:note});
});

router.post('/note/new', OnSession, async (req,res) => {
  const {title, description} = req.body;

  if (!title || !description) {
    req.flash('err', 'Debes completar todos los campos');
    res.redirect('/note/create');
  }

  const NewNote = new Note({title, description, create_by:req.user._id});
  await NewNote.save()
  req.flash('succ', 'Nota creada exitosamente.')
  res.redirect('/note');
});

router.post('/note', OnSession, async (req,res) => {
  const {title,description,id} = req.body;
  const updateNote = {title,description};
  await Note.findByIdAndUpdate(id, updateNote);
  req.flash('succ', 'Nota Actualizada');
  res.redirect('/note');
});

router.post('/note/delete/:id', OnSession, async (req,res) => {
  const {id} = req.params;
  await Note.findByIdAndDelete(id);
  req.flash('succ', 'Nota Eliminada');
  res.redirect('/note');
});

module.exports = router;
