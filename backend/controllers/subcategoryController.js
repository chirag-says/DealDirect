// controllers/subcategoryController.js
import SubCategory from "../models/SubCategory.js";

export const createSubCategory = async (req, res) => {
  try {
    const exists = await SubCategory.findOne({
      name: req.body.name,
      category: req.body.category,
    });

    if (exists)
      return res.status(400).json({ message: "Subcategory exists" });

    const sub = await SubCategory.create(req.body);
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubCategories = async (req, res) => {
  try {
    const list = await SubCategory.find()
      .populate("category")
      .populate("propertyType");

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubCategoriesByCategory = async (req, res) => {
  try {
    const subs = await SubCategory.find({
      category: req.params.categoryId,
    });

    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Subcategory deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const updated = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
