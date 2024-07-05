import React, { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Module } from "../types";

const useModuleSearch = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);

  const fetchModules = useCallback(async () => {
    if (modules.length === 0) {
      try {
        const fetchedData = await api.getAllModules();
        setModules(fetchedData);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    }
  }, [modules]);

  const filterModules = (query: string) => {
    if (!query) {
      setFilteredModules([]);
      return;
    }
    const filtered = modules.filter((module) =>
      module.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredModules(filtered);
  };

  return {
    modules,
    filteredModules,
    fetchModules,
    filterModules,
    setFilteredModules,
    setModules,
  };
};

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputBlurred, setInputBlurred] = useState(false);
  const { filteredModules, fetchModules, filterModules, setModules } =
    useModuleSearch();

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setSearchQuery(value);
    filterModules(value);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setInputBlurred(true);
    }, 100);
  };

  return (
    <div className="relative">
      <div
        className={`border border-gray_border rounded-full px-6 py-2 md:w-96 text-sm items-center cursor-text hidden sm:flex focus-within:bg-white transition-all`}
        onClick={() => inputRef.current?.focus()}
      >
        <FontAwesomeIcon
          icon={["fas", "search"]}
          className="text-neutral-400 mr-4"
        />
        <input
          type="text"
          placeholder="Search for your modules..."
          className="bg-transparent focus:outline-none flex-1"
          value={searchQuery}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setInputBlurred(false)}
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={filteredModules.length > 0}
          ref={inputRef}
        />
      </div>
      {filteredModules.length > 0 && !inputBlurred && (
        <ul
          className="absolute z-10 w-full bg-white border mt-1 border-gray-300 rounded-lg overflow-hidden shadow-lg"
          role="listbox"
          id="search-results"
        >
          {filteredModules.map((module, index) => (
            <a href={`/module/${module.id}`} key={index}>
              <li
                key={index}
                className={`px-6 py-4 hover:bg-gray-100 cursor-pointer text-sm ${
                  index === filteredModules.length - 1 ? "" : "border-b border-gray-200"
                }`}
              >
                {module.name}
              </li>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
