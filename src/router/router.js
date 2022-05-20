import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";

// Routes
import ErrorPage from "../routes/404/404";
import Detail from "../routes/detail/detail";
import Home from "../routes/home/home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
                  style={{ animation: "0.5s fadeIn", height: "100%" }}
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
