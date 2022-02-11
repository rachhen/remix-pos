import { ChevronDownIcon, Icon } from "@chakra-ui/icons";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  useColorModeValue,
  chakra,
  Flex,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FC } from "react";

function Pagination() {
  return (
    <HStack>
      <PagButton>
        <Icon
          as={IoIosArrowBack}
          color={useColorModeValue("gray.700", "gray.200")}
          boxSize={4}
        />
      </PagButton>
      <PagButton p>1</PagButton>
      <PagButton p active>
        2
      </PagButton>
      <PagButton p>3</PagButton>
      <PagButton p>4</PagButton>
      <PagButton p>5</PagButton>
      <PagButton>
        <Icon
          as={IoIosArrowForward}
          color={useColorModeValue("gray.700", "gray.200")}
          boxSize={4}
        />
      </PagButton>
      <Menu>
        <MenuButton ml={1} as={Button} rightIcon={<ChevronDownIcon />}>
          10 / page
        </MenuButton>
        <MenuList>
          <MenuItem>20 / page</MenuItem>
          <MenuItem>30 / page</MenuItem>
          <MenuItem>40 / page</MenuItem>
          <MenuItem>50 / page</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}

export default Pagination;

type PagButtonProps = {
  disabled?: boolean;
  active?: boolean;
  p?: boolean;
};
const PagButton: FC<PagButtonProps> = (props) => {
  const activeStyle = {
    bg: useColorModeValue("brand.600", "brand.500"),
    color: useColorModeValue("white", "gray.200"),
  };
  return (
    <chakra.button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
      opacity={props.disabled ? 0.6 : undefined}
      _hover={!props.disabled ? activeStyle : undefined}
      cursor={props.disabled ? "not-allowed" : undefined}
      {...(props.active && activeStyle)}
      display={
        props.p && !props.active ? { base: "none", sm: "block" } : undefined
      }
    >
      {props.children}
    </chakra.button>
  );
};
