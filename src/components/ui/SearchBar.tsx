import React, { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Module } from "../../types";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

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
  const { filteredModules, fetchModules, filterModules } = useModuleSearch();
  const navigate = useNavigate();

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
    <div className="relative hidden md:flex">
      <div
        className={`border border-lighter_dark rounded-full px-6 py-2 text-sm items-center cursor-text hidden sm:flex focus-within:bg-black transition-all`}
        onClick={() => inputRef.current?.focus()}
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
          className="absolute z-10 w-full bg-dark border border-lighter_dark mt-1 rounded-lg overflow-hidden shadow-lg top-full"
          role="listbox"
          id="search-results"
        >
          {filteredModules.map((module, index) => (
            <div onClick={()=> navigate(`/module/${module.id}`)} key={index}>
              <li
                key={index}
                className={`px-6 py-4 hover:bg-black cursor-pointer text-sm ${
                  index === filteredModules.length - 1
                    ? ""
                    : "border-b border-lighter_dark"
                }`}
              >
                {module.name}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
