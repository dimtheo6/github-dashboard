import { useFetchSuggestions } from "../hooks/useFetchSuggestions";
import { useDebouncedValue } from "../hooks/useFetchSuggestions";

export default function Suggestions({ search, handleSearch }) {
  
  const debouncedSearch = useDebouncedValue(search, 300); //debounce timer
  const { data: suggestions } = useFetchSuggestions(debouncedSearch); //fetch suggestions

  return (
    <>
      {suggestions?.length > 0 && (
        <ul className="absolute top-16 border w-full max-w-xs shadow-md z-10">
          {suggestions?.map((user) => (
            <li
              key={user.id}
              className="flex items-center p-2 cursor-pointer bg-white dark:bg-card-background hover:bg-gray-200 dark:hover:bg-background gap-2"
              onClick={() => handleSearch(user.login)}
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-6 h-6 rounded-full"
              />
              {user.login}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
