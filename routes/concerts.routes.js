const express = require('express');
const router = express.Router();
const db = require('./../db');
const {v4: uuidv4} = require('uuid');

let data = db.concerts;

router.route('/concerts')
  .get((req, res) => res.json(data))
  .post((req, res) => {
    req.body.id = uuidv4();
    const {performer, genre, price, day, image} = req.body;
    if (performer && genre && price && day && image ) {
      data.push(req.body)
      res.json({ message: 'OK' });
    } else res.json({message: 'Error'});
  });

router.route('/concerts/:id')
  .get((req, res) => res.json(data.find(item => item.id.toString() === req.params.id)))
  .put((req,res) => {
    const {performer, genre, price, day, image} = req.body;
    if (performer && genre && price && day && image ) {
      data = data.map(item => {
        if(item.id.toString() === req.params.id) {
          item.performer = performer;
          item.genre = genre;
          item.price = price;
          item.day = day;
          item.image = image;
        }
        return item;
      });
      res.json({ message: 'OK' });
    } else res.json({message: 'Error'});
  })
  .delete((req,res) => {
    data = data.filter(item => item.id.toString() !== req.params.id);
    res.json({ message: 'OK' });
  });

module.exports = router;