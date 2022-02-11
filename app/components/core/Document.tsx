import { ChakraProvider, theme } from "@chakra-ui/react";
import { Meta, Links, ScrollRestoration, Scripts, LiveReload } from "remix";

type DocumentProps = {
  title?: string;
  children: React.ReactNode;
};

export function Document({ title, children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {!!title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
