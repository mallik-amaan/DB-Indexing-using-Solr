import { useState } from "react";
import axios from "axios";
import SearchResults from "./components/SearchResults";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchSolr = async () => {
    try {
      const response = await axios.get(
        `/solr/products/select?q=category:${query}&wt=json`
      );
      console.log("Solr Response:", response.data);

      const docs = response.data.response?.docs;
      if (docs) {
        setResults(docs);
      } else {
        console.error("No documents found in the response.");
      }
    } catch (error) {
      console.error("Error querying Solr:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-red-50">
      <h1 className="text-2xl font-bold mb-6">Solr Search UI</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={searchSolr}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <SearchResults results={results} />
    </div>
  );
}

export default App;
