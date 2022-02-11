import { withZod } from "@remix-validated-form/with-zod";
import { zfd } from "zod-form-data";
import { z } from "zod";

export const CategorySchema = zfd.formData({
  name: zfd.text(),
});

export const categoryValidator = withZod(CategorySchema);

export type CategoryFormData = z.infer<typeof CategorySchema>;
