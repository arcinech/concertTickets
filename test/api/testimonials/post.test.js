const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Testimonial = require('../../../models/testimonial.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/testimonials', () => {
  after(async () => {
    await Testimonial.deleteMany();
  });

  it('/should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/testimonials').send({
      author: 'Author #1',
      text: 'Testimonial #1 text',
    });
    const newTestimonial = await Testimonial.findOne({
      author: 'Author #1',
      text: 'Testimonial #1 text',
    });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(newTestimonial).to.be.not.null;
  });
});
