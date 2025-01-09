import React, { JSX } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Homepage(): JSX.Element {
  const regions: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  return (
    <div>
      <Header />
      {/* Search */}
      <div>
        {/* Region Input */}
        <select>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        {/* Date Input */}
        <input type="date" />
        {/* Search Input */}
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
      {/* Featured Events */}
      <div>
        <h1>Featured Events</h1>
        <p> Title</p>
        <p> Description</p>
        <button> Find Tickets</button>
      </div>
      {/* Popular Tickets */}
      {/* Footer */}
      <Footer />
    </div>
  );
}
