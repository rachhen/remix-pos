import { withZod } from "@remix-validated-form/with-zod";
import { zfd } from "zod-form-data";
import { z } from "zod";

export const UnitSchema = zfd.formData({
  name: zfd.text(),
});

export const unitValidator = withZod(UnitSchema);

export type UnitFormData = z.infer<typeof UnitSchema>;
