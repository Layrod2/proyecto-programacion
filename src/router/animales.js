const express = require('express');
const router = express.Router();
const {OnSession,OffSession} = require('../bin/auth.js');
const Animales = require('../schemas/animales.js');
const Category = require('../schemas/categorias.js');

router.get('/animales/create', async (req, res) => {
  const animales = await Animales.find().lean();
  const category = await Category.find().lean();
  res.render('animales', {create:true,animales,category});
});

router.get('/animales', async (req, res) => {
  const animales = await Animales.find().lean();
  const category = await Category.find().lean();

  animales.forEach(key => {
    for (let i = 0; i < category.length; i++) {
      if (category[i]._id == key.category_id) {
        key.category = category[i]
      }
    }
  });


  res.render('animales', {animal:true,animales});
});

router.get('/animales/update/:id', async (req,res) => {
  const ani_up =  await Animales.findById(req.params.id).lean();
  const category = await Category.find().lean().lean();

  for (let i = 0; i < category.length; i++) {
    if (category[i]._id == ani_up.category_id) {
      ani_up.category = category[i]
    }
  }

  res.render('animales', {update:true,ani_up,category});
});

router.post('/animales/new', async (req, res) => {
  const {animal,name,fecha_nacimiento,category} = req.body;
  let vacunasArray = [
    {name:'vacuna1',status:false,status_string:'Falta vacuna'},
    {name:'vacuna2',status:false,status_string:'Falta vacuna'},
    {name:'vacuna3',status:false,status_string:'Falta vacuna'}
  ]
  /* vacunas = [{name:String, status:Boolean, status_string:String}] */
  if (req.body.vacuna1) {
    vacunasArray[0].status = true;
    vacunasArray[0].status_string = 'Vacunado';
  }
  if (req.body.vacuna2) {
    vacunasArray[1].status = true;
    vacunasArray[1].status_string = 'Vacunado';
  }
  if (req.body.vacuna3) {
    vacunasArray[2].status = true;
    vacunasArray[2].status_string = 'Vacunado';
  }

  const NewAnimal = new Animales({
    name:name,
    fecha_nacimiento:fecha_nacimiento,
    category_id:category,
    vacunas: vacunasArray
  });

  const upCategory = await Category.findById(category);
  upCategory.cantidad = upCategory.cantidad + 1;
  await Category.findByIdAndUpdate(category, upCategory);

  await Category.findByIdAndUpdate();

  NewAnimal.save();
  req.flash('succ', 'Animal agregado');
  res.redirect('/animales');
});

router.post('/animales/update', async (req, res) => {
  const {name,category,vacuna1,vacuna2,vacuna3,id} = req.body;
  const animal = await Animales.findById(id);


  if (vacuna1 != undefined) {
    animal.vacunas[0].status = true
    animal.vacunas[0].status_string = 'Vacunado'
    animal.vacunas[0].date = new Date();
  }
  if (vacuna2 != undefined) {
    animal.vacunas[1].status = true
    animal.vacunas[1].status_string = 'Vacunado'
    animal.vacunas[1].date = new Date();
  }
  if (vacuna3 != undefined) {
    animal.vacunas[2].status = true
    animal.vacunas[2].status_string = 'Vacunado'
    animal.vacunas[2].date = new Date();
  }

  await Animales.findByIdAndUpdate(id, animal);
  req.flash('succ', 'Animal Actualizado');
  res.redirect('/animales');
});

router.post('/animales/delete', async(req, res) => {
  await Animales.findByIdAndDelete(req.body.anm_id);
  const cate = await Category.findById(req.body.cat_id)
  cate.cantidad = cate.cantidad - 1;
  await Category.findByIdAndUpdate(req.body.cat_id, cate);
  req.flash('succ', 'Animal eliminado');
  res.redirect('/animales');
});

module.exports = router;
