const expect = require('chai').expect;
const mongoose = require('mongoose');
const Concert = require('../concert.model');

describe('Concert model', () => {
  it('should throw an error if no valid arg', () => {
    const cases = ['performer', 'genre', 'price', 'day', 'image'];

    for (let key of cases) {
      const con = new Concert({});

      con.validate(err => {
        expect(err.errors[key]).to.exist;
      });
    }
  });

  it('should throw an error if arg is not a string or number', () => {
    const cases = [{}, []];
    const args = ['performer', 'genre', 'price', 'day', 'image'];

    for (let arg of args) {
      for (let value of cases) {
        const con = new Concert({ [arg]: value });
        con.validate(err => {
          expect(err.errors[arg]).to.exist;
        });
      }
    }
  });
  it('should not throw an error if arg is ok', () => {
    const args = ['performer', 'genre', 'image'];

    for (let arg of args) {
      const con = new Concert({ [arg]: 'Lorem ipsum' });

      con.validate(err => {
        expect(err.errors[arg]).to.not.exist;
      });
    }

    const numArgs = ['price', 'day'];
    for (let arg of numArgs) {
      const con = new Concert({ [arg]: '2' });

      con.validate(err => {
        expect(err.errors[arg]).to.not.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
