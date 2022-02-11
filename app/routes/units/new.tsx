import { Box } from "@chakra-ui/react";
import { ActionFunction } from "remix";
import { validationError } from "remix-validated-form";
import { PageHeader } from "~/components/core/PageHeader";
import { UnitForm } from "~/components/units/UnitForm";
import { createUnit } from "~/services/units";
import { unitValidator } from "~/validations/units";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { data, error } = await unitValidator.validate(formData);
  if (error) return validationError(error);

  return createUnit(data!);
};

function UnitCreate() {
  return (
    <Box>
      <PageHeader title="Unit" type="new" path="units" />
      <UnitForm validator={unitValidator} />
    </Box>
  );
}

export default UnitCreate;
