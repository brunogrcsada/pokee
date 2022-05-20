import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

// Import styling for this page
import "./recent.css";
import Lucky from "../lucky/lucky";

function Recent(props) {
  let navigate = useNavigate();

  // Create useQuery client instance
  const queryClient = useQueryClient();

  // Get cached search values
  const query = queryClient.getQueryCache();

  // Obtain values from searches
  const values = Object.values(query.queriesMap);

  return (
    <div className="Recent">
      {values.length > (props.hideFirst ? 1 : 0) ? (
        <div className="Results">
          <div className="searchHeader">
            <div className="material">history</div>
            <h3>Recent Searches</h3>
          </div>

          <div className="cardContainer">
            {values
              .filter(
                // Only return searches with data and without errors
                (value) =>
                  value.state.data &&
                  value.state.data.error == null &&
                  value.state.data.name
              )
              // Sort by the most recently accessed searches
              .sort((a, b) => b.state.dataUpdatedAt - a.state.dataUpdatedAt)
              // Prevents the current search from being displayed on the Details page
              .slice(props.hideFirst ? 1 : 0, props.hideFirst ? 6 : 5)
              .map((value, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/${value.state.data.name}`)}
                  className={`card ${
                    value.state.data.is_legendary && "legendary"
                  }`}
                >
                  {value.state.data.is_legendary && (
                    <div className="material star">stars</div>
                  )}

                  <img
                    className="pokeImage"
                    alt="illustration"
                    src={value.state.data.image}
                  />
                  <h4 className="label">
                    {value.state.data.name.charAt(0).toUpperCase() +
                      value.state.data.name.slice(1)}
                  </h4>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>
          {props.hideFirst ? (
            <hr className="rounded" />
          ) : (
            <div style={{ marginTop: "40px" }}></div>
          )}
          <Lucky />
        </div>
      )}
    </div>
  );
}

export default Recent;
