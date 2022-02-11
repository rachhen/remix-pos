import { FC } from "react";
import { Flex, useColorModeValue, Icon, FlexProps } from "@chakra-ui/react";
import { NavLink } from "remix";

type NavItemProps = FlexProps & {
  to?: string;
  icon?: any;
  isActive?: boolean;
};

export const NavItem: FC<NavItemProps> = (props) => {
  const { to, icon, isActive, children, ...rest } = props;

  const Content = ({ isActive }: { isActive?: boolean }) => (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color={useColorModeValue("inherit", "gray.400")}
      bg={isActive ? useColorModeValue("gray.100", "gray.900") : ""}
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
        color: useColorModeValue("gray.900", "gray.200"),
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: useColorModeValue("gray.600", "gray.300"),
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );

  if (to) {
    return (
      <NavLink to={to || "#"}>
        {({ isActive }) => <Content isActive={to === "#" ? false : isActive} />}
      </NavLink>
    );
  }

  return <Content isActive={isActive} />;
};
