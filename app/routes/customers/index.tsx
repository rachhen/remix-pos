import { Column } from "react-table";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { DataTable } from "~/components/core";
import { GetCustomers, getCustomers } from "~/services/customers";

export const meta: MetaFunction = () => {
  return {
    title: "Custumers",
    description: "List Customers",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const customers = await getCustomers(request);
  return json(customers);
};

type Customer = GetCustomers["data"][number];

function ProductList() {
  const { data, total } = useLoaderData<GetCustomers>();

  const columns: Column<Customer>[] = [
    { Header: "ID", accessor: "id" },
    { Header: "Code", accessor: "code" },
    { Header: "Name", accessor: "name" },
    { Header: "Address", accessor: "address" },
  ];

  return (
    <DataTable<Customer>
      title="Customers"
      path="customers"
      data={data}
      columns={columns}
      total={total}
    />
  );
}

export default ProductList;
