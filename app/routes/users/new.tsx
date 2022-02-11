import { Box } from "@chakra-ui/react";
import { validationError } from "remix-validated-form";
import {
  ActionFunction,
  MetaFunction,
  unstable_parseMultipartFormData as parseMultipartFormData,
  useTransition,
} from "remix";
import { uploadHandler } from "~/utils/upload.server";
import { PageHeader } from "~/components/core/PageHeader";
import { UserForm } from "~/components/users/UserForm";
import { UserView } from "~/components/users/UserView";
import { createUserValidator } from "~/validations/users";
import { createUser } from "~/services/users";

export const meta: MetaFunction = () => {
  return {
    title: "Create New User",
    description: "Create user!",
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await parseMultipartFormData(request, uploadHandler);
  const { data, error } = await createUserValidator.validate(formData);
  if (error) return validationError(error);

  return await createUser(data!);
};

export default function UserCreate() {
  const transition = useTransition();

  return (
    <>
      {transition.submission ? (
        <UserView
          user={Object.fromEntries(transition.submission.formData) as any}
          disabled
        />
      ) : null}
      <Box display={transition.submission ? "none" : ""}>
        <PageHeader title="User" type="new" path="users" />
        <UserForm validator={createUserValidator} />
      </Box>
    </>
  );
}
