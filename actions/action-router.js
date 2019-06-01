const express = require('express');

const router = require('express').Router();

const db = require('../data/dbConfig.js');

router.get('/', (req, res) => {
  db('actions')
  .then(actions => {
    res.status(200).json(actions);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

router.post('/', (req, res) => {
  db('actions').insert(req.body, 'id')
  .then(ids => {
    db('actions')
    .where({ id: ids[0] })
    .first()
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      res.status(500).json(err);
    })
  })
})

module.exports = router;
