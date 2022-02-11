import { useCatch } from "remix";
import { Box, Heading } from "@chakra-ui/react";
import { PageHeader, PageHeaderProps } from "../PageHeader";

export function GenericCatchBoundary(props: PageHeaderProps) {
  const caught = useCatch();
  let message = caught.statusText;
  if (typeof caught.data === "string") {
    message = caught.data;
  }

  return (
    <Box>
      <PageHeader disabled {...props} />
      <Heading as="h3" size="md" textAlign="center" pt="5">
        {caught.status} {message}
      </Heading>
    </Box>
  );
}
