import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Recent from "./recent";

describe("Testing that the search component renders correctly", () => {
  it("should render 'Did you know?' element, without any cards", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1000 * 60 * 60 * 24,
        },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Recent />,
        </Router>
      </QueryClientProvider>
    );

    expect(screen.getByAltText("Pikachu")).toBeInTheDocument;
    expect(screen.getByText("Did you know?")).toBeInTheDocument;
    expect(screen.queryByAltText("pokeImage")).not.toBeInTheDocument;
    expect(screen.queryByText("Recent Searches")).not.toBeInTheDocument;
    expect(screen.queryByAltText("history")).not.toBeInTheDocument;
  });
});
