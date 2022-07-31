const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/concerts', () => {
  after(async () => {
    await Concert.deleteMany();
  });

  it('/should insert new document to db and return success', async () => {
    const postConcert = {
      performer: 'Performer',
      genre: 'Genre',
      price: 25,
      day: 1,
      image: 'Image',
    };
    const res = await request(server).post('/api/concerts').send(postConcert);
    const newConcert = await Concert.findOne(postConcert);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(newConcert).to.be.not.null;
  });
});
