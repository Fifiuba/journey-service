const {InvalidTokenError} = require('../errors/invalid_parameters');
const {Auth} = require('../model/auth');
const jwt = require('jsonwebtoken')
require('dotenv').config();

describe('Auth', () => {
  test('01 valid token in header should be valid', () => {
    token = jwt.sign({data: 'foobar' }, process.env.SECRET_ACCESS_TOKEN);
    header = { 
      authorization: `bearer ${token}`
    }

    const auth = new Auth();
    expect(auth.validate(header)).toBe(true);
  } );

  test('02 no authorization header specified should throw error', () => {
    header = {};

    const auth = new Auth();
    const error = () => {
      auth.validate(header);
    };

    expect(error).toThrow(InvalidTokenError);
  } );

  test('03 invalid token should throw error', () => {
    header = {
      'Authorization': 'NotBearer token',
    };

    const auth = new Auth();
    const error = () => {
      auth.validate(header);
    };

    expect(error).toThrow(InvalidTokenError);
  } );

  test('04 validation of a token signed with another key should throw error', () => {
    token = jwt.sign({data: 'foobar' }, process.env.SECRET_ACCESS_TOKEN+'h');
    header = { 
      authorization: `bearer ${token}`
    }

    const auth = new Auth();
    const error = () => {
      auth.validate(header);
    };

    expect(error).toThrow(InvalidTokenError);
  } );
});

