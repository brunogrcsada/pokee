import {
  render,
  screen,
  fireEvent,
  getByText,
  getByTestId,
  waitFor,
  renderHook,
} from "@testing-library/react";

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

describe("Test if key elements are added to the document", () => {
  it("should display the Pokemon logo and search bar", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Home />,
        </Router>
      </QueryClientProvider>
    );

    const { result } = waitFor(() =>
      renderHook(() => useCustomHook(), { wrapper })
    );
    // await waitFor(() => result.current.isSuccess);
    // expect(result.current.data).toEqual("Hello");

    expect(screen.getByTestId("themeSwitcher")).toBeInTheDocument();
    // fireEvent.click(screen.getByTestId("screen"));
    // expect(screen.getByTestId("screen").className).toBe("removed");
  });
});
