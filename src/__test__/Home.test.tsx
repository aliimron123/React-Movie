import { CardContent, InputSearch } from "../components";
import Home from "../page/Home";
import { GetDataMovie } from "../utils/api";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Pagination } from "antd";
import React from "react";

// Mock the GetDataMovie function
jest.mock("../utils/api", () => ({
  GetDataMovie: jest.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders initial state", () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/enter title of movie/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome to movie finder/i)).toBeInTheDocument();
  });

  test("calls fetchData on form submission", async () => {
    const mockFetchData = jest.fn();
    (GetDataMovie as jest.Mock).mockImplementation(mockFetchData);

    render(<Home />);

    fireEvent.change(screen.getByPlaceholderText(/enter title of movie/i), {
      target: { value: "Inception" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith("Inception", 1);
    });
  });

  test("updates movies on successful API response", async () => {
    const mockMovies = [
      { imdbID: "1", Title: "Movie 1", Year: "2021", Poster: "poster1.jpg" },
      { imdbID: "2", Title: "Movie 2", Year: "2022", Poster: "poster2.jpg" },
    ];

    (GetDataMovie as jest.Mock).mockResolvedValue({
      Response: "True",
      Search: mockMovies,
      totalResult: "20",
    });

    render(<Home />);

    fireEvent.change(screen.getByPlaceholderText(/enter title of movie/i), {
      target: { value: "Inception" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Movie 2")).toBeInTheDocument();
    });
  });

  test("handles pagination", async () => {
    (GetDataMovie as jest.Mock).mockResolvedValue({
      Response: "True",
      Search: [{ imdbID: "1", Title: "Movie 1", Year: "2021", Poster: "poster1.jpg" }],
      totalResult: "20",
    });

    render(<Home />);

    fireEvent.change(screen.getByPlaceholderText(/enter title of movie/i), {
      target: { value: "Inception" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /next/i }));

      expect(GetDataMovie).toHaveBeenCalledWith("Inception", 2);
    });
  });
});
