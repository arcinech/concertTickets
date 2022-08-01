const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Seat = require('../../../models/seat.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/seats', () => {
  before(async () => {
    const testSeatOne = new Seat({
      _id: '62e260ecf22805eafedf72ba',
      day: 1,
      seat: 1,
      client: 'Client #1',
      email: 'client1@example.com',
    });
    await testSeatOne.save();
  });

  after(async () => {
    await Seat.deleteMany();
  });

  it('/:id should delete a seat and return success', async () => {
    const res = await request(server).delete('/api/seats/62e260ecf22805eafedf72ba');
    const seat = await Seat.findOne({ _id: '62e260ecf22805eafedf72ba' });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(seat).to.be.null;
  });
});
