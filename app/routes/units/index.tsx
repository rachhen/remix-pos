import { Column } from "react-table";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { DataTable } from "~/components/core";
import { GetUnits, getUnits } from "~/services/units";

export const meta: MetaFunction = () => {
  return {
    title: "Units",
    description: "List Units",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const units = await getUnits(request);
  return json(units);
};

type Unit = GetUnits["data"][number];

function ProductList() {
  const { data, total } = useLoaderData<GetUnits>();

  const columns: Column<Unit>[] = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
  ];

  return (
    <DataTable<Unit>
      title="Units"
      path="units"
      data={data}
      columns={columns}
      total={total}
    />
  );
}

export default ProductList;
