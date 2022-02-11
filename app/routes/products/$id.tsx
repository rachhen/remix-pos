import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { setFlash } from "~/utils/sessions.server";
import { parseParamId } from "~/utils/helpers.server";
import { GenericCatchBoundary } from "~/components/core/boundaries";
import { deleteProductById, GetProduct, getProduct } from "~/services/products";
import { PageHeader } from "~/components/core";
import dayjs from "dayjs";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? "View - " + data.name : "Not Found",
    description: "View product data",
  };
};

export const action: ActionFunction = async ({ params, request }) => {
  if (request.method === "DELETE") {
    const id = parseParamId(params);
    const user = await deleteProductById(id);

    return setFlash(request, {
      status: "success",
      message: `Product "${user.name}" deleted!`,
      redirectTo: "/products",
    });
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseParamId(params);
  const product = await getProduct(id);

  return json(product);
};

function ProductShow() {
  const data = useLoaderData<GetProduct>();

  return (
    <Box>
      <PageHeader title="Product" type="view" path="products" />
      <VStack align="stretch" mt="5" p="5" spacing="5">
        <Box>
          <Heading size="sm">Code</Heading>
          <Text>{data.code}</Text>
        </Box>
        <Box>
          <Heading size="sm">Name</Heading>
          <Text>{data.name}</Text>
        </Box>
        <Box>
          <Heading size="sm">Category</Heading>
          <Text>{data.category.name}</Text>
        </Box>
        <Box>
          <Heading size="sm">Unit</Heading>
          <Text>{data.unit.name}</Text>
        </Box>
        <Box>
          <Heading size="sm">Unit In Stock</Heading>
          <Text>{data.unitInStock}</Text>
        </Box>
        <Box>
          <Heading size="sm">Unit Price</Heading>
          <Text>{data.unitPrice}</Text>
        </Box>
        <Box>
          <Heading size="sm">Discount Percentage</Heading>y
          <Text>{data.discountPercentage}</Text>
        </Box>
        <Box>
          <Heading size="sm">Created By</Heading>
          <Text>{data.user.fullName}</Text>
        </Box>
        <Box>
          <Heading size="sm">Created At</Heading>
          <Text>{dayjs(data.createdAt).format("DD/MMM/YYYY")}</Text>
        </Box>
        <Box>
          <Heading size="sm">Description</Heading>
          <Text>{data.description}</Text>
        </Box>
      </VStack>
    </Box>
  );
}

export default ProductShow;

export function CatchBoundary() {
  return <GenericCatchBoundary title="User" type="view" path="users" />;
}
