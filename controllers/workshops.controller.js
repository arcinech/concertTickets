const Workshop = require('../models/workshop.model');

exports.getAll = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.send(workshops);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (workshop) {
      res.send(workshop);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.postWorkshop = async (req, res) => {
  const { name, concertId } = req.body;

  try {
    const exist = await Workshop.findOne({ name: name, concertId: concertId });

    if (name && concertId && !exist) {
      const newWorkshop = new Workshop({ name: name, concertId: concertId });
      await newWorkshop.save();
      res.json({ message: 'OK' });
    } else if (exist) {
      res.status(409).json({ message: 'Workshop already exists' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.putById = async (req, res) => {
  const { name, concertId } = req.body;

  try {
    const exist = await Workshop.findById(req.params.id);

    if (exist) {
      exist.name = name ?? exist.name;
      exist.concertId = concertId ?? exist.concertId;
      await exist.save();
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (workshop) {
      await workshop.remove();
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
