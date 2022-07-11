const express = require('express');
const router = express.Router();
const db = require('./../db');
const {v4: uuidv4} = require('uuid');
const { text } = require('express');

let data = db.testimonials;

router.route('/testimonials')
  .get((req, res) => res.json(data))
  .post((req, res) => {
    req.body.id = uuidv4();
    const {author, text} = req.body;;
    if (author && text ) {
      console.log(req.body)
      data.push(req.body)
      res.json({ message: 'OK' });
    } else {
      res.send({message: 'Error'});
    }
  });

router.route('/testimonials/random')
  .get((req, res) => {
    const random = Math.floor(Math.random()* db.length);
    res.json(data[random]);
  });

router.route('/testimonials/:id')
  .get((req, res) => res.json(data.find(item => item.id.toString() === req.params.id)))
  .put((req,res) => {
    const {author, text} = req.body;
    if (author && text ) {
      data = data.map(item => {
        if(item.id.toString() === req.params.id){
          item.author = author;
          item.text = text;
        }
        return item;
      });
      res.json({ message: 'OK' });
   } else {
    res.json({message: 'Error'});
   }
  })
  .delete((req,res) => {
      data = data.filter(item => item.id.toString() !== req.params.id);
      res.json({ message: 'OK' });
  });

module.exports = router;
