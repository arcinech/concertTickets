const expect = require('chai').expect;
const mongoose = require('mongoose');
const Seat = require('../seat.model');

describe('Seat model', () => {
  it('should throw an error if no valid arg', () => {
    const cases = ['day', 'seat', 'client', 'email'];
    for (let key of cases) {
      const testSeat = new Seat({});
      testSeat.validate(err => {
        expect(err.errors[key]).to.exist;
      });
    }
  });

  it('should throw an error if arg is not a string', () => {
    const cases = [{}, []];
    const args = ['client', 'email'];
    for (let arg of args) {
      for (let value of cases) {
        const testSeat = new Seat({ [arg]: value });
        testSeat.validate(err => {
          expect(err.errors[arg]).to.exist;
        });
      }
    }
  });

  it('should throw an error if arg is not number', () => {
    const cases = [{}, [], 'string'];
    const args = ['day', 'seat'];
    for (let arg of args) {
      for (let value of cases) {
        const testSeat = new Seat({ [arg]: value });
        testSeat.validate(err => {
          expect(err.errors[arg]).to.exist;
        });
      }
    }
  });

  it('should not throw an error if "day" is ok', () => {
    const cases = [1, 2, 3];

    for (let day of cases) {
      const testSeat = new Seat({ day });
      testSeat.validate(err => {
        expect(err.errors.day).to.not.exist;
      });
    }
  });

  it('should not throw an error if "seat" is ok', () => {
    const cases = [1, 2, 3];

    for (let seat of cases) {
      const testSeat = new Seat({ seat });
      testSeat.validate(err => {
        expect(err.errors.seat).to.not.exist;
      });
    }
  });

  it('should not throw an error if "client" is ok', () => {
    const cases = ['Lorem ipsum', 'Lorem ipsum dolem ipsum'];

    for (let client of cases) {
      const testSeat = new Seat({ client });
      testSeat.validate(err => {
        expect(err.errors.client).to.not.exist;
      });
    }
  });

  it('should not throw an error if "email" is ok', () => {
    const cases = ['Loremipsum@example.com', 'Lorem@example.com'];

    for (let email of cases) {
      const testSeat = new Seat({ email });
      testSeat.validate(err => {
        expect(err.errors.email).to.not.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
