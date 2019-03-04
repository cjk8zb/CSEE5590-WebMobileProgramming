const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK */
router.put('/:id', function (req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function (err, updates) {
    if (err) return next(err);
    res.json(updates);
  });
});

/* DELETE BOOK */
router.delete('/:id', function (req, res, next) {
  Book.findByIdAndDelete(req.params.id, function (err, opt) {
    if (err) return next(err);
    res.json(opt);
  });
});


module.exports = router;
