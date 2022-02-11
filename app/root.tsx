import { Outlet, useCatch } from "remix";
import { Heading } from "@chakra-ui/react";
import { Layout, Document } from "./components/core";
import { GenericErrorBoundary } from "./components/core/boundaries";

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <GenericErrorBoundary />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <Heading as="h1">
          {caught.status} {caught.statusText}
        </Heading>
      </Layout>
    </Document>
  );
}
