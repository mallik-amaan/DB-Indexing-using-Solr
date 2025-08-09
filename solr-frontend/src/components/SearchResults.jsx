const SearchResults = ({ results }) => {
    return (
      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-2xl">
          {results.length === 0 ? (
            <p className="text-center">No results found.</p>
          ) : (
            <ul className="space-y-2">
              {results.map((doc) => (
                <li key={doc.id} className="border p-4 rounded">
                  <h2 className="text-lg font-semibold">{doc.name}</h2>
                  <p>{doc.description}</p>
                  <p className="text-sm text-gray-600">Category: {doc.category}</p>
                  <p className="text-sm text-gray-800">Price: ${doc.price}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };
  
  export default SearchResults;
  