const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Seat = require('../../../models/seat.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/seats', () => {
  afterEach(async () => {
    await Seat.deleteMany();
  });

  it('/should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/seats').send({
      day: 3,
      seat: 3,
      client: 'Client #3',
      email: 'client3@example.com',
    });
    const newSeat = await Seat.findOne({
      day: 3,
      seat: 3,
      client: 'Client #3',
      email: 'client3@example.com',
    });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.be.equal('Ok');
    expect(newSeat).to.be.not.null;
  });
});
