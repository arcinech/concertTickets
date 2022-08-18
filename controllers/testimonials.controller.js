const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.send(await Testimonial.find());
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.postTestimonial = async (req, res) => {
  const { author, text } = req.body;
  const cleanAuthor = sanitize(author);
  const cleanText = sanitize(text);

  try {
    const exist = await Testimonial.findOne({ author, text });
    if (author && text && !exist) {
      const newTestimonial = new Testimonial({ author: cleanAuthor, text: cleanText });
      await newTestimonial.save();
      res.json({ message: 'OK' });
    } else if (exist) {
      res.status(409).json({ message: 'This testimonial already exists...' });
    } else res.status(400).json({ message: 'Error' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonial = await Testimonial.findOne().skip(rand);

    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) res.send(testimonial);
    else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.putById = async (req, res) => {
  const { author, text } = req.body;
  try {
    const exist = await Testimonial.findById(req.params.id);
    if (exist) {
      exist.author = author ?? exist.author;
      exist.text = text ?? exist.text;
      await exist.save();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await testimonial.remove();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).send(err);
  }
};
