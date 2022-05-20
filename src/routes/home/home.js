import Recent from "../../components/recent/recent";
import Search from "../../components/search/search";
import Switch from "../../components/switch/switch";
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
        <div className="wrapper">
          <Search data-testid="searchBar" />
        </div>

        <div className="homeRecent">
          <Recent data-testid="recentSearches" />
        </div>
      </div>
    </div>
  );
}

export default Home;
