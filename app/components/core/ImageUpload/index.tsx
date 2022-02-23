import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  Image,
  IconButton,
  FormControl,
  InputProps,
  FormLabel,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useField } from "remix-validated-form";

export type ImageUploadProps = InputProps & {
  name: string;
  label?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
};

export const FileUpload: FC<ImageUploadProps> = (props) => {
  const { name, label, isDisabled, isReadOnly, isRequired, ...rest } = props;
  const { error, getInputProps } = useField(name);
  const [preview, setPreview] = useState("");

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setPreview(URL.createObjectURL(img));
    }
  };

  const { onChange, ...input } = getInputProps();

  return (
    <FormControl
      id={name}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isInvalid={!!error}
    >
      <Box w={250} h={200} pos="relative">
        <Box pos="absolute" right={0} p="2">
          <IconButton
            size="xs"
            aria-label="CloseIcon"
            icon={<CloseIcon />}
            colorScheme="red"
          />
        </Box>
        <Image
          src={preview}
          objectFit="cover"
          w={250}
          h={200}
          alt="image preview"
          fallbackSrc="/no-photo-available.png"
          rounded="base"
        />

        <FormLabel
          p="2"
          m={0}
          w="full"
          bottom={0}
          pos="absolute"
          htmlFor={name}
          textAlign="center"
          bg="rgba(0,0,0,0.5)"
          color="white"
          _hover={{ cursor: "pointer" }}
          zIndex="popover"
        >
          {label ?? "Select Image"}
        </FormLabel>
        <Input
          {...rest}
          {...input}
          display="none"
          type="file"
          onChange={(e) => {
            onImageChange(e);
            onChange(e);
          }}
        />
      </Box>
    </FormControl>
  );
};
