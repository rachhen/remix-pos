import { Box } from "@chakra-ui/react";
import { validationError } from "remix-validated-form";
import { ActionFunction, MetaFunction } from "remix";
import { CustomerForm } from "~/components/customers/CustomerForm";
import { PageHeader } from "~/components/core/PageHeader";
import { customerValidator } from "~/validations/customers";
import { createCustomer } from "~/services/customers";

export const meta: MetaFunction = () => {
  return {
    title: "Create New Customer",
    description: "Create customer!",
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { data, error } = await customerValidator.validate(formData);
  if (error) return validationError(error);

  return await createCustomer(data!);
};

export default function UserCreate() {
  return (
    <Box>
      <PageHeader title="User" type="new" path="users" />
      <CustomerForm validator={customerValidator} />
    </Box>
  );
}
