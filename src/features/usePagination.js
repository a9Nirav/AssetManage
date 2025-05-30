import { useState, useMemo } from "react";

const usePagination = (data = [], initialRowsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  

  const handleRowsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRowsPerPage(value || 1);
    setCurrentPage(1);
  };

  return {
    currentPage,
    rowsPerPage,
    setRowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    paginatedData,
    totalPages,
  };
};

export default usePagination;
