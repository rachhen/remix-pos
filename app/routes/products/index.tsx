import { Column } from "react-table";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { DataTable } from "~/components/core";
import { GetProducts, getProducts } from "~/services/products";

export const meta: MetaFunction = () => {
  return {
    title: "Products",
    description: "List products",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const products = await getProducts(request);
  return json(products);
};

type Product = GetProducts["data"][number];

function ProductList() {
  const { data, total } = useLoaderData<GetProducts>();

  const columns: Column<Product>[] = [
    { Header: "ID", accessor: "id" },
    { Header: "Code", accessor: "code" },
    { Header: "Name", accessor: "name" },
    { Header: "Unit In Stock", accessor: "unitInStock" },
    { Header: "Unit Price", accessor: "unitPrice" },
    { Header: "Created At", accessor: "createdAt" },
  ];

  return (
    <DataTable<Product>
      title="Products"
      path="products"
      data={data}
      columns={columns}
      total={total}
    />
  );
}

export default ProductList;
