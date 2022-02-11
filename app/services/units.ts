import { Prisma } from "@prisma/client";
import { redirect } from "remix";
import { validationError } from "remix-validated-form";
import { db } from "~/utils/db.server";
import { getLoaderFilters } from "~/utils/loader-filters.server";
import { CategoryFormData } from "~/validations/categories";
import { UnitFormData } from "~/validations/units";

export type GetUnits = Prisma.PromiseReturnType<typeof getUnits>;

export const getUnits = async (request: Request) => {
  const { take, skip } = await getLoaderFilters(request);

  const categories = await db.unit.findMany({
    take,
    skip,
  });

  return { data: categories, total: await db.unit.count() };
};

export const getUnit = async (id: number) => {
  const unit = await db.unit.findUnique({
    where: { id },
  });

  if (!unit) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return unit;
};

export const updateUnit = async (id: number, data: UnitFormData) => {
  const unit = await getUnit(id);

  if (unit.name !== data.name) {
    const unitExist = await findUnitExist(data.name);
    if (unitExist) {
      return unitExist;
    }
  }

  await db.unit.update({ where: { id }, data });

  return redirect(`/units/${unit.id}`);
};

export const createUnit = async (data: UnitFormData) => {
  const unitExist = await findUnitExist(data.name);
  if (unitExist) return unitExist;

  const unit = await db.unit.create({ data });
  return redirect(`/units/${unit.id}`);
};

export const deleteUnitById = async (id: number) => {
  const unit = await getUnit(id);

  await db.unit.delete({ where: { id: unit.id } });
  return unit;
};

export const findUnitExist = async (name: string) => {
  const unitExist = await db.unit.findFirst({
    where: { name },
  });

  if (unitExist) {
    return validationError({
      fieldErrors: { name: `Unit "${name}" is already taken!` },
    });
  }
};
