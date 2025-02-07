import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Suggestions from "./Suggestions";

export default function Header({ setQuery }) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [dark, setDark] = useState(false);

  const navigate = useNavigate();

  // toggles dark mode
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  // search user
  const handleSearch = (username) => {
    if (!username.trim()) return;

    setQuery(username);
    setSearch("");
    navigate(`/${username}`);
    
    localStorage.setItem("lastUser", username);
  };

  return (
    <header className="relative flex items-center justify-center h-20 ">
      {/* Search bar */}
      <input
        type="text"
        value={search}
        id="search_bar"
        autoComplete="off"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch(search)}
        onClick={() => setIsFocused(true)}
        placeholder="Search a user..."
        className="border p-2 w-60 dark:bg-card-background rounded-lg focus:w-96 transition-all duration-300 max-sm:focus:w-60"
      />
      {/* Dark mode icons */}
      <button onClick={darkModeHandler} className="absolute left-10  transform  text-3xl max-sm:left-7">
        {dark ? (
          <FontAwesomeIcon icon={faSun} className="text-orange-400" />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </button>

      {/* Suggestions Dropdown */}
      <Suggestions
        search={search}
        handleSearch={handleSearch}
        isFocused={isFocused}
      />
    </header>
  );
}
