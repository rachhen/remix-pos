import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { setFlash } from "~/utils/sessions.server";
import { parseParamId } from "~/utils/helpers.server";
import { GenericCatchBoundary } from "~/components/core/boundaries";
import { PageHeader } from "~/components/core/PageHeader";
import {
  deleteCustomerById,
  GetCustomer,
  getCustomer,
} from "~/services/customers";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? "View - " + data.name : "Not Found",
    description: "View customer data",
  };
};

export const action: ActionFunction = async ({ params, request }) => {
  if (request.method === "DELETE") {
    const id = parseParamId(params);
    const customer = await deleteCustomerById(id);

    return setFlash(request, {
      status: "success",
      message: `Customer "${customer.name}" deleted!`,
      redirectTo: "/customers",
    });
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseParamId(params);
  const customer = await getCustomer(id);

  return json(customer);
};

function CustomerShow() {
  const data = useLoaderData<GetCustomer>();

  return (
    <Box>
      <PageHeader title="Customer" type="view" path="customers" />
      <VStack align="stretch" mt="5" spacing="5">
        <Box>
          <Heading size="sm">Code</Heading>
          <Text>{data.code}</Text>
        </Box>
        <Box>
          <Heading size="sm">Name</Heading>
          <Text>{data.name}</Text>
        </Box>
        <Box>
          <Heading size="sm">Contact</Heading>
          <Text>{data.contact}</Text>
        </Box>
        <Box>
          <Heading size="sm">Address</Heading>
          <Text>{data.address}</Text>
        </Box>
      </VStack>
    </Box>
  );
}

export default CustomerShow;

export function CatchBoundary() {
  return <GenericCatchBoundary title="User" type="view" path="users" />;
}
