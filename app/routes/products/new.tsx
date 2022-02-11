import { Box } from "@chakra-ui/react";
import { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { validationError } from "remix-validated-form";
import { PageHeader } from "~/components/core/PageHeader";
import { ProductForm } from "~/components/products/ProductForm";
import { createProduct } from "~/services/products";
import { db } from "~/utils/db.server";
import { getUserId } from "~/utils/sessions.server";
import { productValidator } from "~/validations/products";

export const meta: MetaFunction = () => {
  return {
    title: "Create Product",
    description: "Create prorduct ",
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserId(request);
  const formData = await request.formData();
  const { data, error } = await productValidator.validate(formData);
  if (error) return validationError(error);

  return await createProduct(userId!, data!);
};

export const loader: LoaderFunction = async () => {
  const categories = await db.category.findMany();
  const units = await db.unit.findMany();
  return { categories, units };
};

function ProductCreate() {
  return (
    <Box>
      <PageHeader title="Product" type="new" path="products" />
      <ProductForm
        defaultValues={{
          code: "2131",
          name: "Woufu",
          categoryId: 1,
          reorderLevel: 1,
          unitId: 1,
          unitInStock: 12,
          unitPrice: 12,
          discountPercentage: 0,
          description: "The description",
        }}
        validator={productValidator}
      />
    </Box>
  );
}

export default ProductCreate;
