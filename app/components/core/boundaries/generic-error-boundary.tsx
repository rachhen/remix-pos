import { Heading } from "@chakra-ui/react";
import { Layout } from "../layout";

export function GenericErrorBoundary() {
  return (
    <Layout>
      <Heading as="h4" size="md" pt="5">
        An unknown error occured.
      </Heading>
    </Layout>
  );
}
