const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require ('../../../server');
const Concerts = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;


describe('GET /concerts', () => {

  beforeEach(async () => {
    const testConOne = new Concerts({performer: 'John Doe', genre: 'Rock', price: '100', day: '1', image: 'img/uploads/1fsd324fsdg.jpg'});
    await testConOne.save();

    const testConTwo = new Concerts({performer: 'Johny Doe', genre: 'Jazz', price: '50', day: '3', image: 'img/uploads/1fsd324fsdg.jpg'});
    await testConTwo.save();
  });

  afterEach(async () => {
    await Concerts.deleteMany();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(2);
  });

  it('/perforemer/perforemr:id should return concerts by performer', async () => {
    const res = await request(server).get('/api/concerts/perfomer/John Doe');
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

  it('/price/price_min/price_max should return concerts by price', async () => {
    const res = await request(server).get('/api/concerts/price/50/100');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
  });

  it('/day/day:id should return concerts by day', async () => {
    const res = await request(server).get('/api/concerts/day/3');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
  };

});