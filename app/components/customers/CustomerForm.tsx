import { Stack } from "@chakra-ui/react";
import { FormProps, ValidatedForm } from "remix-validated-form";
import { FormInput, SubmitButton } from "../core";

export function CustomerForm<T extends any>(props: FormProps<T>) {
  return (
    <ValidatedForm method="post" {...props}>
      <Stack spacing="5">
        <FormInput name="code" label="Code" />
        <FormInput name="name" label="Name" />
        <FormInput name="contact" label="Contact" />
        <FormInput name="address" label="Address" />
        <SubmitButton />
      </Stack>
    </ValidatedForm>
  );
}
