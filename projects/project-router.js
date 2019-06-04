const express = require('express');
const db = require('../data/dbConfig.js');

const router = require('express').Router();

router.get('/', (req, res) => {
  db('projects')
  .then(projects => {
    res.status(200).json(projects);
  })
  .catch(err => {
    console.log(err);
  })
})


router.get('/project/:id', (req, res) => {
  const { id } = req.params;
    db('projects')
    .where({ id: id })
    .first()
    .then(project => {
      db('actions')
      .where({ project_id: id })
      .then(actions => {
        project.actions = actions
        res.status(200).json(project)
      })
    })
    .catch(err => {
      res.status(500).json(err);
    })
  })


router.post('/', (req, res) => {
   db('projects').insert(req.body, 'id')
   .then(ids => {
     db('projects')
     .where({ id: ids[0] })
     .first()
     .then(project => {
       res.status(200).json(project)
     })
     .catch(err => {
       res.status(500).json(err);
     })
   })
})

module.exports = router;
