// src/Components/TopDevelopers/TopDevelopers.jsx
import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TopDevelopers = () => {
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
      const scrollAmount = 350;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Generate a color gradient based on the developer name
  const getGradientColor = (name) => {
    const gradients = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-green-400 to-green-600',
      'from-orange-400 to-orange-600',
      'from-teal-400 to-teal-600',
      'from-indigo-400 to-indigo-600',
      'from-red-400 to-red-600',
    ];
    const index = name.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  const developers = [
    {
      id: 1,
      name: "Kolte Patil Developers Ltd",
      location: "Mumbai",
      logo: "https://www.koltepatilindia.com/images/kolte-patil-logo.png",
      totalProjects: 122,
      experience: 29,
      projects: [
        { label: "Ready to Move", count: 91 },
        { label: "Under Construction", count: 17 },
        { label: "New Launch", count: 5 },
      ],
    },
    {
      id: 2,
      name: "Goel Ganga Group",
      location: "Mumbai",
      logo: "https://www.goelganga.com/images/logo.png",
      totalProjects: 115,
      experience: 36,
      projects: [
        { label: "Ready to Move", count: 100 },
        { label: "Under Construction", count: 12 },
      ],
    },
    {
      id: 3,
      name: "Vilas Javdekar",
      location: "Mumbai",
      logo: "https://www.vilasjavdekar.com/images/logo.png",
      totalProjects: 61,
      experience: 38,
      projects: [
        { label: "Ready to Move", count: 42 },
        { label: "Under Construction", count: 15 },
        { label: "New Launch", count: 2 },
      ],
    },
    {
      id: 4,
      name: "Rohan Builders",
      location: "Mumbai",
      logo: "https://www.rohanbuilders.com/images/logo.png",
      totalProjects: 85,
      experience: 25,
      projects: [
        { label: "Ready to Move", count: 65 },
        { label: "Under Construction", count: 18 },
        { label: "New Launch", count: 2 },
      ],
    },
    {
      id: 5,
      name: "Godrej Properties",
      location: "Mumbai",
      logo: "https://www.godrejproperties.com/assets/images/godrej-logo.svg",
      totalProjects: 98,
      experience: 30,
      projects: [
        { label: "Ready to Move", count: 78 },
        { label: "Under Construction", count: 15 },
        { label: "New Launch", count: 5 },
      ],
    },
    {
      id: 6,
      name: "Kumar Properties",
      location: "Mumbai",
      logo: "https://www.kumarproperties.com/images/logo.png",
      totalProjects: 145,
      experience: 42,
      projects: [
        { label: "Ready to Move", count: 120 },
        { label: "Under Construction", count: 20 },
        { label: "New Launch", count: 5 },
      ],
    },
  ];

  return (
    <section className="w-full py-12 bg-white">
      <style>{`
        .scrollable-developers {
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }

        .scrollable-developers::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
            Top Developers in Mumbai
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-5xl">
            Worried about delays or poor construction? Refer to our list of top
            developers in Mumbai, the most trusted real estate developers who have
            always kept their promises. These builders emphasise customer
            satisfaction, transparent practices, and strong project execution.
            Invest in names you can trust.
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
          <div ref={scrollContainerRef} className="scrollable-developers">
            <div className="flex gap-4">
              {developers.map((developer) => (
                <div
                  key={developer.id}
                  className="flex-shrink-0 w-[340px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4"
                >
                  {/* Developer Header */}
                  <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200">
                    {/* Logo with Gradient Fallback */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${getGradientColor(developer.name)} rounded-lg flex items-center justify-center flex-shrink-0 p-2 border border-gray-100 relative overflow-hidden`}>
                      <img
                        src={developer.logo}
                        alt={developer.name}
                        className="w-full h-full object-contain relative z-10"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                        {developer.name.charAt(0)}
                      </div>
                    </div>

                    {/* Developer Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 mb-1 truncate">
                        {developer.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {developer.location}
                      </p>

                      {/* Stats */}
                      <div className="flex gap-6">
                        <div>
                          <div className="text-xl font-bold text-gray-900">
                            {developer.totalProjects}
                          </div>
                          <div className="text-[10px] text-gray-600">
                            Total Projects
                          </div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900">
                            {developer.experience}
                          </div>
                          <div className="text-[10px] text-gray-600">
                            Experience
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Categories */}
                  <div className="space-y-2">
                    {developer.projects.map((project, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition group text-left"
                      >
                        <span className="text-xs font-medium text-gray-900">
                          {project.label} ({project.count})
                        </span>
                        <FiChevronRight className="text-gray-400 group-hover:text-gray-600 transition text-sm flex-shrink-0" />
                      </button>
                    ))}
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
            <span>View All Developers in Mumbai</span>
            <FiChevronRight className="text-lg group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopDevelopers;
