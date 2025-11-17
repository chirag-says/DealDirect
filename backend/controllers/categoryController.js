// controllers/categoryController.js
import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const exists = await Category.findOne({
      name: req.body.name,
      propertyType: req.body.propertyType,
    });

    if (exists)
      return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const list = await Category.find().populate("propertyType");
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
