import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/dealdirect_logo.webp";
import CityDropdown from "./CityDropdown";
import MegaMenu from "./MegaMenu";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const syncUserFromStorage = useCallback(() => {
    try {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (error) {
      console.error("Failed to parse user from storage", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    syncUserFromStorage();
    const handleStorage = () => syncUserFromStorage();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("auth-change", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("auth-change", handleStorage);
    };
  }, [syncUserFromStorage]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  const derivedRole = useMemo(() => {
    if (!user) return "user";
    const fallbacks = user.role || user.accountType || user.userType || user.type;
    if (typeof fallbacks === "string") return fallbacks.toLowerCase();
    if (user.isAgent) return "agent";
    return "user";
  }, [user]);

  const isAgent = derivedRole === "agent";
  const agentUploadUrl = import.meta.env.VITE_AGENT_UPLOAD_URL || "/admin/add-property";
  const isExternalAgentUrl = /^https?:\/\//i.test(agentUploadUrl || "");
  const showAgentUpload = isAgent && Boolean(agentUploadUrl);

  const handleAgentUploadNavigation = useCallback(() => {
    if (!showAgentUpload) return;
    if (isExternalAgentUrl) {
      window.location.href = agentUploadUrl;
      return;
    }
    navigate(agentUploadUrl);
  }, [agentUploadUrl, isExternalAgentUrl, navigate, showAgentUpload]);

  // Buy Mega Menu Data - 5 Sections
  const buyMenuSections = [
    {
      title: "Popular Searches",
      links: [
        { label: "Property in Mumbai", url: "/properties?city=Mumbai&type=sale" },
        { label: "Gated Community Flats in Mumbai", url: "/properties?city=Mumbai&type=gated-flats" },
        { label: "No Brokerage Flats in Mumbai", url: "/properties?city=Mumbai&type=no-brokerage" },
        { label: "Property for Sale in Mumbai Under 50 Lakhs", url: "/properties?city=Mumbai&price=under-50" },
        { label: "2 BHK Flats in Mumbai", url: "/properties?city=Mumbai&type=2bhk" },
      ],
    },
    {
      title: "Property Type",
      links: [
        { label: "Flats in Mumbai", url: "/properties?city=Mumbai&type=flat" },
        { label: "Plot in Mumbai", url: "/properties?city=Mumbai&type=plot" },
        { label: "Builder Floor in Mumbai", url: "/properties?city=Mumbai&type=builder-floor" },
        { label: "Villa in Mumbai", url: "/properties?city=Mumbai&type=villa" },
        { label: "Houses in Mumbai", url: "/properties?city=Mumbai&type=house" },
        { label: "Office Space in Mumbai", url: "/properties?city=Mumbai&type=office" },
        { label: "Shop in Mumbai", url: "/properties?city=Mumbai&type=shop" },
      ],
    },
    {
      title: "New Projects in Mumbai",
      links: [
        { label: "New Projects in Mumbai", url: "/properties?city=Mumbai&new=true" },
        { label: "Ready to Move Projects in Mumbai", url: "/properties?city=Mumbai&ready=true" },
        { label: "Under Construction Projects in Mumbai", url: "/properties?city=Mumbai&construction=true" },
        { label: "New Launch Projects in Mumbai", url: "/properties?city=Mumbai&new-launch=true" },
      ],
    },
    {
      title: "By BHK",
      links: [
        { label: "1 BHK Flats in Mumbai", url: "/properties?city=Mumbai&bhk=1" },
        { label: "2 BHK Flats in Mumbai", url: "/properties?city=Mumbai&bhk=2" },
        { label: "3 BHK Flats in Mumbai", url: "/properties?city=Mumbai&bhk=3" },
        { label: "4 BHK Flats in Mumbai", url: "/properties?city=Mumbai&bhk=4" },
        { label: "5 BHK Flats in Mumbai", url: "/properties?city=Mumbai&bhk=5" },
      ],
    },
    {
      title: "Budget",
      links: [
        { label: "Property in Mumbai Under 50 Lakhs", url: "/properties?city=Mumbai&price=under-50L" },
        { label: "Property in Mumbai 50 Lakhs to 1 Crore", url: "/properties?city=Mumbai&price=50L-1Cr" },
        { label: "Property in Mumbai 1 Crore to 1.5 Crore", url: "/properties?city=Mumbai&price=1Cr-1.5Cr" },
        { label: "Property in Mumbai 1.5 Crore to 2 Crore", url: "/properties?city=Mumbai&price=1.5Cr-2Cr" },
        { label: "Property in Mumbai 2 Crore to 2.5 Crore", url: "/properties?city=Mumbai&price=2Cr-2.5Cr" },
        { label: "Property in Mumbai 2.5 Crore to 3 Crore", url: "/properties?city=Mumbai&price=2.5Cr-3Cr" },
        { label: "Property in Mumbai 3 Crore to 5 Crore", url: "/properties?city=Mumbai&price=3Cr-5Cr" },
        { label: "Property in Mumbai Above 5 Crore", url: "/properties?city=Mumbai&price=above-5Cr" },
      ],
    },
  ];

  // Rent Mega Menu Data - 5 Sections
  const rentMenuSections = [
    {
      title: "Popular Searches",
      links: [
        { label: "Property for Rent in Mumbai", url: "/properties?city=Mumbai&type=rent" },
        { label: "Furnished Flats for Rent in Mumbai", url: "/properties?city=Mumbai&type=furnished-rent" },
        { label: "Gated Community Flats for Rent in Mumbai", url: "/properties?city=Mumbai&type=gated-rent" },
        { label: "2 BHK Flats for Rent in Mumbai", url: "/properties?city=Mumbai&bhk=2&type=rent" },
      ],
    },
    {
      title: "Property Type",
      links: [
        { label: "Flats for Rent in Mumbai", url: "/properties?city=Mumbai&type=flat-rent" },
        { label: "Builder Floor for Rent in Mumbai", url: "/properties?city=Mumbai&type=builder-floor-rent" },
        { label: "Pg in Mumbai", url: "/properties?city=Mumbai&type=pg" },
        { label: "Houses for Rent in Mumbai", url: "/properties?city=Mumbai&type=house-rent" },
        { label: "Villa for Rent in Mumbai", url: "/properties?city=Mumbai&type=villa-rent" },
        { label: "Houses for Lease in Mumbai", url: "/properties?city=Mumbai&type=house-lease" },
        { label: "Coliving Space for Rent in Mumbai", url: "/properties?city=Mumbai&type=coliving" },
        { label: "Office Space for Rent in Mumbai", url: "/properties?city=Mumbai&type=office-rent" },
        { label: "Shop for Rent in Mumbai", url: "/properties?city=Mumbai&type=shop-rent" },
        { label: "Showroom for Rent in Mumbai", url: "/properties?city=Mumbai&type=showroom-rent" },
      ],
    },
    {
      title: "By BHK",
      links: [
        { label: "1 RK for Rent in Mumbai", url: "/properties?city=Mumbai&type=1rk-rent" },
        { label: "1 BHK Flats for Rent in Mumbai", url: "/properties?city=Mumbai&bhk=1&type=rent" },
        { label: "2 BHK Flats for Rent in Mumbai", url: "/properties?city=Mumbai&bhk=2&type=rent" },
        { label: "3 BHK Flats for Rent in Mumbai", url: "/properties?city=Mumbai&bhk=3&type=rent" },
        { label: "4 BHK Flats for Rent in Mumbai", url: "/properties?city=Mumbai&bhk=4&type=rent" },
        { label: "5 BHK Flats for Rent in Mumbai", url: "/properties?city=Mumbai&bhk=5&type=rent" },
        { label: "6 BHK Flats for Rent in Mumbai", url: "/properties?city=Mumbai&bhk=6&type=rent" },
        { label: "Studio Apartments for Rent in Mumbai", url: "/properties?city=Mumbai&type=studio-rent" },
      ],
    },
    {
      title: "Budget",
      links: [
        { label: "Property for Rent in Mumbai 10 Thousand to 15 Thousand", url: "/properties?city=Mumbai&rent=10k-15k" },
        { label: "Property for Rent in Mumbai 20 Thousand to 30 Thousand", url: "/properties?city=Mumbai&rent=20k-30k" },
        { label: "Property for Rent in Mumbai 30 Thousand to 40 Thousand", url: "/properties?city=Mumbai&rent=30k-40k" },
        { label: "Property for Rent in Mumbai 40 Thousand to 50 Thousand", url: "/properties?city=Mumbai&rent=40k-50k" },
        { label: "Property for Rent in Mumbai 50 Thousand to 60 Thousand", url: "/properties?city=Mumbai&rent=50k-60k" },
        { label: "Property for Rent in Mumbai 60 Thousand to 70 Thousand", url: "/properties?city=Mumbai&rent=60k-70k" },
        { label: "Property for Rent in Mumbai 70 Thousand to 80 Thousand", url: "/properties?city=Mumbai&rent=70k-80k" },
        { label: "Property for Rent in Mumbai 80 Thousand to 90 Thousand", url: "/properties?city=Mumbai&rent=80k-90k" },
        { label: "Property for Rent in Mumbai 90 Thousand to 1 Lakh", url: "/properties?city=Mumbai&rent=90k-1L" },
        { label: "Property for Rent in Mumbai 1 Lakhs to 1.2 Lakhs", url: "/properties?city=Mumbai&rent=1L-1.2L" },
      ],
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-white shadow-md py-3"
      }`}
    >
      <div className="mx-auto py-4 ml-10 flex items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center mr-6">
          <img
            src={logo}
            alt="DealDirect"
            className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Menu - Left Side */}
        <div className="hidden lg:flex items-center space-x-0">
          <CityDropdown
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            isOpen={activeMenu === "city"}
            onMouseEnter={() => setActiveMenu("city")}
            onMouseLeave={() => setActiveMenu(null)}
          />
          <MegaMenu
            title="Buy"
            sections={buyMenuSections}
            isOpen={activeMenu === "buy"}
            onMouseEnter={() => setActiveMenu("buy")}
            onMouseLeave={() => setActiveMenu(null)}
          />
          <MegaMenu
            title="Rent"
            sections={rentMenuSections}
            isOpen={activeMenu === "rent"}
            onMouseEnter={() => setActiveMenu("rent")}
            onMouseLeave={() => setActiveMenu(null)}
          />
          
          {/* Agreements - Simple Link (NO dropdown) */}
          <Link
            to="/agreements"
            className="px-3 py-2 text-gray-700 hover:text-blue-700 font-medium transition text-[15px]"
          >
            Agreements
          </Link>
        </div>

        {/* Desktop Menu - Right Side */}
        <div className="hidden lg:flex items-center space-x-6 ml-auto mr-10">
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 font-medium transition text-[15px]"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 font-medium transition text-[15px]"
          >
            Contact
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/properties"
              className="text-gray-700 hover:text-blue-600 font-medium transition text-[15px]"
            >
              Properties
            </Link>
            {showAgentUpload && (
              <button
                type="button"
                onClick={handleAgentUploadNavigation}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-700 transition inline-flex"
              >
                Upload Property
              </button>
            )}
          </div>
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-medium text-sm">
                Hi, {user.name?.split(" ")[0] || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
            >
              <AiOutlineUser className="text-lg" />
              <span className="font-medium text-sm">Login</span>
            </Link>
          )}

          {/* <Link
            to="/add-property"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            Upload Property
          </Link> */}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-2xl text-gray-700 hover:text-blue-700 focus:outline-none"
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-5 invisible"
        }`}
      >
        <div className="flex flex-col px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <Link
            to="/"
            onClick={toggleMenu}
            className="text-gray-700 font-medium hover:text-blue-700 transition py-2 border-b"
          >
            Home
          </Link>
          <Link
            to="/properties"
            onClick={toggleMenu}
            className="text-gray-700 font-medium hover:text-blue-700 transition py-2 border-b"
          >
            Properties
          </Link>
          {showAgentUpload && (
            <button
              type="button"
              className="text-gray-700 font-medium hover:text-blue-700 transition py-2 border-b text-left"
              onClick={() => {
                handleAgentUploadNavigation();
                if (!isExternalAgentUrl) toggleMenu();
              }}
            >
              Upload Property
            </button>
          )}
          <Link
            to="/agreements"
            onClick={toggleMenu}
            className="text-gray-700 font-medium hover:text-blue-700 transition py-2 border-b"
          >
            Agreements
          </Link>
          <Link
            to="/about"
            onClick={toggleMenu}
            className="text-gray-700 font-medium hover:text-blue-700 transition py-2 border-b"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className="text-gray-700 font-medium hover:text-blue-700 transition py-2 border-b"
          >
            Contact
          </Link>

          {user ? (
            <div className="flex flex-col items-start space-y-3 py-2">
              <span className="text-gray-700 font-medium">
                Hi, {user.name?.split(" ")[0] || "User"}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-red-500 hover:underline text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="text-gray-700 font-medium hover:text-blue-700 transition py-2 border-b"
            >
              Login
            </Link>
          )}

          {/* <Link
            to="/properties"
            onClick={toggleMenu}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all duration-300 text-center"
          >
            List Property
          </Link> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
