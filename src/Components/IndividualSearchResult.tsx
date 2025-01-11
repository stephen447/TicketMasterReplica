import { JSX } from "react";

interface EventProps {
  title: string;
  date: number; // Changed from number to string for better readability and format control
  location: string;
}

export default function IndividualSearchResult({
  title,
  date,
  location,
}: EventProps): JSX.Element {
  /**
   * Handles the click event when the "Find Tickets" button is clicked.
   */
  function handleClick() {
    console.log(`Tickets for ${title} at ${location} on ${date} clicked.`);
  }

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600">{date}</p>
      <p className="text-gray-600 mb-4">{location}</p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Find Tickets
      </button>
    </div>
  );
}
