import React from "react";
import { renderToString } from "react-dom/server";
import Index from "./index.tsx";

function pathnameToPageName(pathname: string): string {
  if (pathname === "/") return "home";
  return pathname.replace(/^\//, "").split("/")[0]!;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

Bun.serve({
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/index.js") {
      const output = await Bun.build({ entrypoints: ["./src/BrowserEntry.tsx"] });
      return new Response(await output.outputs[0]?.text(), {
        headers: { "Content-Type": "application/javascript;charset=utf-8" },
      });
    }

    if (url.pathname === "/styles.css") {
      const output = await Bun.build({ entrypoints: ["./index.css"] });
      return new Response(await output.outputs[0]?.text(), {
        headers: { "Content-Type": "text/css;charset=utf-8" },
      });
    }

    const pageName = pathnameToPageName(url.pathname);

    try {
      const mod = await import(`./src/pages/${pageName}/${capitalize(pageName)}.tsx`);
      const Component = mod.default as React.ComponentType<any>;
      const props = mod.getServerSideProps
        ? (await mod.getServerSideProps()).props
        : {};

      const html = renderToString(
        <Index initialData={props} pageName={pageName}>
          <Component {...props} />
        </Index>
      );

      return new Response(`<!DOCTYPE html>${html}`, {
        headers: { "Content-Type": "text/html;charset=utf-8" },
      });
    } catch {
      return new Response("Not found", { status: 404 });
    }
  },
  port: Number(process.env.PORT) || 3001,
  hostname: "0.0.0.0",
});
