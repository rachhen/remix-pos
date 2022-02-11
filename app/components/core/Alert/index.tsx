import { CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  useColorModeValue,
  Box,
  chakra,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { FlashType, FlashStatus } from "~/types";
import { AlertIcon } from "./AlertIcon";

type ColorType = {
  [key in FlashStatus]: {
    light: string;
    dark: string;
  };
};
const colors: ColorType = {
  success: {
    light: "green.500",
    dark: "green.400",
  },
  info: {
    light: "blue.500",
    dark: "blue.400",
  },
  warning: {
    light: "yellow.400",
    dark: "yellow.300",
  },
  error: {
    light: "red.500",
    dark: "red.400",
  },
};

type AlertProps = FlashType & {
  onClose?: () => void;
};

const Alert = ({ status, message, onClose }: AlertProps) => {
  if (!status) {
    return null;
  }

  const color = colors[status];

  return (
    <Flex
      maxW="sm"
      w="full"
      bg={useColorModeValue("white", "gray.800")}
      shadow="md"
      rounded="lg"
      overflow="hidden"
    >
      <AlertIcon status={status} message={message} />

      <HStack w="full" justify="space-between" align="stretch">
        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <chakra.span
              color={useColorModeValue(color.light, color.dark)}
              fontWeight="bold"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </chakra.span>
            <chakra.p
              color={useColorModeValue("gray.600", "gray.200")}
              fontSize="sm"
            >
              {message}
            </chakra.p>
          </Box>
        </Box>
        <Box pr="1" pt="1">
          <IconButton
            size="xs"
            icon={<CloseIcon />}
            aria-label="toast close button"
            variant="ghost"
            onClick={onClose}
          />
        </Box>
      </HStack>
    </Flex>
  );
};

export default Alert;
