import { useEffect, useState } from "react";
import "./index.css";
import Header from "./components/Header";
import { useFetchUser } from "./hooks/useFetchUser";
import { Outlet } from "react-router-dom";



function App() {
  const [query, setQuery] = useState("");
  const { data: userData, isLoading: loading, error } = useFetchUser(query);

  useEffect(() => {
    const lastUser = localStorage.getItem("lastUser");

    setQuery(lastUser); // Restore last searched user on refresh
  }, []);

  return (

      <div className="flex flex-col">
        <Header setQuery={setQuery} />
        <Outlet context={{ userData, loading, error }} />
      </div>
  );
}

export default App;
