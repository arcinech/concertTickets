const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Testimonial = require('../../../models/testimonial.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/testimonials', () => {
  before(async () => {
    const testTestiOne = new Testimonial({
      _id: '62e260ecf22805eafedf72ba',
      author: 'Testimonial #1',
      text: 'Testimonial #1 text',
    });
    await testTestiOne.save();

    const TestTestiTwo = new Testimonial({
      _id: '62e267f87e2b0bc1072ee9ba',
      author: 'Testimonial #2',
      text: 'Testimonial #2 text',
    });
    await TestTestiTwo.save();
  });

  after(async () => {
    await Testimonial.deleteMany();
  });

  it('/:id should update a testimonial and return success', async () => {
    const res = await request(server)
      .put('/api/testimonials/62e260ecf22805eafedf72ba')
      .send({ author: 'Testimonial#1 updated' });
    expect(res.status).to.equal(200);
    expect(res.body).to.not.be.null;
  });
});
