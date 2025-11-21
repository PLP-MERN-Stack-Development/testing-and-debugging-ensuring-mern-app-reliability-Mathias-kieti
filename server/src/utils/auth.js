
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev-secret';
function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '7d' });
}
module.exports = { generateToken, SECRET };
