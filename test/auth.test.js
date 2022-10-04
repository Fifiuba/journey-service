const {Auth} = require('../model/auth');

describe('Auth', () => {
  test('01_should_have_token_as_token', () => {
    header = {
      'Authorization': 'Bearer token',
    };

    const auth = new Auth();
    expect(auth.validate(header)).toBe('token');
  } );
});
