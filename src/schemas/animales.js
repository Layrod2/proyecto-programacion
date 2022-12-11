const mongoose = require('mongoose');
const { Schema } = mongoose;

const Animales = new Schema({
  name: {type: String, require: true},
  fecha_nacimiento: {type: Date, require: false},
  category_id: {type: String, require: true},
  vacunas: [
    {
      name: {type: String, defautl:'Vacuna 1'},
      status: {type: Boolean, require:true},
      status_string: {type: String, require:true},
      date: {type: Date, default: Date.now}
    },{
      name: {type: String, defautl:'Vacuna 2'},
      status: {type: Boolean, require:true},
      status_string: {type: String, require:true},
      date: {type: Date, default: Date.now}
    },{
      name: {type: String, defautl:'Vacuna 3'},
      status: {type: Boolean, require:true},
      status_string: {type: String, require:true},
      date: {type: Date, default: Date.now}
    }
  ]
});

module.exports = mongoose.model('Animales', Animales);
