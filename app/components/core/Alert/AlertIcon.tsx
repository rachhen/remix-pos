import { Icon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { BsLightningFill } from "react-icons/bs";
import { IoMdCheckmarkCircle, IoMdAlert } from "react-icons/io";
import { FlashType } from "~/types";

export const AlertIcon = ({ status }: FlashType) => {
  if (status === "success") {
    return (
      <Flex justifyContent="center" alignItems="center" w={12} bg="green.500">
        <Icon as={IoMdCheckmarkCircle} color="white" boxSize={6} />
      </Flex>
    );
  }

  if (status === "info") {
    <Flex justifyContent="center" alignItems="center" w={12} bg="blue.500">
      <Icon as={IoMdAlert} color="white" boxSize={6} />
    </Flex>;
  }

  if (status === "warning") {
    return (
      <Flex justifyContent="center" alignItems="center" w={12} bg="yellow.500">
        <Icon as={IoMdAlert} color="white" boxSize={6} />
      </Flex>
    );
  }

  if (status === "error") {
    return (
      <Flex justifyContent="center" alignItems="center" w={12} bg="red.500">
        <Icon as={BsLightningFill} color="white" boxSize={6} />
      </Flex>
    );
  }

  return null;
};
