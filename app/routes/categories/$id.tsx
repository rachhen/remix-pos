import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { setFlash } from "~/utils/sessions.server";
import { parseParamId } from "~/utils/helpers.server";
import { GenericCatchBoundary } from "~/components/core/boundaries";
import { deleteCategoryById, getCategory } from "~/services/categories";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { PageHeader } from "~/components/core/PageHeader";
import { Category } from "@prisma/client";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? "View - " + data.name : "Not Found",
    description: "View category",
  };
};

export const action: ActionFunction = async ({ params, request }) => {
  if (request.method === "DELETE") {
    const id = parseParamId(params);
    const category = await deleteCategoryById(id);

    return setFlash(request, {
      status: "success",
      message: `Category "${category.name}" deleted!`,
      redirectTo: "/categories",
    });
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseParamId(params);
  const category = await getCategory(id);

  return json(category);
};

function CategoryShow() {
  const data = useLoaderData<Category>();

  return (
    <Box>
      <PageHeader title="Category" type="view" path="categories" />
      <VStack align="stretch" mt="5" p="5" spacing="5">
        <Box>
          <Heading size="sm">Name</Heading>
          <Text>{data.name}</Text>
        </Box>
      </VStack>
    </Box>
  );
}

export default CategoryShow;

export function CatchBoundary() {
  return (
    <GenericCatchBoundary title="Category" type="view" path="categories" />
  );
}
