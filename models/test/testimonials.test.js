const expect = require('chai').expect;
const mongoose = require('mongoose');
const Testimonial = require('../testimonial.model');

describe('Testimonial model', () => {
  it('should throw an error if no valid arg', () => {
    const cases = ['text', 'author'];

    for (let key of cases) {
      const tes = new Testimonial({});

      tes.validate(err => {
        expect(err.errors[key]).to.exist;
      });
    }
  });

  it('should throw an error if arg is not a string', () => {
    const cases = [{}, []];
    const args = ['text', 'author'];

    for (let arg of args) {
      for (let value of cases) {
        const tes = new Testimonial({ [arg]: value });
        tes.validate(err => {
          expect(err.errors[arg]).to.exist;
        });
      }
    }
  });

  it('should not throw an error if arg is ok', () => {
    const cases = ['Lorem ipsum', 'Lorem ipsum dolem ipsum'];
    const args = ['text', 'author'];
    for (let arg of args) {
      for (let value of cases) {
        const tes = new Testimonial({ [arg]: value });

        tes.validate(err => {
          expect(err.errors[arg]).to.not.exist;
        });
      }
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
