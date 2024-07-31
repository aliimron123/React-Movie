import { CardContent, InputSearch } from "../components";
import { GetDataMovie } from "../utils/api";
import { MovieBody, MovieResponses } from "../utils/data.types";
import { Pagination } from "antd";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieBody[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selected, SelectedType] = useState<string | null>();
  const [type, setType] = useState<string | null>();

  // get data from omdb
  const fetchData = async (title: string, page: number) => {
    setLoading(true);
    try {
      const response: MovieResponses = await GetDataMovie(title, page);
      if (response.Response === "True") {
        setMovies(response.Search);
        setTotalPages(Math.ceil(parseInt(response.totalResult) / 10));
      } else {
        setMovies([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch movie data:", error);
      setMovies([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // hit api when keyword is entered
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(query, 1);
    setCurrentPage(1);
  };
  console.log("ini type", type);

  // pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(query, page);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 py-4">
      <div className="my-2 mb-5 flex w-full flex-row justify-between rounded-t-md bg-white p-5">
        <InputSearch
          OnSubmit={handleSubmit}
          query={query}
          setQuery={(e) => setQuery(e.target.value)}
        />
      </div>
      <CardContent data={movies} loading={loading} />
      <div className="my-8 flex justify-end bg-white p-4">
        <Pagination
          defaultCurrent={currentPage}
          defaultPageSize={1}
          total={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
