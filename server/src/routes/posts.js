
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const protect = require('../middleware/auth');

// create
router.post('/', protect, async (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const post = await Post.create({ title, content, author: req.user._id });
  res.status(201).json(post);
});

// list with optional pagination and category/filter (simple)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const docs = await Post.find().skip(skip).limit(limit).lean();
  res.json(docs);
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).lean();
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
});

router.put('/:id', protect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  await post.save();
  res.json(post);
});

router.delete('/:id', protect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
  await post.remove();
  res.json({ message: 'deleted' });
});

module.exports = router;
