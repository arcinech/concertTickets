const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');
const Workshop = require('../models/workshop.model');
const sanitize = require('mongo-sanitize');

const concertsTickets = (concerts, seats) => {
  return concerts?.map(concert => {
    concert._doc.tickets =
      50 -
      seats?.filter(seat => seat.concertId?.toString() === concert._id?.toString())
        .length;
    return concert;
  });
};

exports.getAll = async (req, res) => {
  try {
    let concerts = await Concert.find().populate('workshops');
    const seats = await Seat.find();
    concerts = concertsTickets(concerts, seats);
    res.send(concerts);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.postConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const cleanPerformer = sanitize(performer);
  const cleanGenre = sanitize(genre);

  try {
    const exist = await Concert.findOne({
      performer: cleanPerformer,
      genre: cleanGenre,
      price,
      day,
      image,
    });

    if (performer && genre && price && day && image && !exist) {
      const newConcert = new Concert({
        performer: escapeHTML(cleanPerformer),
        genre: escapeHTML(cleanGenre),
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
    const concert = await Concert.findById(req.params.id).populate('workshops');
    const seats = await Seat.find({ concertId: req.params.id });
    if (concert) {
      const tickets = 50 - seats.length;
      concert._doc.tickets = tickets;
      res.send(concert);
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.putById = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const conc = await Concert.findById(sanitize(req.params.id));
    if (conc) {
      const workshops = await Workshop.find({ concertId: sanitize(req.params.id) });

      conc.performer = escapeHTML(performer) ?? conc.performer;
      conc.genre = escapeHTML(genre) ?? conc.genre;
      conc.price = price ?? conc.price;
      conc.day = day ?? conc.day;
      conc.image = image ?? conc.image;
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
    const concerts = await Concert.find({ performer: req.params.performer }).populate(
      'workshops'
    );
    const seats = await Seat.find();
    if (concerts) {
      res.send(concertsTickets(concerts, seats));
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const concerts = await Concert.find({ genre: req.params.genre }).populate(
      'workshops'
    );
    const seats = await Seat.find();
    if (concerts) {
      res.send(concertsTickets(concerts, seats));
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
    }).populate('workshops');
    const seats = await Seat.find();
    if (concerts) {
      res.send(concertsTickets(concerts, seats));
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getByDay = async (req, res) => {
  try {
    const concerts = await Concert.find({ day: req.params.day }).populate('workshops');
    const seats = await Seat.find();
    if (concerts) {
      res.send(concertsTickets(concerts, seats));
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
