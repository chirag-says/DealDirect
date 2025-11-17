// src/Components/TopLocalities/TopLocalities.jsx
import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";

const TopLocalities = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const localities = [
    {
      id: 1,
      name: "Bandra, Mumbai",
      mapImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=200&h=200&fit=crop",
      rating: 4.7,
      reviews: 14,
      rank: 12,
      totalLocalities: 1157,
      stats: [
        { label: "New Projects", count: 442, location: "in Bandra, Mumbai" },
        { label: "Properties for Sale", count: "1,794", location: "in Bandra, Mumbai" },
        { label: "Properties for Rent", count: "1,822", location: "in Bandra, Mumbai" },
      ],
      avgSalePrice: "₹ 13,800/Sq. Ft",
      avgRentalPrice: "₹ 34/Sq. Ft",
    },
    {
      id: 2,
      name: "Andheri, Mumbai",
      mapImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&h=200&fit=crop",
      rating: 4.6,
      reviews: 6,
      rank: 8,
      totalLocalities: 1157,
      stats: [
        { label: "New Projects", count: 996, location: "in Andheri, Mumbai" },
        { label: "Properties for Sale", count: "1,319", location: "in Andheri, Mumbai" },
        { label: "Properties for Rent", count: "1,420", location: "in Andheri, Mumbai" },
      ],
      avgSalePrice: "₹ 14,400/Sq. Ft",
      avgRentalPrice: "₹ 36/Sq. Ft",
    },
    {
      id: 3,
      name: "Powai, Mumbai",
      mapImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&h=200&fit=crop",
      rating: 4.5,
      reviews: 9,
      rank: 25,
      totalLocalities: 1157,
      stats: [
        { label: "New Projects", count: 390, location: "in Powai, Mumbai" },
        { label: "Properties for Sale", count: "1,192", location: "in Powai, Mumbai" },
        { label: "Properties for Rent", count: "1,636", location: "in Powai, Mumbai" },
      ],
      avgSalePrice: "₹ 10,900/Sq. Ft",
      avgRentalPrice: "₹ 34/Sq. Ft",
    },
    {
      id: 4,
      name: "Thane West, Mumbai",
      mapImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop",
      rating: 4.6,
      reviews: 8,
      rank: 15,
      totalLocalities: 1157,
      stats: [
        { label: "New Projects", count: "1,515", location: "in Thane West, Mumbai" },
        { label: "Properties for Sale", count: 476, location: "in Thane West, Mumbai" },
        { label: "Properties for Rent", count: 976, location: "in Thane West, Mumbai" },
      ],
      avgSalePrice: "₹ 18,000/Sq. Ft",
      avgRentalPrice: "₹ 32/Sq. Ft",
    },
    {
      id: 5,
      name: "Malad, Mumbai",
      mapImage: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=200&h=200&fit=crop",
      rating: 4.4,
      reviews: 12,
      rank: 30,
      totalLocalities: 1157,
      stats: [
        { label: "New Projects", count: 580, location: "in Malad, Mumbai" },
        { label: "Properties for Sale", count: "1,050", location: "in Malad, Mumbai" },
        { label: "Properties for Rent", count: "1,200", location: "in Malad, Mumbai" },
      ],
      avgSalePrice: "₹ 12,500/Sq. Ft",
      avgRentalPrice: "₹ 30/Sq. Ft",
    },
    {
      id: 6,
      name: "Borivali, Mumbai",
      mapImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=200&h=200&fit=crop",
      rating: 4.5,
      reviews: 10,
      rank: 22,
      totalLocalities: 1157,
      stats: [
        { label: "New Projects", count: 650, location: "in Borivali, Mumbai" },
        { label: "Properties for Sale", count: 890, location: "in Borivali, Mumbai" },
        { label: "Properties for Rent", count: "1,100", location: "in Borivali, Mumbai" },
      ],
      avgSalePrice: "₹ 11,200/Sq. Ft",
      avgRentalPrice: "₹ 28/Sq. Ft",
    },
  ];

  return (
    <section className="w-full py-12 bg-white">
      <style>{`
        .scrollable-localities {
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }

        .scrollable-localities::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
            Top Localities in Mumbai
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-5xl">
            The right locality can make or break your home-buying experience. Our expert-picked top localities in Mumbai are renowned for their balanced development, lifestyle comfort, and strong return on investment. If you desire a serene hideaway or a vibrant city experience, choose a locality that grows with you.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 text-white p-2.5 rounded-full shadow-lg hover:bg-gray-800 transition -ml-3"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="text-xl" />
            </button>
          )}

          {/* Scrollable Cards */}
          <div ref={scrollContainerRef} className="scrollable-localities">
            <div className="flex gap-4">
              {localities.map((locality) => (
                <div
                  key={locality.id}
                  className="flex-shrink-0 w-[370px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4"
                >
                  {/* Locality Header */}
                  <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200">
                    {/* Map Image with Fallback */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-blue-200">
                      <img
                        src={locality.mapImage}
                        alt={locality.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full"><svg class="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg></div>`;
                        }}
                      />
                    </div>

                    {/* Locality Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 mb-1">
                        {locality.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded">
                          <span className="text-yellow-600 text-xs">★</span>
                          <span className="text-xs font-semibold ml-0.5">{locality.rating}</span>
                        </div>
                        <span className="text-xs text-gray-600">
                          • ({locality.reviews} Reviews)
                        </span>
                      </div>

                      {/* Rank */}
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Rank</span>
                        <div className="font-semibold text-gray-900">
                          {locality.rank} <span className="font-normal text-gray-600">out of {locality.totalLocalities.toLocaleString()} localities</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="space-y-2 mb-3">
                    {locality.stats.map((stat, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition group text-left"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-gray-900">
                            {stat.count} {stat.label}
                          </div>
                          <div className="text-[10px] text-gray-600 truncate">
                            {stat.location}
                          </div>
                        </div>
                        <FiChevronRight className="text-gray-400 group-hover:text-gray-600 transition text-sm flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>

                  {/* Price Info */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-[10px] text-gray-600 mb-0.5">Average Sale Price</div>
                      <div className="text-xs font-bold text-gray-900">{locality.avgSalePrice}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-600 mb-0.5">Average Rental</div>
                      <div className="text-xs font-bold text-gray-900">{locality.avgRentalPrice}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 text-white p-2.5 rounded-full shadow-lg hover:bg-gray-800 transition -mr-3"
              aria-label="Scroll right"
            >
              <FiChevronRight className="text-xl" />
            </button>
          )}
        </div>

        {/* View All Button */}
        <div className="mt-6">
          <button className="flex items-center gap-2 text-gray-900 font-semibold hover:text-gray-700 transition group text-sm">
            <span>Localities in Mumbai</span>
            <FiChevronRight className="text-lg group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopLocalities;
