const expect = require('chai').expect;
const mongoose = require('mongoose');
const Concert = require('../concert.model');
const Workshop = require('../workshop.model');

describe('Concert CRUD', () => {
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
      const testConcertOne = new Concert({
        _id: '62e260ecf22805eafedf72ba',
        performer: 'Performer #1',
        genre: 'Genre #1',
        price: 1,
        day: 1,
        image: 'Image #1',
        workshops: ['62e80c891a8917f81518964a', '62e80cb29bae60568c2994a4'],
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        id: '62e267f87e2b0bc1072ee9ba',
        performer: 'Performer #2',
        genre: 'Genre #2',
        price: 2,
        day: 2,
        image: 'Image #2',
        workshops: [],
      });
      await testConcertTwo.save();

      const testWorkshopOne = new Workshop({
        _id: '62e80c891a8917f81518964a',
        name: 'Workshop #1',
        concertId: '62e260ecf22805eafedf72ba',
      });
      await testWorkshopOne.save();

      const testWorkshopTwo = new Workshop({
        _id: '62e80cb29bae60568c2994a4',
        name: 'Workshop #2',
        concertId: '62e260ecf22805eafedf72ba',
      });
      await testWorkshopTwo.save();
    });

    afterEach(async () => {
      await Concert.deleteMany();
      await Workshop.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const concerts = await Concert.find();
      expect(concerts).to.be.an('array');
      expect(concerts).to.have.lengthOf(2);
    });

    it('should return a proper document by "performer" with "findOne" method', async () => {
      const concert = await Concert.findOne({ performer: 'Performer #1' });
      expect(concert).to.be.an('object');
      expect(concert.performer).to.equal('Performer #1');
    });

    it('should return a proper document with populated workshop', async () => {
      const concerts = await Concert.find().populate('workshops', 'name -_id');
      expect(concerts[0].workshops).to.be.an('array');
      expect(concerts[0].workshops).to.have.lengthOf(2);
    });
  });

  describe('Creating data', () => {
    after(async () => {
      await Concert.deleteMany();
    });

    it('should create a new document with "save" method', async () => {
      const concert = new Concert({
        performer: 'Performer #3',
        genre: 'Genre #3',
        price: 1,
        day: 2,
        image: 'Image #3',
      });
      await concert.save();
      expect(concert).to.be.an('object');
      expect(concert.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testConcertOne = new Concert({
        performer: 'Performer #1',
        genre: 'Genre #1',
        price: 1,
        day: 2,
        image: 'Image #1',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        performer: 'Performer #2',
        genre: 'Genre #2',
        price: 1,
        day: 2,
        image: 'Image #2',
      });
      await testConcertTwo.save();
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });

    it('should update a document by "performer" with "updateIbe" method', async () => {
      await Concert.updateOne(
        { performer: 'Performer #1' },
        { $set: { performer: 'Performer #1 Updated' } }
      );
      const updatedConcert = await Concert.findOne({
        performer: 'Performer #1 Updated',
      });
      expect(updatedConcert).to.not.be.null;
    });

    it('should update a document with "save" method', async () => {
      const concert = await Concert.findOne({ performer: 'Performer #2' });
      concert.performer = 'Performer #2 Updated';
      await concert.save();
      const updatedConcert = await Concert.findOne({
        performer: 'Performer #2 Updated',
      });
      expect(updatedConcert).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany"', async () => {
      await Concert.updateMany({}, { $set: { performer: 'Performer #3' } });
      const updatedConcerts = await Concert.find({ performer: 'Performer #3' });
      expect(updatedConcerts).to.be.an('array');
      expect(updatedConcerts.length).to.be.equal(2);
    });
  });

  describe('Deleting data', () => {
    beforeEach(async () => {
      const testConcertOne = new Concert({
        performer: 'Performer #1',
        genre: 'Genre #1',
        price: 1,
        day: 2,
        image: 'Image #1',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        performer: 'Performer #2',
        genre: 'Genre #2',
        price: 1,
        day: 2,
        image: 'Image #2',
      });
      await testConcertTwo.save();
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });

    it('should delete a document by "performer" with "deleteOne" method', async () => {
      await Concert.deleteOne({ performer: 'Performer #1' });
      const deletedConcert = await Concert.findOne({ performer: 'Performer #1' });
      expect(deletedConcert).to.be.null;
    });

    it('should delete a document with "deleteMany" method', async () => {
      await Concert.deleteMany({});
      const deletedConcerts = await Concert.find();
      expect(deletedConcerts).to.be.an('array');
      expect(deletedConcerts).to.have.lengthOf(0);
    });
  });
});
