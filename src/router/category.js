const express = require('express');
const router = express.Router();
const {OnSession,OffSession} = require('../bin/auth.js');
const Category = require('../schemas/categorias.js');

router.get('/category', OnSession, async (req, res) => {
  const category = await Category.find().lean();
  res.render('category', {category,category_section:true});
});

router.get('/category/update/:id', OnSession, async (req, res) => {
  const category_update = await Category.findById(req.params.id).lean();
  // console.log(category_update);
  res.render('category', {update:true,category_update});
});

router.post('/category/update', OnSession, async (req, res) => {
  const {category,description,id} = req.body;
  await Category.findByIdAndUpdate(id, {category,description});
  req.flash('succ', 'Category Actualizada');
  res.redirect('/category');
});

router.post('/category', OnSession, async (req, res) => {
  const {category,description} = req.body;
  const query = await Category.findOne({category:category});

  console.log(description);

  if (query) {
    req.flash('err', 'Ya existe esa categoria');
    res.redirect('/category');
    return;
  }
  const NewCategory = new Category({category,description});
  await NewCategory.save();
  req.flash('succ', 'Categoria creada');
  res.redirect('/category');
});

router.post('/category/delete', OnSession, async (req, res) => {
  const {id} = req.body;
  const query = await Category.findByIdAndDelete(id);
  req.flash('succ', 'Categoria eliminada');
  res.redirect('/category');
});

module.exports = router;
