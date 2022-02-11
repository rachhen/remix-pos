import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { Hooks, CellProps } from "react-table";
import { useSubmit, Link } from "remix";

export const useActionsHook = (path: string) => (hooks: Hooks<any>) => {
  const submit = useSubmit();
  hooks.allColumns.push((columns) => [
    ...columns,
    {
      id: "actions",
      defaultCanSort: false,
      Header: "Actions",
      Cell: ({ row }: CellProps<any>) => {
        return (
          <ButtonGroup variant="outline" size="xs" spacing={3}>
            <IconButton
              icon={<IoEyeSharp />}
              aria-label="View"
              as={Link}
              to={`/${path}/${row.original.id}`}
            />
            <IconButton
              icon={<AiFillEdit />}
              aria-label="edit"
              as={Link}
              to={`/${path}/${row.original.id}/edit`}
            />
            <IconButton
              icon={<BsFillTrashFill />}
              colorScheme="red"
              aria-label="delete"
              onClick={() => {
                if (confirm("Are you sure?")) {
                  submit(null, {
                    method: "delete",
                    action: `/${path}/${row.original.id}`,
                  });
                }
              }}
            />
          </ButtonGroup>
        );
      },
    },
  ]);
};
