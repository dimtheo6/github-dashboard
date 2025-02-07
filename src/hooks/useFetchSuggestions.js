import { useState, useEffect } from "react";

export const useFetchSuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${query}&per_page=5`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("Failed to fetch suggestions");

        const data = await response.json();
        setSuggestions(data.items || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => fetchSuggestions(), 300); // Debounce API calls

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [query]);

  return { suggestions, loading, error };
};
