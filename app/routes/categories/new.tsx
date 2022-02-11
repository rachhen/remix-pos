import { Box } from "@chakra-ui/react";
import { ActionFunction } from "remix";
import { validationError } from "remix-validated-form";
import { CategoryForm } from "~/components/categories/CategoryForm";
import { PageHeader } from "~/components/core/PageHeader";
import { createCategory } from "~/services/categories";
import { categoryValidator } from "~/validations/categories";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { data, error } = await categoryValidator.validate(formData);
  if (error) return validationError(error);

  return createCategory(data!);
};

function CategoryCreate() {
  return (
    <Box>
      <PageHeader title="Category" type="new" path="categories" />
      <CategoryForm validator={categoryValidator} />
    </Box>
  );
}

export default CategoryCreate;
