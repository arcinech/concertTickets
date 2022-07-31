const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');
const Workshop = require('../models/workshop.model');

exports.getAll = async (req, res) => {
  try {
    let concerts = await Concert.find();
    const seats = await Seat.find();
    concerts = concerts?.map(concert => {
      concert._doc.freeSeats =
        50 -
        seats?.filter(seat => seat.concertId?.toString() === concert._id?.toString())
          .length;
      return concert;
    });
    res.send(concerts);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.postConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const exist = await Concert.findOne({ performer, genre, price, day, image });

    if (performer && genre && price && day && image && !exist) {
      const newConcert = new Concert({
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image,
      });
      await newConcert.save();
      res.json({ message: 'OK' });
    } else if (exist) {
      res.status(409).json({ message: 'This concert already exists on this day...' });
    } else res.status(400).json({ message: 'Error' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    const seats = await Seat.find({ concertId: req.params.id });
    if (concert) {
      const freeSeats = 50 - seats.length;
      concert._doc.freeSeats = freeSeats;
      res.send(concert);
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.putById = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const conc = await Concert.findById(req.params.id);
    if (conc) {
      conc.performer = performer ?? conc.performer;
      conc.genre = genre ?? conc.genre;
      conc.price = price ?? conc.price;
      conc.day = day ?? conc.day;
      conc.image = image ?? conc.image;
      const workshops = await Workshop.find({ concertId: req.params.id });
      conc.workshops = workshops.map(a => a._id);
      await conc.save();
      res.json(conc);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);

    if (concert) {
      await concert.remove();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const concerts = await Concert.find({ performer: req.params.performer });

    if (concerts) {
      res.send(concerts);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const concerts = await Concert.find({ genre: req.params.genre });

    if (concerts) {
      res.send(concerts);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const concerts = await Concert.find({
      price: { $gte: req.params.price_min, $lte: req.params.price_max },
    });

    if (concerts) {
      res.send(concerts);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getByDay = async (req, res) => {
  try {
    const concerts = await Concert.find({ day: req.params.day });

    if (concerts) {
      res.send(concerts);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
