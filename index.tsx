import React from "react";

export default function Index({
  children,
  initialData,
  pageName,
}: {
  children: React.ReactNode;
  initialData: unknown;
  pageName: string;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SSR Demo</title>
        <link rel="stylesheet" href="/styles.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PAGE__=${JSON.stringify(pageName)};window.__INITIAL_DATA__=${JSON.stringify(initialData)}`,
          }}
        />
        <script src="/index.js" defer />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
