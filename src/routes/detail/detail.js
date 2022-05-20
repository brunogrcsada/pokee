// Hooks
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

// Components
import Search from "../../components/search/search";
import Switch from "../../components/switch/switch";
import Recent from "../../components/recent/recent";

// CSS
import "./detail.css";

// Fetches Pokémon information from backend
const fetchPokemon = async (pokemon) => {
  const res = await fetch(`http://localhost:2020/pokemon/${pokemon}`);
  return res.json();
};

function Detail() {
  const { pokemon } = useParams();

  const queryClient = useQueryClient();
  let navigate = useNavigate();

  // useQuery caches queries in local storage for 24 hours.
  const { isLoading, data, error } = useQuery(
    ["results", pokemon],
    () => fetchPokemon(pokemon),
    { staleTime: Infinity }
  );

  // Updates cached data with the latest page visit
  useEffect(() => {
    if (data && data.error == null) {
      let cached = data;
      cached.time = new Date().getTime();
      cached.description = cached.description.replace("POKéMON", "Pokémon");
      cached.description = cached.description.replace("pro­ tects", "protects");
      queryClient.setQueryData(["results", pokemon], data);
    }
  }, [data, pokemon, queryClient]);

  return (
    <div className="Detail">
      <div className="header">
        <input type="checkbox" id="searchControl" style={{ display: "none" }} />
        <img
          onClick={() => navigate(`/`)}
          className="logo"
          draggable="false"
          src="images/logo.svg"
          alt="Pokémon Logo"
        />

        <div className="right">
          <div className="detailSearch">
            <Search small={true} />
          </div>
          <Switch />
        </div>
      </div>

      <div className="middle">
        {isLoading ? (
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : data.error || error ? (
          <div className="error">
            <img src="images/sad.png" alt="Not Found" />
            <h3>Ooops! Pokémon not found!</h3>
          </div>
        ) : (
          <div className="body">
            <div className="description">
              <div
                className={`picture ${data.is_legendary ? "legend" : "normal"}`}
              >
                <img src={data.image} alt="Illustration"></img>
              </div>
              <div>
                <div className="pokeHeader">
                  <h1>
                    {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                  </h1>
                  {data.is_legendary && (
                    <div className="legendaryLabel">
                      <div className="material legendStar">stars</div>
                      <h3>Legendary</h3>
                    </div>
                  )}
                </div>

                <h3>{data.description}</h3>
              </div>
            </div>

            <div className="recentDetail">
              <Recent hideFirst={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
