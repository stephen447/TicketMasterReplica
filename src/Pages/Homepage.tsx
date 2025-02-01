import React, { JSX } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FeaturedEventData from "../SampleData/Events.json";
import Carousel from "../Components/Carousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Homepage(): JSX.Element {
  const navigate = useNavigate();
  // State variables for the search form
  const regions: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Featured Adverts data - will be fetched from server
  const FeaturedAdverts: { title: string; description: string; id: number }[] =
    [FeaturedEventData[0], FeaturedEventData[1], FeaturedEventData[2]];

  // TODO - Function for fetching Feattured Adverts
  function fetchFeaturedAdverts() {
    // Fetch the featured adverts from the API
  }

  // TODO - Function for fetching Popular Tickets
  function fetchPopularTickets() {
    // Fetch the popular tickets from the API
  }

  // Function to handle search form submission
  function handleSearch(
    startDate: string,
    endDate: string,
    region: string,
    searchTerm: string
  ) {
    // Append search query to the url
    navigate(
      `/search-results?startDate=${startDate}&endDate=${endDate}&region=${region}&searchTerm=${searchTerm}`
    );
  }

  const handleRedirect = (id: number) => {
    navigate(`/tickets/${id}`); // Replace with your target path
  };

  /**
   * Function to handle the change event for the start date input
   * @param e React.ChangeEvent<HTMLInputElement>
   */
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    // Check if the start date is before the end date
    if (endDate && newStartDate > endDate) {
      setError("Start date must be before end date");
    } else {
      setError(null);
    }
  };

  /**
   * Function for handling the change event for the end date input
   * @param e React.ChangeEvent<HTMLInputElement>
   */
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);

    if (startDate && startDate > newEndDate) {
      setError("Start date must be before end date");
    } else {
      setError(null);
    }
  };

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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              {/* Region Input */}
              <select
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                }}
                className="md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
              >
                <option value="" disabled className="text-gray-500">
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
                  onChange={(e) => {
                    handleStartDateChange(e);
                  }}
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
                  onChange={(e) => {
                    handleEndDateChange(e);
                  }}
                  className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {/* Search Button */}
              <button
                className="w-full md:w-auto px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mt-6"
                disabled={error !== null}
                onClick={() => {
                  handleSearch(startDate, endDate, region, searchTerm);
                }}
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
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md p-6 mx-auto"
                >
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <button
                    onClick={() => handleRedirect(event.id)}
                    className="px-4 py-2  text-white rounded-md hover:bg-yellow-600"
                  >
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
