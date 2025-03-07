import { useState } from "react";

const useSearch = (data) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((el) =>
    Object.values(el)
      ?.join(", ") // Convert all object values to a single string
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) // Check if searchQuery is present
  );

  return { searchQuery, setSearchQuery, filteredData };
};

export default useSearch;
