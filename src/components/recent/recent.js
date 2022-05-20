import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

// Import styling for this page
import "./recent.css";
import Lucky from "../lucky/lucky";

function Recent(props) {
  let navigate = useNavigate();

  const queryClient = useQueryClient();
  const query = queryClient.getQueryCache();
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
                (value) => value.state.data && value.state.data.error == null
              )
              .sort((a, b) => b.state.dataUpdatedAt - a.state.dataUpdatedAt)
              .slice(props.hideFirst ? 1 : 0, props.hideFirst ? 6 : 5)
              .map((value, i) =>
                value.state.data != null &&
                value.state.data.error == null &&
                value.state.data.name != null ? (
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
                ) : null
              )}
          </div>
        </div>
      ) : (
        <div>
          <hr className="rounded" />
          <Lucky />
        </div>
      )}
    </div>
  );
}

export default Recent;
