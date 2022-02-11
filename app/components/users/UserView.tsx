import { Box, VStack, Avatar, Heading, Text } from "@chakra-ui/react";
import { UploadedFile, User } from "@prisma/client";
import { PageHeader } from "../core";

export type LoaderData = User & {
  avatar: UploadedFile | null;
};

type Props = {
  user: LoaderData;
  disabled?: boolean;
};

export function UserView({ user, disabled }: Props) {
  return (
    <Box>
      <PageHeader title="User" type="view" path="users" disabled={disabled} />
      <VStack align="stretch" mt="5" p="5" spacing="5">
        <Avatar
          src={user.avatar?.thumbnailUrl}
          name={user.fullName}
          size="2xl"
        />
        <Box>
          <Heading size="sm">Full Name</Heading>
          <Text>{user.fullName}</Text>
        </Box>
        <Box>
          <Heading size="sm">Username</Heading>
          <Text>{user.username}</Text>
        </Box>
        <Box>
          <Heading size="sm">Address</Heading>
          <Text>{user.address}</Text>
        </Box>
        <Box>
          <Heading size="sm">Contact</Heading>
          <Text>{user.contact}</Text>
        </Box>
      </VStack>
    </Box>
  );
}
