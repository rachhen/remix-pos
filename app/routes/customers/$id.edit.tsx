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
import { customerValidator } from "~/validations/customers";
import { GetCustomer, getCustomer, updateCustomer } from "~/services/customers";
import { CustomerForm } from "~/components/customers/CustomerForm";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Edit - ${data.name}` : "Not Found",
    description: "Edit Customer data",
  };
};

export const action: ActionFunction = async ({ params, request }) => {
  const id = parseParamId(params);
  const formData = await request.formData();
  const { data, error } = customerValidator.validate(formData);
  if (error) return validationError(error);

  return await updateCustomer(id, data!);
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseParamId(params);
  const customer = await getCustomer(id);
  return json(customer);
};

function CustomerEdit() {
  const data = useLoaderData<GetCustomer>();

  return (
    <Box>
      <PageHeader title="Customer" type="edit" path="customers" />
      <CustomerForm defaultValues={data} validator={customerValidator} />
    </Box>
  );
}

export default CustomerEdit;

export function CatchBoundary() {
  return <GenericCatchBoundary title="Customer" type="edit" path="customers" />;
}
