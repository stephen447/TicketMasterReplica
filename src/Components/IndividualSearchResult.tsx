import React from "react";
import { useNavigate } from "react-router-dom";

interface IndividualSearchResultProps {
  title: string;
  date: string;
  location: string;
  availability?: string;
  id: number;
}

const IndividualSearchResult: React.FC<IndividualSearchResultProps> = ({
  title,
  date,
  location,
  availability,
  id,
}) => {
  const navigate = useNavigate();
  const handleRedirect = (id: number) => {
    navigate(`/tickets/${id}`); // Replace with your target path
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-3">
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{date}</p>
        <p className="text-sm text-gray-600">{location}</p>
        <p>{availability}</p>
        <button
          onClick={() => handleRedirect(id)}
          className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Find Tickets
        </button>
      </div>
    </div>
  );
};

export default IndividualSearchResult;
