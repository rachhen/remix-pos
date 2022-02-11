import { Prisma } from "@prisma/client";
import { redirect } from "remix";
import { validationError } from "remix-validated-form";
import { db } from "~/utils/db.server";
import { getLoaderFilters } from "~/utils/loader-filters.server";
import { CategoryFormData } from "~/validations/categories";

export type GetCategories = Prisma.PromiseReturnType<typeof getCategories>;

export const getCategories = async (request: Request) => {
  const { take, skip } = await getLoaderFilters(request);

  const categories = await db.category.findMany({
    take,
    skip,
  });

  return { data: categories, total: await db.category.count() };
};

export const getCategory = async (id: number) => {
  const category = await db.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return category;
};

export const updateCategory = async (id: number, data: CategoryFormData) => {
  const user = await getCategory(id);

  if (user.name !== data.name) {
    const cateExist = await findCategoryExist(data.name);
    if (cateExist) {
      return cateExist;
    }
  }

  await db.category.update({ where: { id }, data });

  return redirect(`/categories/${user.id}`);
};

export const createCategory = async (data: CategoryFormData) => {
  const cateExist = await findCategoryExist(data.name);
  if (cateExist) return cateExist;

  const category = await db.category.create({ data });
  return redirect(`/categories/${category.id}`);
};

export const deleteCategoryById = async (id: number) => {
  const category = await getCategory(id);

  await db.category.delete({ where: { id: category.id } });
  return category;
};

export const findCategoryExist = async (name: string) => {
  const categoryExist = await db.category.findFirst({
    where: { name },
  });

  if (categoryExist) {
    return validationError({
      username: `Category "${name}" is already taken!`,
    });
  }
};
