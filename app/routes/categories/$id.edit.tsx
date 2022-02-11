import {
  json,
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { Box } from "@chakra-ui/react";
import { Category } from "@prisma/client";
import { validationError } from "remix-validated-form";
import { PageHeader } from "~/components/core/PageHeader";
import { GenericCatchBoundary } from "~/components/core/boundaries";
import { parseParamId } from "~/utils/helpers.server";
import { CategoryForm } from "~/components/categories/CategoryForm";
import { getCategory, updateCategory } from "~/services/categories";
import { categoryValidator } from "~/validations/categories";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Edit - ${data.name}` : "Not Found",
    description: "Edit Category data",
  };
};

export const action: ActionFunction = async ({ params, request }) => {
  const id = parseParamId(params);
  const formData = await request.formData();
  const { data, error } = categoryValidator.validate(formData);
  if (error) return validationError(error);

  return await updateCategory(id, data!);
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseParamId(params);
  const category = await getCategory(id);
  return json(category);
};

function CategoryEdit() {
  const data = useLoaderData<Category>();

  return (
    <Box>
      <PageHeader title="Category" type="edit" path="categories" />
      <CategoryForm defaultValues={data} validator={categoryValidator} />
    </Box>
  );
}

export default CategoryEdit;

export function CatchBoundary() {
  return (
    <GenericCatchBoundary title="Category" type="edit" path="categories" />
  );
}
