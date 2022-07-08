const express = require('express');
const router = express.Router();
const db = require('./../db');
const {v4: uuidv4} = require('uuid');
const { text } = require('express');

let data = db.testimonials;

router.route('/testimonials')
  .get((req, res)=> {
    res.json(data);
  })
  .post((req, res) => {
    req.body.id = uuidv4();
    const {author, text} = req.body;;
    if (author && text ) {
      console.log(req.body)
      data.push(req.body)
      res.json(req.body);
    } else {
      res.send('error');
    }
  });

router.route('/testimonials/:id')
  .get((req, res) => res.json(array.find(item => item.id === JSON.parse(req.params.id))))
  .put((req,res) => {
    const {author, text} = req.body;
    if (author && text ) {
      data = data.find(item => {
        if(item.id === JSON.parse(req.params.id)){
          item.author = author;
          item.text = text;
        }
      });
   }
  })
  .delete((req,res) => {
      data = data.filter(item => item.id !== JSON.parse(req.params.id));
  });

router.route('/testimonials/random')
  .get((req, res) => {
    const random = Math.floor(Math.random()* db.length);
    res.json(data[random]);
  });

module.exports = router;