import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { FiLogOut, FiMenu, FiSearch } from "react-icons/fi";
import { Form } from "remix";
import { FlashType } from "~/types";
import Alert from "../Alert";
import { SidebarContent } from "./SidebarContent";

type LayoutProps = {
  toast?: FlashType;
};

export const Layout: FC<LayoutProps> = ({ children, toast }) => {
  const sidebar = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const initToast = useToast();

  useEffect(() => {
    if (toast) {
      initToast({
        duration: 9000,
        position: "top-right",
        isClosable: true,
        render: (props) => (
          <Alert {...toast} key={props.id} onClose={props.onClose} />
        ),
      });
    }
  }, [toast]);

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.500" children={<FiSearch />} />
            <Input placeholder="Search for articles..." />
          </InputGroup>

          <HStack align="center" spacing="4">
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              size="sm"
              aria-label="Menu"
              variant="ghost"
              color="gray.500"
              onClick={toggleColorMode}
            />
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <Avatar
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/30869823?v=4"
              cursor="pointer"
            />
            <Form action="/logout" method="post">
              <IconButton
                size="sm"
                aria-label="Menu"
                color="gray.500"
                variant="ghost"
                icon={<FiLogOut />}
                type="submit"
              />
            </Form>
          </HStack>
        </Flex>

        <Box as="main" p="4" pos="relative">
          <Box
            p="4"
            rounded="md"
            minH="96"
            bg={useColorModeValue("white", "gray.800")}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
