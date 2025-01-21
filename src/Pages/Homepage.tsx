import React, { JSX } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FeaturedEventData from "../SampleData/Events.json";
import Carousel from "../Components/Carousel";
import { useNavigate } from "react-router-dom";

export default function Homepage(): JSX.Element {
  const navigate = useNavigate();
  const regions: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const FeaturedAdverts: { title: string; description: string }[] = [
    FeaturedEventData[0],
    FeaturedEventData[1],
    FeaturedEventData[2],
  ];

  function handleSearch() {
    navigate("/search-results");
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="flex-grow bg-gray-100">
        {/* Search Section */}
        <div className="bg-blue-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Find Your Next Event
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search events, artists, venues"
                className="w-full md:flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
              />
              {/* Region Input */}
              <select className="md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700">
                <option value="" disabled selected className="text-gray-500">
                  Select Region
                </option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            {/* Date Inputs */}
            <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
              <div className="flex flex-col">
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-white mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="endDate"
                  className="text-sm font-medium text-white mb-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
              </div>
              {/* Search Button */}
              <button
                className="w-full md:w-auto px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mt-6"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Featured Events Section */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
          <div className="bg-bl">
            <Carousel items={FeaturedAdverts} interval={3000} />
          </div>
        </div>

        {/* Popular Tickets Section */}
        <div className="bg-blue-600 py-12 text-white">
          <div className="container  mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Popular Tickets</h2>
            <div className="grid  grid-cols-1 md:grid-cols-4 gap-6 w-">
              {/* Example Ticket Card */}
              {FeaturedAdverts.map((event, index) => (
                <div className="bg-white rounded-lg shadow-md p-6 mx-auto">
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <button className="px-4 py-2  text-white rounded-md hover:bg-yellow-600">
                    Find Tickets
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
