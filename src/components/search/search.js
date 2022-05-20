import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import styling for this page
import "./search.css";

function Search(props) {
  const search = useRef(null);
  let navigate = useNavigate();

  const random = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Gengar",
    "Snorlax",
    "Ninetales",
    "Dragonite",
    "Eevee",
    "Arcanine",
  ];

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/${search.current.value.toLowerCase()}`);
    }
  };

  const getRandom = () => {
    navigate(
      `/${random[Math.floor(Math.random() * random.length)].toLowerCase()}`
    );
  };

  return (
    <div className={`searchWrap ${props.small ? null : "default"}`}>
      <label htmlFor="searchControl" id="searchIcon" className="material">
        search
      </label>

      <input
        ref={search}
        type="search"
        id="search"
        placeholder="Find a Pokémon..."
        onKeyDown={handleKeyDown}
      />
      <img
        onClick={getRandom}
        className="pokeball"
        src="/favicon/favicon-32x32.png"
        alt="random"
      />
    </div>
  );
}

export default Search;
