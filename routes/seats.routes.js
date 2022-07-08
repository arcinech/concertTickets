const express = require('express');
const router = express.Router();
const db = require('./../db');
const {v4: uuidv4} = require('uuid');
const { text } = require('express');

const data = db.seats;

router.route('/seats')
  .get((req, res)=> {
    res.json(data);
  })
  .post((req, res) => {
    req.body.id = uuidv4();
    const {day, seat, client, email} = req.body;
    if (day && seat && client && email) {
      console.log(req.body)
      data.push(req.body)
      res.json(req.body);
    } else {
      res.send('error');
    }
  });

router.route('/seats/:id')
  .get((req, res) => {
    
    res.json(data.find(item => {
      const {id} = req.params.id;
      console.log(item.id === id);
      return item.id === JSON.parse(req.params.id)}))})
  .put((req,res) => {
    const {id, day, seat, client, email} = req.body;
    data.map(item => {
      if(item.id === id) {
        item.day = day;
        item.seat = seat;
        item.client = client;
        item.email = email;
      }
      return item;
    });
    res.send(data);
  })
  .delete((req,res) => {
    db.seats.filter(item => item.id !== req.params.id);
    res.send('ok');
  });

module.exports = router;