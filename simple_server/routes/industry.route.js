const express = require('express');
const app = express();
const industryRoutes = express.Router();

let Industry = require('../model/Industry');

// api to add industry
industryRoutes.route('/add').post(function (req, res) {
    let industry = new Industry(req.body);
    industry.save()
        .then(industry => {
            res.status(200).json({ 'status': 'success', 'mssg': 'industry added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// api to get industrys
industryRoutes.route('/').get(function (req, res) {
    Industry.find(function (err, industrys) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'industrys': industrys });
        }
    });
});

// api to get industry
industryRoutes.route('/industry/:id').get(function (req, res) {
    let id = req.params.id;
    Industry.findById(id, function (err, industry) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'industry': industry });
        }
    });
});

// api to update route
industryRoutes.route('/update/:id').put(function (req, res) {
    Industry.findById(req.params.id, function (err, industry) {
        if (!industry) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            industry.name = req.body.name;
            industry.cnpj = req.body.cnpj;
            industry.area = req.body.area;

            industry.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// api for delete
industryRoutes.route('/delete/:id').delete(function (req, res) {
    Industry.findByIdAndRemove({ _id: req.params.id }, function (err,) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = industryRoutes;