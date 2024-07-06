import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface HeaderProps {
  title: string;
  button?: {
    text: string;
    icon?: IconDefinition;
    onClick: () => void;
    ariaLabel?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ title, button }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium line-clamp-1">{title}</h1>
      </div>
      {button && (
        <button
          className="styled_black rounded-full py-3 px-5 flex items-center justify-center text-sm"
          aria-label={button.ariaLabel || button.text}
          onClick={button.onClick}
        >
          {button.icon && (
            <FontAwesomeIcon icon={button.icon} className="cursor-pointer mr-2" />
          )}
          <span>{button.text}</span>
        </button>
      )}
    </div>
  );
};

export default Header;