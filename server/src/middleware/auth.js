
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/auth');
const User = require('../models/User');

async function protect(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Not authorized' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
}
module.exports = protect;
