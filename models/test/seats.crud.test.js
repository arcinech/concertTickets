const expect = require('chai').expect;
const mongoose = require('mongoose');
const Seat = require('../seat.model');

describe('Seat CRUD', () => {
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
      const testSeatOne = new Seat({
        _id: '62e260ecf22805eafedf72ba',
        day: 1,
        seat: 1,
        client: 'Client #1',
        email: 'client1@example.com',
      });
      await testSeatOne.save();

      const testSeatTwo = new Seat({
        _id: '62e267f87e2b0bc1072ee9ba',
        day: 2,
        seat: 2,
        client: 'Client #2',
        email: 'client2@example.com',
      });
      await testSeatTwo.save();
    });

    afterEach(async () => {
      await Seat.deleteMany();
    });

    it('should return all seats', async () => {
      const seats = await Seat.find();
      expect(seats).to.be.an('array');
      expect(seats).to.have.lengthOf(2);
    });

    it('should return a seat by id', async () => {
      const seat = await Seat.findById('62e260ecf22805eafedf72ba');
      expect(seat).to.be.an('object');
      expect(seat.client).to.be.equal('Client #1');
    });
  });

  describe('Creating data', () => {
    after(async () => {
      await Seat.deleteMany();
    });

    it('should create a new seat', async () => {
      const seat = new Seat({
        day: 1,
        seat: 1,
        client: 'Client #1',
        email: 'clien1@example.com',
      });

      await seat.save();
      expect(seat).to.be.an('object');
      expect(seat.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testSeatOne = new Seat({
        _id: '62e260ecf22805eafedf72ba',
        day: 1,
        seat: 1,
        client: 'Client #1',
        email: 'client1@example.com',
      });
      await testSeatOne.save();

      const testSeatTwo = new Seat({
        _id: '62e267f87e2b0bc1072ee9ba',
        day: 2,
        seat: 2,
        client: 'Client #2',
        email: 'client2@example.com',
      });
      await testSeatTwo.save();
    });

    afterEach(async () => {
      await Seat.deleteMany();
    });

    it('should update a document by "day" with "updateOne" method', async () => {
      await Seat.updateOne({ day: 1, seat: 1 }, { $set: { day: 1, seat: 2 } });
      const updatedSeat = await Seat.findOne({ day: 1, seat: 2 });
      expect(updatedSeat).to.not.be.null;
    });

    it('should update a document with "save" method', async () => {
      const seat = await Seat.findOne({ day: 1, seat: 1 });
      seat.client = 'Client #1 Updated';
      await seat.save();
      const updatedSeat = await Seat.findOne({
        client: 'Client #1 Updated',
      });
      expect(updatedSeat).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany"', async () => {
      await Seat.updateMany({}, { $set: { client: 'Client #3' } });
      const updatedSeat = await Seat.find({ client: 'Client #3' });
      expect(updatedSeat).to.be.an('array');
      expect(updatedSeat.length).to.be.equal(2);
    });
  });
});
