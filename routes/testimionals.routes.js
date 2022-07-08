const express = require('express');
const router = express.Router();
const db = require('./../db');
const {v4: uuidv4} = require('uuid');
const { text } = require('express');

const array = db.testimonials;

router.route('/testimonials')
  .get((req, res)=> {
    res.json(array);
  })
  .post((req, res) => {
    req.body.id = uuidv4();
    const {author, text} = req.body;;
    if (author && text ) {
      console.log(req.body)
      db.push(req.body)
      res.json(req.body);
    } else {
      res.send('error');
    }
  });

router.route('/testimonials/:id')
  .get((req, res) => res.json(array.find(item => JSON.stringify(item.id) === req.params.id)))
  .put((req,res) => {
    const change = array.find(item => JSON.stringify(item.id) === req.params.id);
    const {author, text} = req.body;
    if(change) {
      change.author = author;
      change.text = text;
    } else {
      db.push({id: uuidv4(), text: text, author: author});
    };
  })
  .delete((req,res) => {
    if(array.find(item => JSON.stringify(item.id) === req.params.id)){
      array.filter(item => JSON.stringify(item.id) !== req.params.id);
    } else res.send('This Id does not exist!');
  });

router.route('/testimonials/random')
  .get((req, res) => {
    const random = Math.floor(Math.random()* db.length);
    res.json(array[random]);
  });

module.exports = router;