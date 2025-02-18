import { useEffect, useState } from "react";
import "./index.css";
import Header from "./components/Header";
import { useFetchUser } from "./hooks/useFetchUser";
import { Outlet,useParams } from "react-router-dom";



function App() {
  const [query, setQuery] = useState("");
  const { data: userData, isLoading: loading, error } = useFetchUser(query);
  let params = useParams();



  useEffect(() => {
    const lastUser = params.username;

    setQuery(lastUser); // Restore last searched user on refresh
  }, [params]);

  return (

      <div className="flex flex-col">
        <Header setQuery={setQuery} />
        <Outlet context={{ userData, loading, error }} />
      </div>
  );
}

export default App;
