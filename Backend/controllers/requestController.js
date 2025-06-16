import Request from '../models/Request.js';

// GET all requests for user
export const getRequestsByUser = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id }).populate('admin', 'name');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new request
export const createRequest = async (req, res) => {
  try {
    const newRequest = await Request.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH update request (status, chat, documents etc.)
export const updateRequest = async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
