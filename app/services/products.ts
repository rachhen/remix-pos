import { Prisma } from "@prisma/client";
import { redirect } from "remix";
import { validationError } from "remix-validated-form";
import { db } from "~/utils/db.server";
import { getLoaderFilters } from "~/utils/loader-filters.server";
import { ProductFormData } from "~/validations/products";

export type GetProducts = Prisma.PromiseReturnType<typeof getProducts>;

export const getProducts = async (request: Request) => {
  const { take, skip } = await getLoaderFilters(request);

  const products = await db.product.findMany({
    take,
    skip,
    include: { user: { include: { avatar: true } } },
  });

  return { data: products, total: await db.product.count() };
};

export type GetProduct = Prisma.PromiseReturnType<typeof getProduct>;
export const getProduct = async (id: number) => {
  const product = await db.product.findUnique({
    where: { id },
    include: { user: true, unit: true, category: true },
  });

  if (!product) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return product;
};

export const createProduct = async (userId: number, data: ProductFormData) => {
  const productExist = await findProductExist(data.name);
  if (productExist) return productExist;

  const product = await db.product.create({ data: { ...data, userId } });
  return redirect(`/products/${product.id}`);
};

export const updateProduct = async (id: number, data: ProductFormData) => {
  const product = await getProduct(id);

  if (product.name !== data.name) {
    const productExist = await findProductExist(data.name);
    if (productExist) {
      return productExist;
    }
  }

  await db.product.update({ where: { id }, data });

  return redirect(`/products/${product.id}`);
};

export const deleteProductById = async (id: number) => {
  const product = await getProduct(id);

  await db.product.delete({ where: { id: product.id } });
  return product;
};

export const findProductExist = async (name: string) => {
  const productExist = await db.product.findFirst({
    where: { name },
  });

  if (productExist) {
    return validationError({
      fieldErrors: { name: `Product "${name}" is already taken!` },
    });
  }
};
