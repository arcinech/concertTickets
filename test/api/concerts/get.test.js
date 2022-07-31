const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');
const Seat = require('../../../models/seat.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  beforeEach(async () => {
    const testSeatsOne = new Seat({
      _id: '62e260ecf22805eafedf72ba',
      day: 1,
      seat: 1,
      client: 'test',
      email: 'test@test.test',
      concertId: '5d9f1140f10a81216cfd4408',
    });
    await testSeatsOne.save();

    const testSeatTwo = new Seat({
      _id: '62e267f87e2b0bc1072ee9ba',
      day: 1,
      seat: 3,
      client: 'test',
      email: 'test@test.test',
      concertId: '5d9f1140f10a81216cfd4408',
    });
    await testSeatTwo.save();

    const testConOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: 'John Doe',
      genre: 'Rock',
      price: '50',
      day: '1',
      image: 'img/uploads/1fsd324fsdg.jpg',
    });
    await testConOne.save();

    const testConTwo = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee48',
      performer: 'Johny Doe',
      genre: 'Jazz',
      price: '25',
      day: '3',
      image: 'img/uploads/1fsd324fsdg.jpg',
    });
    await testConTwo.save();
  });

  afterEach(async () => {
    await Concert.deleteMany();
    await Seat.deleteMany();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(2);
  });

  it('/performer/performer:id should return concerts by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/John Doe');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
  });

  it('/genre/genre:id should return concerts by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
  });

  it('/price/:price_min/:price_max should return concerts by price', async () => {
    const res = await request(server).get('/api/concerts/price/40/50');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
  });

  it('/day/day:id should return concerts by day', async () => {
    const res = await request(server).get('/api/concerts/day/3');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
  });

  it('/:id should return concert by id', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/:id should return concert with number of freeSeats', async () => {
    cases = [
      { id: '5d9f1140f10a81216cfd4408', freeSeats: 48 },
      { id: '5d9f1159f81ce8d1ef2bee48', freeSeats: 50 },
    ];

    for (let { id, freeSeats } of cases) {
      const res = await request(server).get('/api/concerts/' + id);
      expect(res.status).to.equal(200);
      expect(res.body.freeSeats).to.be.equal(freeSeats);
      expect(res.body).to.not.be.null;
    }
  });
});
