import { JSX } from "react";
import { useState, useEffect } from "react";
import Header from "../Components/Header";
import IndividualSearchResult from "../Components/IndividualSearchResult";

export default function SearchResultsPage(): JSX.Element {
  const [results, setResults] = useState<EventResult[]>([]); // State is an array of EventResult
  const [displayedResults, setDisplayedResults] = useState<EventResult[]>([]); // State is an array of EventResult
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true); // State is a boolean
  const [page, setPage] = useState<number>(1); // State is a number
  const numberOfResultsPerPage = 3;

  type EventResult = {
    title: string;
    date: string;
    location: string;
    id: number;
    availibility: string;
  };

  function fetchResults() {
    const fetchedResults: EventResult[] = [
      {
        title: "Event Title",
        date: "2025-02-20",
        location: "New York, NY",
        id: 1,
        availibility: "Available",
      },
      {
        title: "Concert",
        date: "2025-03-15",
        location: "Los Angeles, CA",
        id: 2,
        availibility: "Sold Out",
      },
    ];

    setResults(fetchedResults);
    setDisplayedResults(fetchedResults.slice(0, numberOfResultsPerPage)); // Initially show only the first result
    setHasMoreResults(fetchedResults.length > numberOfResultsPerPage); // Determine if more results are available
  }

  useEffect(() => {
    fetchResults();
  }, []);

  function fetchMoreResults() {
    const newPageLimit = numberOfResultsPerPage * page + 1;
    const updatedResults = results.slice(0, newPageLimit);
    // Update the displayed results
    setDisplayedResults(updatedResults);
    // Update `hasMoreResults` based on whether more results are left
    setHasMoreResults(updatedResults.length < results.length);
    // Increment the page number
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <Header />
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
          <p>
            Displaying {displayedResults.length} of {results.length} Results
          </p>
        </div>
        <div className="">
          {/* Map the individual results */}
          {displayedResults.map((result) => (
            <IndividualSearchResult
              key={result.id}
              title={result.title}
              date={result.date}
              location={result.location}
              availability={result.availibility}
            />
          ))}
          {/* Show the "More Results" button if there are more results */}
          {hasMoreResults && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={fetchMoreResults}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                More Results
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
