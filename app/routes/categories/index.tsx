import { Column } from "react-table";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { getCategories, GetCategories } from "~/services/categories";
import { DataTable } from "~/components/core";

export const meta: MetaFunction = () => {
  return {
    title: "Categories",
    description: "List Categories",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const categories = await getCategories(request);
  return json(categories);
};

type Category = GetCategories["data"][number];

function ProductList() {
  const { data, total } = useLoaderData<GetCategories>();

  const columns: Column<Category>[] = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
  ];

  return (
    <DataTable<Category>
      title="Categories"
      path="categories"
      data={data}
      columns={columns}
      total={total}
    />
  );
}

export default ProductList;
