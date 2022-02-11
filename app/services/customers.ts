import { Prisma } from "@prisma/client";
import { redirect } from "remix";
import { validationError } from "remix-validated-form";
import { db } from "~/utils/db.server";
import { getLoaderFilters } from "~/utils/loader-filters.server";
import { CustomerFormData } from "~/validations/customers";

export type GetCustomers = Prisma.PromiseReturnType<typeof getCustomers>;

export const getCustomers = async (request: Request) => {
  const { take, skip } = await getLoaderFilters(request);

  const customers = await db.customer.findMany({
    take,
    skip,
  });

  return { data: customers, total: await db.customer.count() };
};

export type GetCustomer = Prisma.PromiseReturnType<typeof getCustomer>;
export const getCustomer = async (id: number) => {
  const customer = await db.customer.findUnique({
    where: { id },
  });

  if (!customer) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return customer;
};

export const createCustomer = async (data: CustomerFormData) => {
  const customerExist = await findCustomerExist(data.code);
  if (customerExist) return customerExist;

  const customer = await db.customer.create({ data });
  return redirect(`/customers/${customer.id}`);
};

export const updateCustomer = async (id: number, data: CustomerFormData) => {
  const customer = await getCustomer(id);

  if (customer.code !== data.code) {
    const customerExist = await findCustomerExist(data.code);
    if (customerExist) {
      return customerExist;
    }
  }

  await db.customer.update({ where: { id }, data });
  return redirect(`/customers/${customer.id}`);
};

export const deleteCustomerById = async (id: number) => {
  const customer = await getCustomer(id);

  await db.customer.delete({ where: { id: customer.id } });
  return customer;
};

export const findCustomerExist = async (code: string) => {
  const customerExist = await db.customer.findFirst({
    where: { code },
  });

  if (customerExist) {
    return validationError({
      code: `Customer code "${code}" is already exist!`,
    });
  }
};
