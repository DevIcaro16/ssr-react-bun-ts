export interface PokemonData {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

export interface HomeProps {
  pokemons: PokemonData[];
  fetchedAt: string;
}
