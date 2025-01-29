import { JSX } from "react";
import { useState, useEffect } from "react";
import Header from "../Components/Header";
import IndividualSearchResult from "../Components/IndividualSearchResult";
import Events from "../SampleData/Events.json";
import { EventResult } from "../types";

export default function SearchResultsPage(): JSX.Element {
  const [results, setResults] = useState<EventResult[]>([]); // State is an array of EventResult
  const [displayedResults, setDisplayedResults] = useState<EventResult[]>([]); // State is an array of EventResult
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true); // State is a boolean
  const [page, setPage] = useState<number>(1); // State is a number
  const numberOfResultsPerPage = 3;

  function fetchResults() {
    // Fetch the parameters in the url
    const urlParams = new URLSearchParams(window.location.search);
    const startDate = urlParams.get("startDate");
    const endDate = urlParams.get("endDate");
    const region = urlParams.get("region");
    const searchTerm = urlParams.get("searchTerm");

    setResults(Events);
    setDisplayedResults(Events.slice(0, numberOfResultsPerPage)); // Initially show only the first result
    setHasMoreResults(Events.length > numberOfResultsPerPage); // Determine if more results are available
  }

  useEffect(() => {
    fetchResults();
  }, []);

  /**
   * Function for expanding the number of results displayed to the user
   */
  function fetchMoreResults() {
    const newPageLimit = numberOfResultsPerPage * (page + 1);
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
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        </div>
        <div className="">
          {/* Check if there are no results */}
          {results.length === 0 ? (
            <p className="text-center text-gray-600">No results found.</p>
          ) : (
            // Display results
            <>
              <p>
                Displaying {displayedResults.length} of {results.length} Results
              </p>
              {/* Map the individual results */}
              {displayedResults.map((result) => (
                <IndividualSearchResult
                  key={result.id}
                  title={result.title}
                  date={result.date}
                  location={result.city}
                  id={result.id}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
