import { useState } from "react";
import { Stack, AspectRatio, Box, Image, Text } from "@chakra-ui/react";
import { FormProps, ValidatedForm } from "remix-validated-form";
import { FormInput, SubmitButton } from "../core";
import { UploadedFile, User } from "@prisma/client";

export type DataType = Partial<
  Omit<User, "id"> & {
    avatar: UploadedFile | null;
  }
>;

export function UserForm<T extends DataType>(props: FormProps<T>) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const url = props.defaultValues?.avatar?.thumbnailUrl
    ? props.defaultValues.avatar.thumbnailUrl
    : objectUrl;

  return (
    <ValidatedForm method="post" encType="multipart/form-data" {...props}>
      <Stack spacing="5">
        <FormInput name="fullName" label="Full Name" />
        <FormInput name="username" label="Username" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="contact" label="Contact" />
        <FormInput name="address" label="Address" />
        <Stack>
          <Text>Avatar</Text>
          {url && (
            <AspectRatio maxW="200px" ratio={4 / 3}>
              <Image src={url} alt="avatar" objectFit="cover" />
            </AspectRatio>
          )}
          <FormInput
            name="file"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                const objectUrl = URL.createObjectURL(files[0]);
                setObjectUrl(objectUrl);
              }
            }}
          />
        </Stack>
        <Box>
          <SubmitButton />
        </Box>
      </Stack>
    </ValidatedForm>
  );
}
