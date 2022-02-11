import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { useField } from "remix-validated-form";

export type FormInputProps = InputProps & {
  name: string;
  label?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
};

export const FormInput = (props: FormInputProps) => {
  const { name, label, isDisabled, isReadOnly, isRequired, ...input } = props;
  const { error, getInputProps } = useField(name);

  return (
    <FormControl
      id={name}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isInvalid={!!error}
    >
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input {...input} {...getInputProps({ id: name })} />
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
