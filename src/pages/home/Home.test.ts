import { test, expect } from "bun:test";
import { getServerSideProps } from "./Home.tsx";

test("getServerSideProps retorna 12 pokémons com shape correto", async () => {
  const { props } = await getServerSideProps();

  expect(props.pokemons).toHaveLength(12);
  expect(typeof props.fetchedAt).toBe("string");
  expect(new Date(props.fetchedAt).toString()).not.toBe("Invalid Date");

  const first = props.pokemons[0]!;
  expect(typeof first.id).toBe("number");
  expect(typeof first.name).toBe("string");
  expect(typeof first.sprite).toBe("string");
  expect(Array.isArray(first.types)).toBe(true);
  expect(first.types.length).toBeGreaterThan(0);
}, 20000);
