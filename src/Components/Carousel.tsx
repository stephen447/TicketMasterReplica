import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CarouselProps {
  items: { title: string; description: string; id: number }[];
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ items, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cycle = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);

    return () => clearInterval(cycle);
  }, [items.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  function handleNavigation(id: number) {
    navigate(`/tickets/${id}`);
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 p-4 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <button
              onClick={() => {
                handleNavigation(item.id);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Find Tickets
            </button>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
