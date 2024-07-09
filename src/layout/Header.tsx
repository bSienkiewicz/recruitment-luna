import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import toast from "react-hot-toast";

interface HeaderProps {
  title: string;
  button?: {
    text: string;
    icon?: IconDefinition;
    onClick: () => void;
    ariaLabel?: string;
    disabled?: boolean;
  };
  error?: string | null;
  isLoading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, button, error, isLoading }) => {
  const handleButtonClick = () => {
    if (button) {
      if (!button.disabled && button.onClick) {
        button.onClick();
      } else {
        toast.error("Cannot edit a module that is not available", {id: 'edit-module'});
      }
    }
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium line-clamp-1">{title}</h1>
      </div>
      {button && !error && !isLoading && (
        <button
          className={`button_dark py-3 px-5 flex items-center justify-center text-sm ${
            button.disabled ? "opacity-50 !cursor-not-allowed" : ""
          }`}
          aria-label={button.ariaLabel || button.text}
          onClick={handleButtonClick}
          disabled={button.disabled}
        >
          {button.icon && (
            <FontAwesomeIcon
              icon={button.icon}
              className="cursor-pointer mr-2"
            />
          )}
          <span>{button.text}</span>
        </button>
      )}
    </div>
  );
};

export default Header;
