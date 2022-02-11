import { Stack } from "@chakra-ui/react";
import { FormProps, ValidatedForm } from "remix-validated-form";
import { FormInput, SubmitButton } from "../core";

export function CategoryForm<T extends any>(props: FormProps<T>) {
  return (
    <ValidatedForm method="post" {...props}>
      <Stack spacing="5">
        <FormInput name="name" label="Name" />
        <SubmitButton />
      </Stack>
    </ValidatedForm>
  );
}
