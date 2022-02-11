import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { Box } from "@chakra-ui/react";
import { validationError } from "remix-validated-form";
import { PageHeader } from "~/components/core/PageHeader";
import { GenericCatchBoundary } from "~/components/core/boundaries";
import { parseParamId } from "~/utils/helpers.server";
import { productValidator } from "~/validations/products";
import { getProduct, updateProduct } from "~/services/products";
import { ProductForm } from "~/components/products/ProductForm";
import { db } from "~/utils/db.server";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Edit - ${data.product.name}` : "Not Found",
    description: "Edit product data",
  };
};

export const action: ActionFunction = async ({ params, request }) => {
  const id = parseParamId(params);
  const formData = await request.formData();
  const { data, error } = await productValidator.validate(formData);
  if (error) return validationError(error);

  return await updateProduct(id, data!);
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseParamId(params);
  const [product, categories, units] = await Promise.all([
    getProduct(id),
    db.category.findMany(),
    db.unit.findMany(),
  ]);

  return json({ product, categories, units });
};

function ProductEdit() {
  const data = useLoaderData();

  return (
    <Box>
      <PageHeader title="Product" type="edit" path="products" />
      <ProductForm defaultValues={data.product} validator={productValidator} />
    </Box>
  );
}

export default ProductEdit;

export function CatchBoundary() {
  return <GenericCatchBoundary title="Product" type="edit" path="products" />;
}
