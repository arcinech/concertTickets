const expect = require('chai').expect;
const mongoose = require('mongoose');
const Testimonial = require('../testimonial.model');

describe('Testimonial CRUD', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/NewWaveDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {
    beforeEach(async () => {
      const testTesOne = new Testimonial({
        author: 'Author #1',
        text: 'Lorem ipsum dolor sit amet',
      });
      await testTesOne.save();

      const testTesTwo = new Testimonial({
        author: 'Author #2',
        text: 'Lorem ipsum dolor sit amet',
      });
      await testTesTwo.save();
    });

    afterEach(async () => {
      await Testimonial.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const testimonials = await Testimonial.find();
      expect(testimonials).to.be.an('array');
      expect(testimonials).to.have.lengthOf(2);
    });

    it('should return a proper document by "author" with "findOne" method', async () => {
      const testimonial = await Testimonial.findOne({ author: 'Author #1' });
      expect(testimonial).to.be.an('object');
      expect(testimonial.author).to.equal('Author #1');
    });

    it('should return a proper document by "text" with "findOne" method', async () => {
      const testimonial = await Testimonial.findOne({
        text: 'Lorem ipsum dolor sit amet',
      });
      expect(testimonial).to.be.an('object');
      expect(testimonial.text).to.equal('Lorem ipsum dolor sit amet');
    });
  });

  describe('Creating data', () => {
    after(async () => {
      await Testimonial.deleteMany();
    });

    it('should insert new document with "save" method', async () => {
      const testimonial = new Testimonial({
        author: 'Author #1',
        text: 'Lorem ipsum dolor sit amet',
      });
      await testimonial.save();
      expect(testimonial.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testTesOne = new Testimonial({
        author: 'Author #1',
        text: 'Lorem ipsum dolor sit amet',
      });
      await testTesOne.save();

      const testTesTwo = new Testimonial({
        author: 'Author #2',
        text: 'Lorem ipsum dolor sit amet',
      });
      await testTesTwo.save();
    });

    afterEach(async () => {
      await Testimonial.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Testimonial.updateOne(
        { author: 'Author #1' },
        { $set: { author: '= Author #1 =' } }
      );
      const updatedTestimonial = await Testimonial.findOne({ author: '= Author #1 =' });
      expect(updatedTestimonial).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const testimonial = await Testimonial.findOne({ author: 'Author #1' });
      testimonial.author = '= Author #1 =';
      await testimonial.save();

      const updatedTestimonial = await Testimonial.findOne({ author: '= Author #1 =' });
      expect(updatedTestimonial).to.not.be.null;
    });

    it('should properly update many documents with "updateMany" method', async () => {
      await Testimonial.updateMany({}, { $set: { text: 'updated text' } });
      const updatedTestimonials = await Testimonial.find({ text: 'updated text' });
      expect(updatedTestimonials.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testTesOne = new Testimonial({
        author: 'Author #1',
        text: 'Lorem ipsum dolor sit amet',
      });
      await testTesOne.save();

      const testTesTwo = new Testimonial({
        author: 'Author #2',
        text: 'Lorem ipsum dolor sit amet',
      });
      await testTesTwo.save();
    });

    afterEach(async () => {
      await Testimonial.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Testimonial.deleteOne({ author: 'Author #1' });
      const testimonial = await Testimonial.findOne({ author: 'Author #1' });
      expect(testimonial).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const testimonial = await Testimonial.findOne({ author: 'Author #1' });
      await testimonial.remove();
      const removedTestimonial = await Testimonial.findOne({ author: 'Author #1' });
      expect(removedTestimonial).to.be.null;
    });

    it('should properly remove all documents with "deleteMany" method', async () => {
      await Testimonial.deleteMany();
      const testimonials = await Testimonial.find();
      expect(testimonials).to.be.an('array');
      expect(testimonials).to.have.lengthOf(0);
    });
  });
});
