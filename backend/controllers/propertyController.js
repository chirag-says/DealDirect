import Property from "../models/Property.js";
import fs from "fs";
import path from "path";

// Add Property
export const addProperty = async (req, res) => {
  try {
    const data = req.body;

    ["area", "parking", "address", "flooring"].forEach((key) => {
      if (data[key]) data[key] = JSON.parse(data[key]);
    });

    data.images = req.files?.map((file) => file.filename) || [];

    const prop = await Property.create(data);
    res.status(201).json(prop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All
export const getProperties = async (req, res) => {
  try {
    const list = await Property.find()
      .populate("category")
      .populate("subcategory")
      .populate("propertyType")
      .sort({ createdAt: -1 });

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
export const getPropertyById = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id)
      .populate("category")
      .populate("subcategory")
      .populate("propertyType");

    if (!prop) return res.status(404).json({ message: "Not found" });

    res.json(prop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const data = req.body;

    ["area", "parking", "address", "flooring"].forEach((key) => {
      if (data[key]) data[key] = JSON.parse(data[key]);
    });

    if (req.files?.length > 0) {
      data.images = req.files.map(file => file.filename);
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, data, { new: true });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete
export const deleteProperty = async (req, res) => {
  try {
    const p = await Property.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Not found" });

    p.images.forEach((img) => {
      const imgPath = path.join("uploads", img);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });

    await p.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve
export const approveProperty = async (req, res) => {
  const updated = await Property.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    { new: true }
  );
  res.json(updated);
};

// Disapprove
export const disapproveProperty = async (req, res) => {
  const updated = await Property.findByIdAndUpdate(
    req.params.id,
    { isApproved: false },
    { new: true }
  );
  res.json(updated);
};
// 🌐 Public: Get All Approved Properties (Home Page)
export const getAllPropertiesList = async (req, res) => {
  try {
    const properties = await Property.find({ isApproved: true })
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ createdAt: -1 });
      

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Public Search API
export const searchProperties = async (req, res) => {
  try {
    const {
      search,
      category,
      subcategory,
      propertyType,
      buildingType,
      size,
      city,
      priceFrom,
      priceTo,
      page = 1,
      limit = 12,
      sort = "newest",
    } = req.query;

    const filter = { isApproved: true };

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (propertyType) filter.propertyType = propertyType;
    if (buildingType) filter.buildingType = buildingType;
    if (size) filter.size = size;
    if (city && city !== "All") filter["address.city"] = city;

    if (priceFrom || priceTo) {
      filter.price = {};
      if (priceFrom) filter.price.$gte = +priceFrom;
      if (priceTo) filter.price.$lte = +priceTo;
    }

    // Search in multiple fields
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { title: regex },
        { description: regex },
        { "address.city": regex },
        { propertyType: regex },
      ];
    }

    // Build query
    let query = Property.find(filter)
      .populate("category", "name")
      .populate("subcategory", "name");

    // Sorting
    if (sort === "priceAsc") query = query.sort({ price: 1 });
    else if (sort === "priceDesc") query = query.sort({ price: -1 });
    else query = query.sort({ createdAt: -1 });

    // Pagination
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      Property.countDocuments(filter),
      query.skip(skip).limit(Number(limit)),
    ]);

    res.json({
      data,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const filterProperties = async (req, res) => {
  try {
    const { search = "", sort = "newest" } = req.query;

    // Base filter: only approved properties
    let filter = { isApproved: true };

    // Search in title or city
    if (search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [{ title: regex }, { "address.city": regex }];
    }

    // Fetch properties and populate references
    let properties = await Property.find(filter)
      .populate("propertyType", "name")
      .populate("category", "name")
      .populate("subcategory", "name");

    // Further filter by populated fields (category, subcategory, propertyType)
    if (search.trim()) {
      const lower = search.toLowerCase();
      properties = properties.filter(
        (p) =>
          p.title?.toLowerCase().includes(lower) ||
          p.address?.city?.toLowerCase().includes(lower) ||
          p.category?.name?.toLowerCase().includes(lower) ||
          p.subcategory?.name?.toLowerCase().includes(lower) ||
          p.propertyType?.name?.toLowerCase().includes(lower)
      );
    }

    // Sort
    if (sort === "priceAsc") properties.sort((a, b) => a.price - b.price);
    else if (sort === "priceDesc") properties.sort((a, b) => b.price - a.price);
    else properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ success: true, data: properties });
  } catch (err) {
    console.error("Error in filterProperties:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
