// Components
import Recent from "../../components/recent/recent";
import Search from "../../components/search/search";
import Switch from "../../components/switch/switch";

// CSS
import "./home.css";

function Home() {
  return (
    <div className="Home">
      <div className="switchWrap">
        <Switch />
      </div>
      <div className="center" data-testid="centerContainer">
        <img
          className="homeLogo"
          draggable="false"
          src="images/logo.svg"
          alt="Pokémon Logo"
        />
        <div className="wrapper" data-testid="searchBar">
          <Search />
        </div>

        <div className="homeRecent" data-testid="recentSearches">
          <Recent />
        </div>
      </div>
    </div>
  );
}

export default Home;
