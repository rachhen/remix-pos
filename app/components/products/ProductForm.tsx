import { HStack, Stack } from "@chakra-ui/react";
import { Category, Unit } from "@prisma/client";
import { useLoaderData } from "remix";
import { FormProps, ValidatedForm } from "remix-validated-form";
import { SubmitButton, FormInput, FormTextarea, FormSelect } from "../core";
import { FormNumberInput } from "../core/FormNumberInput";

type LoaderData = {
  categories: Category[];
  units: Unit[];
};

export function ProductForm<T extends any>(props: FormProps<T>) {
  const { categories, units } = useLoaderData<LoaderData>();

  return (
    <ValidatedForm method="post" {...props}>
      <Stack spacing="5">
        <HStack alignItems="stretch" spacing="5">
          <FormInput name="code" label="Code" />
          <FormInput name="name" label="Name" />
        </HStack>
        <HStack alignItems="stretch" spacing="5">
          <FormSelect name="categoryId" label="Category">
            {categories.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </FormSelect>
          <FormInput name="reorderLevel" label="Reorder Level" />
        </HStack>
        <HStack alignItems="stretch" spacing="5">
          <FormSelect name="unitId" label="Unit">
            {units.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </FormSelect>
          <FormNumberInput name="unitInStock" label="Unit In Stock" min={0} />
        </HStack>
        <HStack alignItems="stretch" spacing="5">
          <FormNumberInput name="unitPrice" label="Unit Price" min={0} />
          <FormNumberInput
            name="discountPercentage"
            label="Discount Percentage"
            min={0}
          />
        </HStack>
        <FormTextarea name="description" label="Description" />
        <SubmitButton w={{ base: "full", md: "auto" }} />
      </Stack>
    </ValidatedForm>
  );
}
