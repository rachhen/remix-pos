import { z } from "zod";
import { Box } from "@chakra-ui/react";
import { withZod } from "@remix-validated-form/with-zod";
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "remix";
import { validationError } from "remix-validated-form";
import { PageHeader } from "~/components/core";
import { UserForm, DataType } from "~/components/users/UserForm";
import { GenericCatchBoundary } from "~/components/core/boundaries";
import { updateUserValidator } from "~/validations/users";
import { parseParamId } from "~/utils/helpers.server";
import { getUser, updateUser } from "~/services/users";
import { uploadHandler } from "~/utils/upload.server";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data?.fullName ? `Edit - ${data?.fullName}` : "Not Found",
    description: "Edit user data",
  };
};

export const action: ActionFunction = async ({ params, request }) => {
  const id = parseParamId(params);
  const formData = await parseMultipartFormData(request, uploadHandler);
  const { data, error } = updateUserValidator.validate(formData);
  if (error) return validationError(error);

  return await updateUser(id, data!);
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseParamId(params);
  const user = await getUser(id);
  user.password = "";
  return json(user);
};

function UserEdit() {
  const data = useLoaderData<DataType>();

  return (
    <Box>
      <PageHeader title="User" type="edit" path="users" />
      <UserForm defaultValues={data} validator={updateUserValidator} />
    </Box>
  );
}

export default UserEdit;

export function CatchBoundary() {
  return <GenericCatchBoundary title="User" type="edit" path="users" />;
}
