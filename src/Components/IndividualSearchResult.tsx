import { JSX } from "react";

interface EventProps {
  title: string;
  date: number;
  location: string;
}

export default function IndividualSearchResult({
  title,
  date,
  location,
}: EventProps): JSX.Element {
  /**
   * This function is called when the button is clicked
   */
  function handleClick() {
    console.log("Button clicked");
  }

  return (
    <button onClick={handleClick}>
      <div>
        <h1>{title}</h1>
        <p>{date}</p>
        <p>{location}</p>
        <button>Find Tickets</button>
      </div>
    </button>
  );
}
