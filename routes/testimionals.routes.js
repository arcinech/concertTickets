const express = require('express');
const router = express.Router();
const db = require('./../db');
const {v4: uuidv4} = require('uuid');

router.route('/testimionals')
  .get((req, res)=> {
    res.json(db.testimionals);
  })
  .post((req, res) => {
    req.body.id = uuidv4();
    const {author, text} = req.body;;
    if (author && text ) {
      console.log(req.body)
      res.json(req.body);
    } else {
      res.send('error');
    }
  });

router.route('/testimonials/:id')
  .get((req, res) => res.json(db.testimonials.find(item => JSON.stringify(item.id) === req.params.id)))
  .put((req,res) => {
    const change = res.json(db.find(item => item.id === req.params.id));
    const {author, name} = req.body;
    
  })
  .delete((req,res) => { res.send({message: 'ok'})});

router.route('testimonials/random')
  .get((req, res) => {
    req.body.id = uuidv4();
    const {author, text} = req.body;;
    if (author && text ) {
      console.log(req.body)
      res.json(req.body);
    } else {
      res.send('error');
    }
  })

module.exports = testimonials;