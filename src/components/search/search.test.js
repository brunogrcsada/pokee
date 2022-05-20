import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Search from "./search";

describe("Testing that the search component renders correctly", () => {
  it("should render all elements", () => {
    render(
      <Router>
        <Search />,
      </Router>
    );

    // Search button
    expect(screen.getByText(/search/i)).toBeInTheDocument();

    // Input with placeholder
    expect(
      screen.getByPlaceholderText(/Find a Pokémon.../i)
    ).toBeInTheDocument();

    // Pokeball
    expect(screen.getByAltText(/random/i)).toBeInTheDocument();
  });
});
