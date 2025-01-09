import { JSX } from "react";
import { useState, useEffect } from "react";
import Header from "../Components/Header";
import IndividualSearchResult from "../Components/IndividualSearchResult";

export default function SearchResultsPage(): JSX.Element {
  const [results, setResults] = useState([
    { title: "title", date: 1, location: "location" },
  ]);

  // Add functionality to not display all results at once
  // Function to fetch the results from the API
  function fetchResults() {
    // Fetch the results
  }

  /**
   * useEffect to fetch the results when the component mounts
   */
  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div>
      <Header />
      {/* Search component */}
      {/* Results Container */}
      <div>
        {/* map the individual results */}
        {results.map((result) => (
          <IndividualSearchResult
            title={result.title}
            date={result.date}
            location={result.location}
          />
        ))}
      </div>
    </div>
  );
}
