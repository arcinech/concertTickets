const expect = require('chai').expect;
const mongoose = require('mongoose');
const Workshop = require('../workshop.model.js');

describe('Workshop model', () => {
  it('should throw an error if no valid arg', () => {
    const cases = ['name', 'concertId'];
    for (let key of cases) {
      const ws = new Workshop({});
      ws.validate(err => {
        expect(err.errors[key]).to.exist;
      });
    }
  });

  it('should throw an error if arg is not a string', () => {
    const cases = [{}, []];
    const args = ['name', 'concertId'];
    for (let arg of args) {
      for (let value of cases) {
        const ws = new Workshop({ [arg]: value });
        ws.validate(err => {
          expect(err.errors[arg]).to.exist;
        });
      }
    }
  });

  it('should not throw an error if "concertId" is ok', () => {
    const cases = ['Lorem ipsum', 'Lorem ipsum dolem ipsum'];

    for (let name of cases) {
      const ws = new Workshop({ name });
      ws.validate(err => {
        expect(err.errors.name).to.not.exist;
      });
    }
  });

  it('should not throw an error if "concertId" is ok', () => {
    const ws = new Workshop({ concertId: '62e437fe70310d20d7383a05' });
    ws.validate(err => {
      expect(err.errors.concertId).to.not.exist;
    });
  });

  after(() => {
    mongoose.models = {};
  });
});
