import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, PlusCircle, X } from "lucide-react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const AllCategory = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("adminToken");

  /* ===========================================================
     🔹 FETCH EVERYTHING (PROPERTY TYPES → CATEGORIES → SUBCATS)
     =========================================================== */
  const fetchAll = async () => {
    try {
      setLoading(true);

      const [ptRes, catRes, subRes] = await Promise.all([
        axios.get(`${API_URL}/api/propertyTypes/list-propertytype`),
        axios.get(`${API_URL}/api/categories/list-category`),
        axios.get(`${API_URL}/api/subcategories/list`)
      ]);

      setPropertyTypes(ptRes.data);
      setCategories(catRes.data);
      setSubcategories(subRes.data);

    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* ===========================================================
     🔥 DELETE (Universal for all 3 types)
     =========================================================== */
  const handleDelete = async (id, type) => {
    if (!window.confirm(`Delete this ${type}?`)) return;

    try {
      await axios.delete(
        `${API_URL}/api/${type}/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`${type} deleted successfully`);
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  /* ===========================================================
     ✏️ OPEN EDIT MODAL
     =========================================================== */
  const handleEdit = (item, type) => {
    setEditData({ ...item, type });
    setIsEditing(true);
  };

  /* ===========================================================
     💾 SAVE EDIT (works for all 3)
     =========================================================== */
  const handleSaveEdit = async () => {
    try {
      let endpoint = "";
      let payload = {};

      if (editData.type === "propertyTypes") {
        endpoint = `${API_URL}/api/propertyTypes/edit/${editData._id}`;
        payload = { name: editData.name };
      }

      if (editData.type === "categories") {
        endpoint = `${API_URL}/api/categories/edit/${editData._id}`;
        payload = { name: editData.name };
      }

      if (editData.type === "subcategories") {
        endpoint = `${API_URL}/api/subcategories/edit/${editData._id}`;
        payload = {
          name: editData.name,
          category: editData.category?._id || editData.category
        };
      }

      await axios.put(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Updated successfully");

      setIsEditing(false);
      fetchAll();

    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  /* ===========================================================
     UI RENDER STARTS HERE
     =========================================================== */
  return (
    <div className="bg-gray-50 min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-6">
        📂 All Property Types, Categories & Subcategories
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-6">

          {/* 🔹 PROPERTY TYPES LIST */}
          {propertyTypes.map((pt) => (
            <div
              key={pt._id}
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">{pt.name}</h3>

                <div className="flex gap-3">
                  <Edit
                    className="text-blue-600 cursor-pointer"
                    onClick={() => handleEdit(pt, "propertyTypes")}
                  />
                  <Trash2
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDelete(pt._id, "propertyTypes")}
                  />
                </div>
              </div>

              {/* 🔹 CATEGORIES UNDER EACH PROPERTY TYPE */}
              <div className="mt-3 ml-4 space-y-3">
                {categories
                  .filter(c => c.propertyType?._id === pt._id)
                  .map(cat => (
                    <div key={cat._id} className="p-3 border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{cat.name}</p>

                        <div className="flex gap-2">
                          <Edit
                            className="text-blue-600 cursor-pointer"
                            onClick={() => handleEdit(cat, "categories")}
                          />
                          <Trash2
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleDelete(cat._id, "categories")}
                          />
                        </div>
                      </div>

                      {/* 🔹 SUBCATEGORIES */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {subcategories
                          .filter(s => s.category?._id === cat._id)
                          .map(sub => (
                            <span
                              key={sub._id}
                              className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                            >
                              {sub.name}

                              <Edit
                                className="text-blue-500 cursor-pointer w-4 h-4"
                                onClick={() => handleEdit(sub, "subcategories")}
                              />

                              <Trash2
                                className="text-red-500 cursor-pointer w-4 h-4"
                                onClick={() => handleDelete(sub._id, "subcategories")}
                              />
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

        </div>
      )}

      {/* ✏️ EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-lg relative">

            <button className="absolute top-3 right-3" onClick={() => setIsEditing(false)}>
              <X />
            </button>

            <h2 className="text-xl font-semibold text-center mb-4">
              Edit {editData.type.slice(0, -1)}
            </h2>

            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full border rounded-lg p-2"
            />

            <button
              onClick={handleSaveEdit}
              className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
            >
              Save Changes
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default AllCategory;
