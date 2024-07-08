import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => (
  <div className="flex flex-col items-center mt-5">
    <h2 className="text-3xl font-bold">Sorry!</h2>
    <p className="text-xl mt-3 mb-2">An error occured with a message:</p>
    <p className="bg-lighter_dark px-3 py-1 rounded-md">{error}</p>
    <Link to="/" className="styled_black rounded-md text-sm py-3 px-5 mt-8">
      <FontAwesomeIcon icon={faChevronLeft} className="cursor-pointer mr-2" />
      Go back to the homepage
    </Link>
  </div>
);

export default ErrorDisplay;
