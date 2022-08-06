const expect = require('chai').expect;
const mongoose = require('mongoose');
const Workshop = require('../workshop.model');

describe('Workshop CRUD', () => {
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
      const testWsOne = new Workshop({
        name: 'Workshop #1',
        concertId: '62e260ecf22805eafedf72ba',
      });
      await testWsOne.save();

      const testWsTwo = new Workshop({
        name: 'Workshop #2',
        concertId: '62e267f87e2b0bc1072ee9ba',
      });
      await testWsTwo.save();
    });

    afterEach(async () => {
      await Workshop.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const workshops = await Workshop.find();
      expect(workshops).to.be.an('array');
      expect(workshops).to.have.lengthOf(2);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const workshop = await Workshop.findOne({ name: 'Workshop #1' });
      expect(workshop).to.be.an('object');
      expect(workshop.name).to.equal('Workshop #1');
    });

    it('should return a proper document by "concertId" with "findOne" method', async () => {
      const workshop = await Workshop.findOne({
        concertId: '62e260ecf22805eafedf72ba',
      });
      //change concertId to string from ObjectId
      expect(workshop.concertId.toString()).to.equal('62e260ecf22805eafedf72ba');
    });
  });

  describe('Creating data', () => {
    after(async () => {
      await Workshop.deleteMany();
    });

    it('should create a new document with "save" method', async () => {
      const workshop = new Workshop({
        name: 'Workshop #3',
        concertId: '62e260ecf22805eafedf72ba',
      });
      await workshop.save();
      expect(workshop).to.be.an('object');
      expect(workshop.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testWsOne = new Workshop({
        name: 'Workshop #1',
        concertId: '62e260ecf22805eafedf72ba',
      });
      await testWsOne.save();

      const testWsTwo = new Workshop({
        name: 'Workshop #2',
        concertId: '62e267f87e2b0bc1072ee9ba',
      });
      await testWsTwo.save();
    });

    afterEach(async () => {
      await Workshop.deleteMany();
    });

    it('should update a document with "updateOne" method', async () => {
      await Workshop.updateOne(
        { name: 'Workshop #1' },
        { $set: { name: 'Updated Workshop #1' } }
      );
      const updatedWorkshop = await Workshop.findOne({ name: 'Updated Workshop #1' });
      expect(updatedWorkshop).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const workshop = await Workshop.findOne({ name: 'Workshop #1' });
      workshop.name = 'Updated Workshop #1';
      await workshop.save();
      const updatedWorkshop = await Workshop.findOne({ name: 'Updated Workshop #1' });
      expect(updatedWorkshop).to.not.be.null;
    });

    it('should properly update many documents with "updateMany" method', async () => {
      await Workshop.updateMany({}, { $set: { name: 'Updated Workshop #1' } });
      const updatedWorkshops = await Workshop.find({ name: 'Updated Workshop #1' });
      expect(updatedWorkshops.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testWsOne = new Workshop({
        name: 'Workshop #1',
        concertId: '62e260ecf22805eafedf72ba',
      });
      await testWsOne.save();

      const testWsTwo = new Workshop({
        name: 'Workshop #2',
        concertId: '62e267f87e2b0bc1072ee9ba',
      });
      await testWsTwo.save();
    });

    afterEach(async () => {
      await Workshop.deleteMany();
    });

    it('should remove a document with "deleteOne" method', async () => {
      await Workshop.deleteOne({ name: 'Workshop #1' });
      const workshop = await Workshop.findOne({ name: 'Workshop #1' });
      expect(workshop).to.be.null;
    });

    it('should remove one document with "remove" method', async () => {
      const workshop = await Workshop.findOne({ name: 'Workshop #1' });
      await workshop.remove();
      const removedWorkshop = await Workshop.findOne({ name: 'Workshop #1' });
      expect(removedWorkshop).to.be.null;
    });
  });
});
