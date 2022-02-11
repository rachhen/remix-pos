import { AddIcon, ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Button,
  IconButton,
  HStack,
  ButtonGroup,
} from "@chakra-ui/react";
import pluralize from "pluralize";
import { Link, useNavigate, useParams, useSubmit } from "remix";
import { AiFillEdit, AiOutlineUnorderedList } from "react-icons/ai";

export type PageHeaderProps = {
  title: string;
  path: string;
  type?: "list" | "new" | "edit" | "view";
  disabled?: boolean;
};

export const PageHeader = (props: PageHeaderProps) => {
  const { title, path, disabled, type = "list" } = props;
  const navigate = useNavigate();
  const params = useParams();
  const submit = useSubmit();

  const RightButton = () => {
    if (type === "new") return null;

    if (type === "list") {
      return (
        <Button
          as={Link}
          leftIcon={<AddIcon />}
          size="sm"
          to="new"
          variant="outline"
        >
          Create
        </Button>
      );
    }

    return (
      <ButtonGroup variant="outline" spacing="3" size="sm">
        <Button leftIcon={<AiOutlineUnorderedList />} as={Link} to={`/${path}`}>
          {pluralize(title)}
        </Button>
        {type === "view" && (
          <Button
            leftIcon={<AiFillEdit />}
            as={Link}
            to={`edit`}
            isDisabled={disabled}
            onClick={(e) => (disabled ? e.preventDefault() : true)}
          >
            Edit
          </Button>
        )}
        <Button
          leftIcon={<DeleteIcon />}
          colorScheme="red"
          isDisabled={disabled}
          onClick={() => {
            if (confirm("Confirm")) {
              submit(null, {
                method: "delete",
                action: `/${path}/${params.id}`,
              });
            }
          }}
        >
          Delete
        </Button>
      </ButtonGroup>
    );
  };

  return (
    <Flex justify="space-between" align="center">
      <HStack align="center">
        {type !== "list" && (
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="back"
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
          />
        )}
        <Heading size="md">
          {type !== "list" && type.charAt(0).toUpperCase() + type.slice(1)}{" "}
          {title}
        </Heading>
      </HStack>
      {RightButton()}
    </Flex>
  );
};
