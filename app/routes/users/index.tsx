import type { User } from "@prisma/client";
import type { Column } from "react-table";
import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { DataTable, LoaderData } from "~/components/core";
import { getLoaderFilters } from "~/utils/loader-filters.server";
import { getUsers } from "~/services/users";

export const meta: MetaFunction = () => {
  return {
    title: "Users",
    description: "Get all users",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const { take, skip } = getLoaderFilters(request);

  return await getUsers(take, skip);
};

export default function UserList() {
  const { data, total } = useLoaderData<LoaderData<User>>();

  const columns: Column<User>[] = [
    { Header: "ID", accessor: "id" },
    { Header: "Full Name", accessor: "fullName" },
    { Header: "Address", accessor: "address" },
    { Header: "Role", accessor: "role" },
  ];

  return (
    <DataTable<User>
      title="Users"
      path="users"
      data={data}
      columns={columns}
      total={total}
    />
  );
}
