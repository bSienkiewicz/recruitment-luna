import React, { useCallback, useRef, useState } from "react";
import { api } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModuleType } from "../../types";
import Input from "./Input";
import { Link } from "react-router-dom";

export const useModuleSearch = () => {
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [filteredModules, setFilteredModules] = useState<ModuleType[]>([]);

  const fetchModules = useCallback(async () => {
    try {
      const fetchedData = await api.getAllModules();
      setModules(fetchedData);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  }, []);

  const filterModules = useCallback((query: string) => {
    if (!query) {
      setFilteredModules([]);
      return;
    }
    const filtered = modules.filter((module) =>
      module.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredModules(filtered);
  }, [modules]);

  return { modules, filteredModules, fetchModules, filterModules };
};

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { filteredModules, fetchModules, filterModules } = useModuleSearch();

  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
    fetchModules();
  }, [fetchModules]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterModules(value);
  }, [filterModules]);

  const handleInputBlur = () => {
    setTimeout(() => setIsInputFocused(false), 100);
  };

  const handleSearchBarClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative hidden md:flex">
      <div
        className="border border-lighter_dark rounded-full px-6 py-2 text-sm items-center cursor-text hidden sm:flex focus-within:bg-black transition-all"
        onClick={handleSearchBarClick}
      >
        <FontAwesomeIcon
          icon={["fas", "search"]}
          className="text-neutral-400 mr-4"
        />
        <Input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none flex-1 !border-0"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={filteredModules.length > 0}
          ref={inputRef}
          data-testid="search-input"
        />
      </div>
      {filteredModules.length > 0 && isInputFocused && (
        <ul
          className="absolute z-10 w-full bg-dark border border-lighter_dark mt-1 rounded-lg overflow-hidden shadow-lg top-full"
          role="listbox"
          id="search-results"
          data-testid="search-results"
        >
          {filteredModules.map((module) => (
            <li key={module.id} className="border-b border-lighter_dark">
              <Link
                to={`/module/${module.id}`}
                className="block px-6 py-4 hover:bg-black text-sm"
                onClick={() => {
                  setIsInputFocused(false);
                  setSearchQuery("");
                }}
                data-testid={`search-result-${module.id}`}
              >
                {module.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;