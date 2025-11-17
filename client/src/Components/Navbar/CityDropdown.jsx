import React, { useState, useRef, useEffect } from "react";
import { AiOutlineSearch, AiOutlineEnvironment } from "react-icons/ai";
import {
  Building2,
  MapPin,
  Landmark,
  Building,
  Home,
} from "lucide-react";

const CityDropdown = ({
  selectedCity,
  setSelectedCity,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const topCities = [
    { name: "Bangalore", icon: <Building2 size={28} /> },
    { name: "Chennai", icon: <Landmark size={28} /> },
    { name: "Delhi", icon: <MapPin size={28} /> },
    { name: "Gurgaon", icon: <Building size={28} /> },
    { name: "Hyderabad", icon: <Building2 size={28} /> },
    { name: "Kolkata", icon: <Landmark size={28} /> },
    { name: "Lucknow", icon: <MapPin size={28} /> },
    { name: "Mumbai", icon: <Building size={28} /> },
    { name: "Navi Mumbai", icon: <Home size={28} /> },
    { name: "Noida", icon: <Building2 size={28} /> },
    { name: "Pune", icon: <Building size={28} /> },
    { name: "Thane", icon: <Landmark size={28} /> },
  ];

  const otherCities = [
    "Adilabad",
    "Agartala",
    "Agra",
    "Ahmedabad",
    "Ahmednagar",
    "Ajmer",
    "Akola",
    "Alappuzha",
    "Aligarh",
    "Allahabad",
    "Alwar",
    "Ambala",
    "Amravati",
    "Amritsar",
    "Anand",
    "Anantapur",
    "Asansol",
    "Aurangabad",
    "Bagalkot",
    "Balasore",
    "Bangalore Rural",
    "Bankura",
    "Barddhaman",
    "Bareilly",
    "Belgaum",
    "Bellary",
    "Bhopal",
    "Bhubaneswar",
    "Bhavnagar",
    "Bijapur",
  ];

  const filteredTopCities = topCities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOtherCities = otherCities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onMouseLeave();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onMouseLeave]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    onMouseLeave();
    setSearchQuery("");
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(
            "Location detected! (In production, integrate with a geocoding API)"
          );
        },
        (error) => {
          alert("Unable to detect location");
        }
      );
    }
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-700 font-medium transition text-[15px]">
        <span>{selectedCity || "City"}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-0 w-[450px] bg-white rounded-b-lg shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-y-auto">
          <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="relative">
              <AiOutlineSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Select or type your city"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <button
              onClick={detectLocation}
              className="flex items-center space-x-2 mt-3 text-sm text-gray-700 hover:text-blue-600"
            >
              <AiOutlineEnvironment size={18} />
              <span>Detect my location</span>
            </button>
          </div>

          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Top Cities
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {filteredTopCities.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleCitySelect(city.name)}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition group"
                >
                  <div className="text-gray-600 group-hover:text-blue-600 mb-2">
                    {city.icon}
                  </div>
                  <span className="text-xs text-gray-700 text-center">
                    {city.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {filteredOtherCities.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">
                Other Cities
              </h3>
              <div className="space-y-1">
                {filteredOtherCities.slice(0, 20).map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleCitySelect(city)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedCity && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setSelectedCity("");
                  onMouseLeave();
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Reset City
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CityDropdown;
