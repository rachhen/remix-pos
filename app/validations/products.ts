import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const ProductSchema = zfd.formData({
  code: zfd.text(),
  name: zfd.text(),
  description: zfd.text(z.string().nullable()),
  unitInStock: zfd.numeric(),
  unitPrice: zfd.numeric(),
  discountPercentage: zfd.numeric(),
  reorderLevel: zfd.numeric(),
  unitId: zfd.numeric(),
  categoryId: zfd.numeric(),
});

export const productValidator = withZod(ProductSchema);

export type ProductFormData = z.infer<typeof ProductSchema>;
