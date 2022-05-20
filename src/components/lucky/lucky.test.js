import { render, screen } from "@testing-library/react";
import Lucky from "./lucky";

describe("Testing that the 'Did you know?' component is rendered", () => {
  it("should display the Pikachu image, and two labels", () => {
    render(<Lucky />);

    // Labels
    expect(screen.getByText("Did you know?")).toBeInTheDocument();
    expect(
      screen.getByText("Pokémon means 'Pocket Monsters'")
    ).toBeInTheDocument();
    expect(screen.getByText("Pokémon means 'Pocket Monsters'")).toBeInstanceOf(
      HTMLHeadingElement
    );

    // Pikachu
    expect(screen.getByAltText("Pikachu")).toBeInTheDocument();
    expect(screen.getByAltText("Pikachu")).toBeVisible();
  });
});
