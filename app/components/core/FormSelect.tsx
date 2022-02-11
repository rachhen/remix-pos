import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { useField } from "remix-validated-form";

export type FormSelectProps = SelectProps & {
  name: string;
  label?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
};

export const FormSelect = (props: FormSelectProps) => {
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
      <Select {...input} {...getInputProps({ id: name })} />
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
