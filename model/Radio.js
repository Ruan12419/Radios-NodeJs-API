const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Criação da entidade para ORM
let Radio = new Schema({
  name: {
    type: String
  },
  band: {
    type: String
  },
  frequency: {
    type: Number
  },
  location: {
    type: String
  },
  language: {
    type: String
  },
  genre: {
    type: String
  },
  website: {
    type: String
  },
  area: {
    type: String
  }
},{
    collection: 'radio'
});

// Exportação do Model
module.exports = mongoose.model('Radio', Radio);