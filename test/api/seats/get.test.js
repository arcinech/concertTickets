const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Seat = require('../../../models/seat.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/seats', () => {
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

  it('/ should return all seats', async () => {
    const res = await request(server).get('/api/seats');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(2);
  });

  it('/:id should return a seat', async () => {
    const res = await request(server).get('/api/seats/62e260ecf22805eafedf72ba');
    expect(res.status).to.equal(200);
    expect(res.body).to.not.be.null;
  });
});
