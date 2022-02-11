import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { useField } from "remix-validated-form";

export type FormTextareaProps = TextareaProps & {
  name: string;
  label?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
};

export const FormTextarea = (props: FormTextareaProps) => {
  const { name, label, isDisabled, isReadOnly, isRequired, ...rest } = props;
  const { validate, clearError, defaultValue, error } = useField(name);

  return (
    <FormControl
      id={name}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isInvalid={!!error}
    >
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Textarea
        {...rest}
        id={name}
        name={name}
        onBlur={validate}
        defaultValue={defaultValue}
        onChange={(e) => {
          clearError();
          props.onChange?.(e);
        }}
      />
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
