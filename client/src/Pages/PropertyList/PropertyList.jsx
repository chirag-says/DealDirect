// src/pages/PropertyPage2.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE;

const initialFilters = {
  search: "",
  category: "",
  subcategory: "",
  propertyType: "",
  city: "",
};

const POPULAR_CATEGORIES = [
  { name: "Residential", subcategories: ["Apartments", "Independent House", "Villa", "Plot", "Builder Floor"] },
  { name: "Commercial", subcategories: ["Office Space", "Retail Shop", "Showroom", "Warehouse"] },
  { name: "Luxury", subcategories: ["Penthouse", "Duplex", "Farm House"] },
];

const POPULAR_PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Independent House",
  "Plot",
  "Penthouse",
  "Office Space",
];

const toFilterValue = (label) => `name:${label}`;

const parseFilterValue = (value) => {
  if (!value) return { type: null, value: "" };
  if (value.startsWith("name:")) {
    return { type: "name", value: value.slice(5).toLowerCase() };
  }
  return { type: "id", value };
};

const PropertyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🌟 States
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  const resolveImageSrc = (img) => {
    if (!img) return "";
    const lower = img.toLowerCase();
    if (lower.startsWith("data:")) return img;
    if (lower.startsWith("http://") || lower.startsWith("https://")) return img;
    if (img.startsWith("/uploads")) return `${API_BASE}${img}`;
    return `${API_BASE}/uploads/${img}`;
  };

  // 🏠 Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/properties/list`);

      if (Array.isArray(res.data)) {
        setProperties(res.data);
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching properties");
    } finally {
      setLoading(false);
    }
  };
    fetchProperties();
  }, []);

  useEffect(() => {
    if (!location.search) return;
    const params = new URLSearchParams(location.search);
    const updates = {};

    ["category", "subcategory", "propertyType", "city", "search"].forEach((key) => {
      const value = params.get(key);
      if (value) updates[key] = value;
    });

    const intent = params.get("intent");
    if (intent && !updates.search) {
      updates.search = intent;
    }

    if (Object.keys(updates).length) {
      setFilters((prev) => ({ ...prev, ...updates }));
    }
  }, [location.search]);

  // Fetch categories and property types for dropdowns
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [catRes, propTypeRes] = await Promise.all([
          axios.get(`${API_BASE}/api/categories/list-category`),
          axios.get(`${API_BASE}/api/propertyTypes/list-propertytype`),
        ]);

        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setPropertyTypes(Array.isArray(propTypeRes.data) ? propTypeRes.data : []);
      } catch (error) {
        console.error("Error loading filter data:", error);
      }
    };

    fetchFilterData();
  }, []);

  // Fetch subcategories when a marketplace category (ID) is chosen
  useEffect(() => {
    const { type, value } = parseFilterValue(filters.category);
    if (type !== "id" || !value) {
      setSubcategories([]);
      return;
    }

    const fetchSubcategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/subcategories/byCategory/${value}`);
        setSubcategories(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [filters.category]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "category" ? { subcategory: "" } : null),
    }));
  };

  const curatedSubcategories = () => {
    const parsed = parseFilterValue(filters.category);
    if (parsed.type !== "name") return [];
    const match = POPULAR_CATEGORIES.find(
      (category) => category.name.toLowerCase() === parsed.value
    );
    return match?.subcategories || [];
  };

  // 🔹 Filter + Search Logic
  const filteredProperties = properties.filter((p) => {
    const query = filters.search.toLowerCase();
    const categoryFilter = parseFilterValue(filters.category);
    const subcategoryFilter = parseFilterValue(filters.subcategory);
    const propertyTypeFilter = parseFilterValue(filters.propertyType);

    // Check all fields for match
    const matchesSearch = query
      ? [
          p.title,
          p.address?.city,
          p.address?.state,
          p.category?.name,
          p.subcategory?.name,
          p.propertyType?.name,
        ]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(query))
      : true;

    const matchCategory = (() => {
      if (!categoryFilter.value) return true;
      const categoryId = p.category?._id || p.category;
      const categoryName = (p.category?.name || "").toLowerCase();
      if (categoryFilter.type === "id") {
        return String(categoryId) === String(categoryFilter.value);
      }
      return categoryName === categoryFilter.value;
    })();

    const matchSubcategory = (() => {
      if (!subcategoryFilter.value) return true;
      const subcategoryId = p.subcategory?._id || p.subcategory;
      const subcategoryName = (p.subcategory?.name || "").toLowerCase();
      if (subcategoryFilter.type === "id") {
        return String(subcategoryId) === String(subcategoryFilter.value);
      }
      return subcategoryName === subcategoryFilter.value;
    })();

    const matchPropertyType = (() => {
      if (!propertyTypeFilter.value) return true;
      const propertyTypeId = p.propertyType?._id || p.propertyType;
      const propertyTypeName = (p.propertyType?.name || "").toLowerCase();
      if (propertyTypeFilter.type === "id") {
        return String(propertyTypeId) === String(propertyTypeFilter.value);
      }
      return propertyTypeName === propertyTypeFilter.value;
    })();

    const matchCity = filters.city
      ? (p.address?.city || "").toLowerCase().includes(filters.city.toLowerCase())
      : true;

    return (
      matchesSearch &&
      matchCategory &&
      matchSubcategory &&
      matchPropertyType &&
      matchCity
    );
  });

  const viewDetails = (property) =>
    navigate(`/properties/${property._id}`, { state: { property } });

  return (
    <div className="min-h-screen mt-5 bg-gray-50 flex flex-col">
      {/* 🔍 Search & Filters */}
      <section className="py-6 px-4 sm:px-6 mt-20">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-3 bg-white rounded-4xl md:rounded-full shadow-xl px-4 py-4 border border-gray-100">
            <div className="flex items-center border border-gray-300 rounded-full w-full px-3">
              <input
                type="text"
                placeholder="Search by title, location, category, subcategory or property type..."
                className="flex-1 text-gray-700 outline-none px-3 py-2 text-sm sm:text-base bg-transparent"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">All Categories</option>
                  <optgroup label="Popular Categories">
                    {POPULAR_CATEGORIES.map((category) => (
                      <option key={`popular-${category.name}`} value={toFilterValue(category.name)}>
                        {category.name}
                      </option>
                    ))}
                  </optgroup>
                  {categories.length > 0 && (
                    <optgroup label="Marketplace Categories">
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Subcategory</label>
                <select
                  value={filters.subcategory}
                  onChange={(e) => handleFilterChange("subcategory", e.target.value)}
                  className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  disabled={!filters.category}
                >
                  <option value="">All Subcategories</option>
                  {parseFilterValue(filters.category).type === "name"
                    ? curatedSubcategories().map((sub) => (
                        <option key={`popular-sub-${sub}`} value={toFilterValue(sub)}>
                          {sub}
                        </option>
                      ))
                    : subcategories.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.name}
                        </option>
                      ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Property Type</label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                  className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">All Property Types</option>
                  <optgroup label="Popular Types">
                    {POPULAR_PROPERTY_TYPES.map((type) => (
                      <option key={`popular-type-${type}`} value={toFilterValue(type)}>
                        {type}
                      </option>
                    ))}
                  </optgroup>
                  {propertyTypes.length > 0 && (
                    <optgroup label="Marketplace Types">
                      {propertyTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">City</label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

            {(filters.category || filters.subcategory || filters.propertyType || filters.city || filters.search) && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setFilters(initialFilters)}
                  className="text-sm text-red-600 font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Property Cards */}
      <main className="flex-1 p-4 sm:p-6 bg-white rounded-xl shadow-sm max-w-6xl mx-auto w-full">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
          🏠 Available Properties
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 py-20">Loading properties...</p>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-10">
              <p className="text-gray-500 mb-4 text-base sm:text-lg">
                No properties match your search 😔
              </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 overflow-hidden cursor-pointer"
                onClick={() => viewDetails(p)}
              >
                <div className="relative h-60 sm:h-64 overflow-hidden">
                  <img
                    src={resolveImageSrc(p.images?.[0])}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.target.src =
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800")
                    }
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 truncate mb-1">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-red-500" />
                    {p.address?.city}, {p.address?.state}
                  </p>
                  <p className="text-lg font-semibold text-red-600">
                    ₹{p.price?.toLocaleString() || "N/A"}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      viewDetails(p);
                    }}
                    className="w-full mt-4 py-2 rounded-xl border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PropertyPage;
