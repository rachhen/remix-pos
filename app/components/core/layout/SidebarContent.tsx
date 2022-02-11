import {
  Box,
  useColorModeValue,
  Flex,
  Icon,
  Collapse,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FaClipboardCheck } from "react-icons/fa";
import { HiCollection, HiCode, HiUsers } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import { useLocation } from "remix";
import { NavItem } from "./NavItem";

const routes = [
  { name: "Home", href: "/", icon: MdHome },
  { name: "Users", href: "/users", icon: HiUsers },
  {
    name: "Products",
    href: "#",
    icon: HiCollection,
    child: [
      { name: "Items", href: "/products" },
      { name: "Categories", href: "/categories" },
      { name: "Units", href: "/units" },
    ],
  },
  { name: "Customers", href: "/customers", icon: FaClipboardCheck },
  {
    name: "Integrations",
    href: "#",
    icon: HiCode,
    child: [
      { name: "Shopify", href: "#" },
      { name: "Slack", href: "#" },
      { name: "Zapier", href: "#" },
    ],
  },
  { name: "Changelog", href: "#", icon: AiFillGift },
  { name: "Settings", href: "#", icon: BsGearFill },
];

export const SidebarContent = (props: any) => {
  const integrations = useDisclosure();
  const location = useLocation();

  const splitPaths = location.pathname.split("/");

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text color="brand.500">Logo</Text>
        <Text
          fontSize="2xl"
          ml="2"
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
        >
          Choc UI
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        {routes.map((route, index) => {
          const currentRoute = route.child?.find((dd) => {
            return (
              dd.href == location.pathname ||
              splitPaths.includes(dd.href.split("/")[1])
            );
          });
          return (
            <Fragment key={`item-${index}`}>
              <NavItem
                icon={route.icon}
                to={route.href}
                onClick={route.child ? integrations.onToggle : undefined}
              >
                {route.name}
                {route.child && (
                  <Icon
                    as={MdKeyboardArrowRight}
                    ml="auto"
                    transform={
                      integrations.isOpen || currentRoute ? "rotate(90deg)" : ""
                    }
                  />
                )}
              </NavItem>
              {route.child && (
                <Collapse in={integrations.isOpen || !!currentRoute}>
                  {route.child.map((subRoute, index) => (
                    <NavItem
                      key={`sub-item-${index}`}
                      pl="12"
                      py="2"
                      to={subRoute.href}
                    >
                      {subRoute.name}
                    </NavItem>
                  ))}
                </Collapse>
              )}
            </Fragment>
          );
        })}
      </Flex>
    </Box>
  );
};
