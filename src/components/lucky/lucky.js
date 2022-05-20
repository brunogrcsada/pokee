// Import styling for this page
import "./lucky.css";

function Lucky() {
  return (
    <div className="luckyWrap">
      <div className="lucky">
        <img draggable="false" src="images/pikachu.svg" alt="Pikachu" />
        <h3>Did you know?</h3>
      </div>

      <h4>Pokémon means 'Pocket Monsters'</h4>
    </div>
  );
}

export default Lucky;
