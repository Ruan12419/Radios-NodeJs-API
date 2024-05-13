const express = require('express');
const radioRoute = express.Router();

// Importação do Model e da lista de Radios
let Radio = require('../model/Radio');

/** 
 * Cada rota realiza a sua operação na lista de radios, antes de manipular o Model através do ORM
*/


// Rota para adicionar uma nova rádio
radioRoute.route('/add').post(function (req, res) {
  let radio = new Radio(req.body);
  radio.save()
  .then(radio => {
    res.status(200).json({'status': 'success','mssg': 'radio added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// Rota para ler/retornar as rádios salvas
radioRoute.route('/').get(function (req, res) {
  Radio.find().then(radios => {
    res.status(200).json({'status': 'success','radios': radios});
  }).catch(err => {
    console.log(err);
    res.status(409).json({'status': 'failure','mssg': 'Something went wrong', "erro": err});
  });
});

// Rota para retornar uma rádio salva atráves do seu id
radioRoute.route('/radio/:id').get(function (req, res) {
  let id = req.params.id;
  Radio.findById(id, function (err, radio){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','radio': radio});
    }
  });
});

// Rota para atualizar rádio salva atráves do seu id
radioRoute.route('/update/:id').put(function (req, res) {
  Radio.findById(req.params.id)
    .then(radio => {
      if (!radio){
        res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
      } else {
          radio.name = req.body.name;
          radio.band = req.body.band;
          radio.frequency = req.body.frequency;
          radio.location = req.body.location;
          radio.language = req.body.language;
          radio.genre = req.body.genre;
          radio.website = req.body.website;
          radio.area = req.body.area;

          radio.save().then(radio => {
            res.status(200).json({'status': 'success','mssg': 'Update complete'});
          })
      }
    })
});

// Rota para deletar uma rádio salva através do seu id
radioRoute.route('/delete/:id').delete(function (req, res) {
  Radio.findByIdAndDelete({_id: req.params.id})
    .then(() => {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    })
    .catch(err => {
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    });
});


// Exportação das rotas
module.exports = radioRoute;
