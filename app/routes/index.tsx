import { Heading } from "@chakra-ui/react";
import { json, LoaderFunction } from "remix";
import { Layout } from "~/components/core";
import { requireUserId } from "~/utils/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  console.log("", userId);
  return json({});
};

export default function Index() {
  return (
    <Layout>
      <Heading>Dashboard</Heading>
    </Layout>
  );
}
