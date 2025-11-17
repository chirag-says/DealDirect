import PropertyType from "../models/PropertyType.js";

export const createPropertyType = async (req, res) => {
  try {
    const exists = await PropertyType.findOne({ name: req.body.name });
    if (exists) return res.status(400).json({ message: "Already exists" });

    const type = await PropertyType.create(req.body);
    res.status(201).json(type);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPropertyTypes = async (req, res) => {
  try {
    const list = await PropertyType.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
