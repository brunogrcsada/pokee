import { screen, waitFor, renderHook } from "@testing-library/react";

import Home from "./home";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

export function useCustomHook() {
  return useQuery("customHook", () => "Hello");
}

describe("Test if all elements are added to the document", () => {
  it("should display the Pokemon logo, search bar and 'Did you know?'", async () => {
    const wrapper = () => (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Home />,
        </Router>
      </QueryClientProvider>
    );

    waitFor(() => renderHook(() => useCustomHook(), { wrapper }));

    expect(screen.getByTestId("themeSwitcher")).toBeInTheDocument();
    expect(screen.getByTestId("centerContainer")).toBeInTheDocument();
    expect(screen.getByTestId("searchBar")).toBeInTheDocument();
    expect(screen.getByTestId("recentSearches")).toBeInTheDocument();
    expect(screen.getByText("Did you know?")).toBeInTheDocument();
    expect(screen.getByAltText("Pokémon Logo")).toBeInTheDocument();
  });
});
