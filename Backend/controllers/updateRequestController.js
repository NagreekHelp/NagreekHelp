import Request from "../models/Request.js";

export const updateUserRequest = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Request ID is required in body." });
    }

    const updated = await Request.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Request not found." });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const updateAdminRequest = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Request ID is required in body." });
    }

    const updated = await Request.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Request not found." });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};