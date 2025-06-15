import express from 'express';
import ChecklistItem from '../models/ChecklistItem.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await ChecklistItem.find({ user: req.user.id });
  res.json(items);
});

router.post('/', async (req, res) => {
  const { text, category } = req.body;
  const item = await ChecklistItem.create({ text, category, user: req.user.id });
  res.status(201).json(item);
});

export default router;
