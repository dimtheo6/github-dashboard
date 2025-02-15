import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchSuggestions = async (query) => {
  if (!query.trim()) return [];

  const response = await fetch(
    `https://api.github.com/search/users?q=${query}&per_page=5`
  );

  if (!response.ok) throw new Error("Failed to fetch suggestions");

  const data = await response.json();
  return data.items || [];
};

export const useFetchSuggestions = (query) => {
  return useQuery({
    queryKey: ["suggestions", query],
    queryFn: () => fetchSuggestions(query),
    enabled: !!query.trim(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useDebouncedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
