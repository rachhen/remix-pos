import { withZod } from "@remix-validated-form/with-zod";
import { zfd } from "zod-form-data";
import { z } from "zod";

export const CustomerSchema = zfd.formData({
  code: zfd.text(),
  name: zfd.text(),
  contact: zfd.text(),
  address: zfd.text(),
});

export const customerValidator = withZod(CustomerSchema);

export type CustomerFormData = z.infer<typeof CustomerSchema>;
