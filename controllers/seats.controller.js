const Seat = require('../models/seat.model');

exports.getAllSeats = async (req, res) => {
  try { 
    res.send(await Seat.find());
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.postSeat = async (req, res) => {
  const {day, seat, client, email} = req.body;

  try {
    const exist = await Seat.findOne({day, seat});

    if(day && seat && client && email && !exist) {
      const newOrder = new Seat({day: day, seat: seat, client: client, email: email});
      await newOrder.save();
      req.io.emit('seatsUpdated', await Seat.find().lean());
      res.json({message: 'Ok'});
    } else if(exist){
      res.status(409).json({message: 'The slot is already taken...'});
    } else res.status(400).json({message: 'Error'});
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);

    if(seat) res.send(seat);
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.putById = async (req, res) => {
  const {day, seat, client, email} = req.body;

  try {
    const exist = await Seat.findOne({day, seat});
    
    if(exist) {
      exist.day = day;
      exist.seat = seat;
      exist.client = client;
      exist.email = email;
      await exist.save();
      req.io.emit('seatsUpdated', await Seat.find({}));
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.deleteById = async (req, res) => {
  try {
    const exist = await Seat.findById(req.params.id);
    
    if(exist) {
      await exist.remove();
      req.io.emit('seatsUpdated', await Seat.find({}));
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).send(err);
  }
}