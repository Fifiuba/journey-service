const {InvalidTokenError} = require('../errors/invalid_parameters');
const {Auth} = require('../model/auth');

describe('Auth', () => {
  test('01_should_have_token_as_token', () => {
    header = {
      'Authorization': 'Bearer token',
    };

    const auth = new Auth();
    expect(auth.validate(header)).toBe('token');
  } );

  test('02_should_throw_error_token_invalid_header', () => {
    header = {
      'Bla bla': 'Bearer token',
    };

    const auth = new Auth();
    const error = () => {
      auth.validate(header);
    };

    expect(error).toThrow(InvalidTokenError);
  } );

  test('03_should_throw_error_token_not_bearer', () => {
    header = {
      'Authorization': 'NotBearer token',
    };

    const auth = new Auth();
    const error = () => {
      auth.validate(header);
    };

    expect(error).toThrow(InvalidTokenError);
  } );
});

