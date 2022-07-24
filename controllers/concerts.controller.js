const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => { 
  try { 
    res.send(await Concert.find());
  }
  
  catch (err) {
    res.status(500).send(err);
  }
};

exports.postConcert = async (req, res) => { 
  const {performer, genre, price, day, image} = req.body;

  try {
    const exist = await Concert.findOne({performer, genre, price, day, image});

    if(performer && genre && price && day && image && !exist) {
      const newConcert = new Concert({performer: performer, genre: genre, price: price, day: day, image: image});
      await newConcert.save();
      res.json({ message: 'OK' });
    } else if(exist){
      res.status(409).json({message: 'This concert already exists on this day...'});
    } else res.status(400).json({message: 'Error'});
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getById = async (req, res) => { 
  try {
    const concert = await Concert.findById(req.params.id);

    if(concert) res.send(concert);
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.putById = async (req, res) => {
  const {performer, genre, price, day, image} = req.body;

  try {
    const exist = await Concert.findOne({performer, genre, price, day, image});

    if(exist) {
      exist.performer = performer;
      exist.genre = genre;
      exist.price = price;
      exist.day = day;
      exist.image = image;
      await exist.save();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);

    if(concert) {
      await concert.remove();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).send(err);
  }
};