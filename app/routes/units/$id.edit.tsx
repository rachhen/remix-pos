import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { Box } from "@chakra-ui/react";
import { Unit } from "@prisma/client";
import { validationError } from "remix-validated-form";
import { PageHeader } from "~/components/core/PageHeader";
import { GenericCatchBoundary } from "~/components/core/boundaries";
import { parseParamId } from "~/utils/helpers.server";
import { unitValidator } from "~/validations/units";
import { getUnit, updateUnit } from "~/services/units";
import { UnitForm } from "~/components/units/UnitForm";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Edit - ${data.name}` : "Not Found",
    description: "Edit Unit data",
  };
};

export const action: ActionFunction = async ({ params, request }) => {
  const id = parseParamId(params);
  const formData = await request.formData();
  const { data, error } = unitValidator.validate(formData);
  if (error) return validationError(error);

  return await updateUnit(id, data!);
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseParamId(params);
  const unit = await getUnit(id);
  return json(unit);
};

function UnitEdit() {
  const data = useLoaderData<Unit>();

  return (
    <Box>
      <PageHeader title="Unit" type="edit" path="units" />
      <UnitForm defaultValues={data} validator={unitValidator} />
    </Box>
  );
}

export default UnitEdit;

export function CatchBoundary() {
  return <GenericCatchBoundary title="Unit" type="edit" path="units" />;
}
