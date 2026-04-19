import React from "react";
import type { PokemonData } from "../../types/pokemon";

export default function PokemonCard({ name, sprite, types }: PokemonData) {
  const [favorited, setFavorited] = React.useState(false);

  return (
    <div className={`pokemon-card${favorited ? " pokemon-card--favorited" : ""}`}>
      <button
        className="pokemon-card__favorite"
        onClick={() => setFavorited((f) => !f)}
        aria-label={favorited ? "Desfavoritar" : "Favoritar"}
      >
        {favorited ? "❤️" : "🤍"}
      </button>
      <img src={sprite} alt={name} className="pokemon-card__sprite" />
      <h3 className="pokemon-card__name">{name}</h3>
      <div className="pokemon-card__types">
        {types.map((type) => (
          <span key={type} className={`pokemon-card__type pokemon-card__type--${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
