import React from "react";
import type { HomeProps, PokemonData } from "../../types/pokemon";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  const listRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
  const list = (await listRes.json()) as { results: { url: string }[] };

  const pokemons: PokemonData[] = await Promise.all(
    list.results.map(async ({ url }) => {
      const res = await fetch(url);
      const data = (await res.json()) as {
        id: number;
        name: string;
        sprites: { front_default: string };
        types: { type: { name: string } }[];
      };
      return {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
      };
    })
  );

  return {
    props: {
      pokemons,
      fetchedAt: new Date().toISOString(),
    },
  };
}

const PAGE_SIZE = 12;

export default function Home({ pokemons, fetchedAt }: HomeProps) {
  const [sortAlpha, setSortAlpha] = React.useState(false);
  const [page, setPage] = React.useState(0);

  const sorted = sortAlpha
    ? [...pokemons].sort((a, b) => a.name.localeCompare(b.name))
    : pokemons;

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function handleSort() {
    setSortAlpha((s) => !s);
    setPage(0);
  }

  return (
    <main className="home">
      <header className="home__header">
        <h1 className="home__title">Pokémon SSR Demo</h1>
        <p className="home__meta">
          Renderizado no servidor em{" "}
          <span className="home__meta-value">{fetchedAt}</span>
        </p>
      </header>
      <div className="home__controls">
        <button className="home__sort-btn" onClick={handleSort}>
          {sortAlpha ? "Ordenar por ID" : "Ordenar A→Z"}
        </button>
      </div>
      <div className="home__grid">
        {paginated.map((pokemon) => (
          <PokemonCard key={pokemon.id} {...pokemon} />
        ))}
      </div>
      <div className="home__pagination">
        <button
          className="home__page-btn"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
        >
          ← Anterior
        </button>
        <span className="home__page-info">
          {page + 1} / {totalPages}
        </span>
        <button
          className="home__page-btn"
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages - 1}
        >
          Próxima →
        </button>
      </div>
    </main>
  );
}
