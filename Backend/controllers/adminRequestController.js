import Request from '../models/Request.js';

export const getRequestedReq = async (req, res) => {
  try {
    console.log('Hit on this roiter')
    console.log(req.user.id)
    const requests = await Request.find({ admin: req.user.id, status: 'requested' }).populate('user', 'name');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMiddlereq = async (req, res) => {
  try {
    console.log('Hit on this roiter')
    console.log(req.user.id)
    const requests = await Request.find({ admin: req.user.id, status:{$nin: [ 'requested', 'finished']} }).populate('user', 'name');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getFinsihedreq = async (req, res) => {
  try {
    console.log('Hit on this roiter')
    console.log(req.user.id)
    const requests = await Request.find({ admin: req.user.id, status: 'finished' }).populate('user', 'name');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};