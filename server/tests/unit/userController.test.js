
const User = require('../../src/models/User');
describe('User model basics', () => {
  it('hashes password on save', async () => {
    const u = new User({ username: 'u1', email: 'u1@example.com', password: 'secret' });
    await u.save();
    expect(u.password).not.toBe('secret');
    await User.deleteMany({});
  });
});
