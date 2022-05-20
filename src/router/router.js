import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";

// Routes
import ErrorPage from "../routes/404/404";
import Detail from "../routes/detail/detail";
import Home from "../routes/home/home";

/* React Query is a data-fetching library which contains a series
of useful tools and hooks that help with fetching, caching and
synchronizing data in React. Through React Query's persistent client
and web storage persistor, data is easily fetched from the
Rust backend, and cached locally, for 24 hours (or even longer).
As a result, no manual intervention between fetching data 
and storing it locally needs to be introduced, React Query
handles every step of querying and caching. */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cached in local storage for 24 hours
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

// Define different routes and the respective components
const routes = [
  { path: "/", Component: Home },
  { path: "/:pokemon", Component: Detail },
  { path: "*", Component: ErrorPage },
];

function ReactRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {routes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <div
                  key={path}
                  style={{ animation: "0.5s fadeIn", height: "100%" }} // Creates 'fading' effect on page load.
                >
                  <Component />
                </div>
              }
              exact
            />
          ))}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default ReactRouter;
