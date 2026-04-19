import React from "react";
import { hydrateRoot } from "react-dom/client";
import Home from "./pages/home/Home.tsx";
import type { HomeProps } from "./types/pokemon.ts";

declare global {
  interface Window {
    __PAGE__: string;
    __INITIAL_DATA__: unknown;
  }
}

const pages: Record<string, React.ComponentType<any>> = {
  home: Home,
};

const Page = pages[window.__PAGE__];
const initialData = window.__INITIAL_DATA__;

hydrateRoot(
  document.getElementById("root")!,
  <Page {...(initialData as HomeProps)} />
);
