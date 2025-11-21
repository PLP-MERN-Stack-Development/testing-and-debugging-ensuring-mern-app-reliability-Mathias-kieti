
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-testing';

mongoose.connect(MONGO).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log('Server listening on', PORT));
}).catch(err => {
  console.error('Mongo connection error', err);
  process.exit(1);
});
