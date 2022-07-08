const express = require('express');
const router = express.Router();
const db = require('./../db');
const {v4: uuidv4} = require('uuid');
const { text } = require('express');

const array = db.seats;

router.route('/seats')
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

router.route('/seats/:id')
  .get((req, res) => res.json(array.find(item => JSON.stringify(item.id) === req.params.id)))
  .put((req,res) => {
    const {day, seat, client, email} = req.body;
    array.map(item => {
      if(item.id === req.params.id) {
        item.day = day;
        item.seat = seat;
        item.client = client;
        item.email = email;
      }
      return item;
    });
    res.send(array);
  })
  .delete((req,res) => {
    if(array.find(item => JSON.stringify(item.id) === req.params.id)){
      array.filter(item => item.id !== req.params.id);
      res.send(array);
    } else res.send('This Id does not exist!');
  });

module.exports = router;