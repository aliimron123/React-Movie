import { MovieResponses } from "./data.types";

export const GetDataMovie = async (title: string, page: number): Promise<MovieResponses> => {
  const response = await fetch(`http://www.omdbapi.com/?apikey=a0f804f9&s=${title}&page=${page}`);
  const data = await response.json();

  // Ensure that data has the correct structure
  if (data && data.Search) {
    return {
      Response: data.Response,
      totalResult: data.totalResults,
      Search: data.Search,
    };
  }

  return {
    Response: "False",
    totalResult: "0",
    Search: [],
  };
};
