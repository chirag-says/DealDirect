import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AiOutlineStar,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import {  FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import HeroSection from "../../Components/HeroSection/HeroSection";
import DiscoverSection from "../../Components/DiscoverSection/DiscoverSection"; 
import TopDevelopers from "../../Components/TopDevelopers/TopDevelopers";
import TopLocalities from "../../Components/TopLocalities/TopLocalities";

const API_BASE = import.meta.env.VITE_API_BASE;

const parseBudgetValue = (label) => {
  if (!label) return null;
  const cleaned = label.replace(/₹|,/g, "").trim().toLowerCase();
  if (!cleaned) return null;

  if (cleaned.includes("crore")) {
    const amount = parseFloat(cleaned.replace("crore", "")) || 0;
    return amount * 10000000;
  }

  if (cleaned.includes("lakh")) {
    const amount = parseFloat(
      cleaned.replace("lakhs", "").replace("lakh", "")
    ) || 0;
    return amount * 100000;
  }

  const numeric = parseFloat(cleaned.replace(/[^0-9.]/g, ""));
  return Number.isNaN(numeric) ? null : Math.round(numeric);
};

const normalizePrice = (price, unit) => {
  const amount = Number(price) || 0;
  const normalizedUnit = (unit || "").toLowerCase();

  if (normalizedUnit.includes("crore")) {
    return amount * 10000000;
  }

  if (normalizedUnit.includes("lac") || normalizedUnit.includes("lakh")) {
    return amount * 100000;
  }

  return amount;
};

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    subcategory: "",
    city: "",
    state: "",
    minBudget: "",
    maxBudget: "",
    propertyTypes: [],
  });
  const navigate = useNavigate();

  const resolveImageSrc = (img) => {
    if (!img) return "";
    const lower = img.toLowerCase();
    if (lower.startsWith("data:")) return img;
    if (lower.startsWith("http://") || lower.startsWith("https://")) return img;
    if (img.startsWith("/uploads")) return `${API_BASE}${img}`;
    return `${API_BASE}/uploads/${img}`;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/properties/property-list`);
        setProperties(response.data.data || []);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/categories/list`);
        setCategories(res.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/propertyTypes/list-propertytype`);
        setPropertyTypeOptions(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching property types:", error);
      }
    };

    fetchPropertyTypes();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!filters.category) {
        setSubcategories([]);
        return;
      }
      try {
        const res = await axios.get(
          `${API_BASE}/api/subcategories/byCategory/${filters.category}`
        );
        setSubcategories(res.data || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubcategories();
  }, [filters.category]);

  const minBudgetValue = parseBudgetValue(filters.minBudget);
  const maxBudgetValue = parseBudgetValue(filters.maxBudget);
  const selectedPropertyTypes = filters.propertyTypes || [];

  const filteredProperties = properties.filter((p) => {
    const title = (p.title || "").toLowerCase();
    const city = (p.address?.city || "").toLowerCase();
    const state = (p.address?.state || "").toLowerCase();
    const propertyTypeName = (p.propertyType?.name || "").toLowerCase();
    const q = filters.search.toLowerCase();

    const matchSearch =
      !q || title.includes(q) || city.includes(q) || state.includes(q);
    const matchCategory =
      !filters.category || p.category?._id === filters.category;
    const matchSubcategory =
      !filters.subcategory || p.subcategory?._id === filters.subcategory;
    const matchCity =
      !filters.city || city.includes(filters.city.toLowerCase());
    const matchState =
      !filters.state || state.includes(filters.state.toLowerCase());
    const priceInRupees = normalizePrice(p.price, p.priceUnit);
    const matchBudget =
      (!minBudgetValue || priceInRupees >= minBudgetValue) &&
      (!maxBudgetValue || priceInRupees <= maxBudgetValue);
    const matchPropertyType =
      selectedPropertyTypes.length === 0 ||
      selectedPropertyTypes.some((type) =>
        propertyTypeName.includes(type.toLowerCase())
      );

    return (
      matchSearch &&
      matchCategory &&
      matchSubcategory &&
      matchCity &&
      matchState &&
      matchBudget &&
      matchPropertyType
    );
  });

  const handleViewDetails = (property) => {
    navigate(`/properties/${property._id}`, { state: { property } });
  };

  // Major Indian Cities Data
  const majorCities = [
    { name: "Mumbai", properties: "25K+", image: "https://images.unsplash.com/photo-1560215986-02b1c78af74a?auto=format&fit=crop&w=400&q=80" },
    { name: "Delhi", properties: "22K+", image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=400&q=80" },
    { name: "Bengaluru", properties: "18K+", image: "https://images.unsplash.com/photo-1529209065735-c1a5e2cbea1f?auto=format&fit=crop&w=400&q=80" },
    { name: "Hyderabad", properties: "15K+", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80" },
    { name: "Chennai", properties: "12K+", image: "https://images.unsplash.com/photo-1595079676339-153e7ea56a93?auto=format&fit=crop&w=400&q=80" },
    { name: "Kolkata", properties: "10K+", image: "https://images.unsplash.com/photo-1582573613351-495bdfa3d96e?auto=format&fit=crop&w=400&q=80" },
    { name: "Pune", properties: "14K+", image: "https://images.unsplash.com/photo-1597040663342-45b6af3e0917?auto=format&fit=crop&w=400&q=80" },
    { name: "Ahmedabad", properties: "8K+", image: "https://images.unsplash.com/photo-1633152617887-e10dbd5027d3?auto=format&fit=crop&w=400&q=80" },
  ];

  const allCities = [
    "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
    "Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Patna", "Indore", "Thane",
    "Bhopal", "Visakhapatnam", "Vadodara", "Firozabad", "Ludhiana", "Rajkot", "Agra",
    "Siliguri", "Nashik", "Faridabad", "Patiala", "Meerut", "Kalyan", "Vasai", "Varanasi",
    "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi",
    "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai",
    "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli", "Dharwad"
  ];

  const featuredDevelopers = [
    { name: "DLF", projects: "150+", logo: "🏢" },
    { name: "Sobha", projects: "120+", logo: "🏛" },
    { name: "Prestige", projects: "180+", logo: "🏬" },
    { name: "Godrej", projects: "90+", logo: "🏣" },
    { name: "Brigade", projects: "110+", logo: "🏤" },
    { name: "Lodha", projects: "130+", logo: "🏨" },
  ];

  const propertyShowcaseTypes = [
    { type: "Apartments", count: "45K+", icon: "🏢" },
    { type: "Villas", count: "12K+", icon: "🏡" },
    { type: "Plots", count: "8K+", icon: "📐" },
    { type: "Commercial", count: "15K+", icon: "🏬" },
    { type: "Farm Houses", count: "3K+", icon: "🌾" },
    { type: "PG/Hostels", count: "5K+", icon: "🏘" },
  ];

  const stats = [
    { number: "10,000+", label: "Properties Listed" },
    { number: "₹2,500Cr+", label: "Property Value" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "0%", label: "Brokerage Fee" },
  ];

  return (
    <div className="font-sans text-gray-800">
      
      {/* 🏠 Hero Section Component */}
      <HeroSection
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        subcategories={subcategories}
        propertyTypes={propertyTypeOptions}
      />
        
      {/* 🏙 Featured Properties */}
<section className="relative py-10  to-white">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-3 text-gray-800">
      Featured <span className="text-red-600">Properties</span>
    </h2>
    <p className="text-gray-500 mb-12">
      Handpicked homes and investments across India’s top cities
    </p>

    {filteredProperties.length === 0 ? (
      <p className="text-gray-400 text-lg">No properties found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProperties.map((property) => (
          <div
            key={property._id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
          >
            {/* 🏙 Image */}
            <div className="relative">
              <img
                src={resolveImageSrc(property.images?.[0])}
                alt={property.title}
                className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) =>
                  (e.target.src =
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800")
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                Featured
              </span>
            </div>

            {/* 🏠 Info */}
            <div className="p-5 text-left">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {property.title}
              </h3>
              <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                <FaMapMarkerAlt className="text-red-500" />{" "}
                {property.address?.city}, {property.address?.state}
              </p>

              <p className="text-red-600 font-bold text-xl mb-5">
                ₹{property.price?.toLocaleString()} {property.priceUnit}
              </p>

              <button
                onClick={() => handleViewDetails(property)}
                className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white py-2.5 rounded-xl font-semibold hover:scale-[1.02] hover:shadow-lg transition-all"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>



      {/* 🏘 Discover Section Component */}
      <DiscoverSection />
      <TopLocalities />
      <TopDevelopers />



      {/* 🏢 Developers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Trusted by Every Indian
          </h2>
          <p className="text-gray-600 mb-10">Partnered with 100+ renowned real estate brands</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredDevelopers.map((dev, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:scale-105">
                <div className="text-3xl mb-3">{dev.logo}</div>
                <h3 className="font-bold text-gray-800 mb-1">{dev.name}</h3>
                <p className="text-sm text-gray-600">{dev.projects} Projects</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏘 Property Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Find Your Perfect Property Type
          </h2>
          <p className="text-gray-600 mb-10">Explore diverse property categories tailored to your needs</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {propertyShowcaseTypes.map((type, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-red-50 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition transform hover:scale-105 border"
              >
                <div className="text-3xl mb-3">{type.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{type.type}</h3>
                <p className="text-sm text-gray-600">{type.count} Listings</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      

      {/* 📈 Investment Banner */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="max-w-7xl mx-auto px-6 bg-blue-800 rounded-2xl p-8 text-white">
          <AiOutlineStar className="text-4xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Smart Investment Opportunity</h3>
          <p className="text-lg mb-6 opacity-90">Properties in top cities appreciating 15–20% annually</p>
          <button className="bg-white text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            View High ROI Properties →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
