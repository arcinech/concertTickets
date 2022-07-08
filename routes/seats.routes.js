const express = require('express');
const router = express.Router();
const db = require('./../db');
const {v4: uuidv4} = require('uuid');

let data = db.seats;

router.route('/seats')
  .get((req, res) => res.json(data))
  .post((req, res) => {
    req.body.id = uuidv4();
    const {day, seat, client, email} = req.body;
    if (day && seat && client && email) {
      console.log(req.body)
      data.push(req.body)
      res.json({ message: 'OK' });
    } else {
      res.json({message: 'Error'});
    }
  });

router.route('/seats/:id')
  .get((req, res) => res.json(data.find(item =>  item.id === JSON.parse(req.params.id))))
  .put((req,res) => {
    const { day, seat, client, email } = req.body;
    if( day && seat && client && email){
      data = data.map(item => {
        if(item.id === JSON.parse(req.params.id)) {
          item.day = day;
          item.seat = seat;
          item.client = client;
          item.email = email;
        }
        return item;   
      });
      res.json({ message: 'OK' });
    } else res.json({message: 'Error'});
  })
  .delete((req,res) => {
    data = data.filter(item => item.id !== JSON.parse(req.params.id));
    res.json({ message: 'OK' });
  });

module.exports = router;