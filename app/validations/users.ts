import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

const CreateUserSchema = z.object({
  fullName: z.string().nonempty("Full Name is required"),
  username: z.string().nonempty("Username is required"),
  password: z.string({ description: "Password is required" }),
  contact: z.string().nullable(),
  address: z.string().nullable(),
  file: z.any().optional(),
});

const UpdateUserSchema = CreateUserSchema.partial();
export const createUserValidator = withZod(CreateUserSchema);
export const updateUserValidator = withZod(UpdateUserSchema);

export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
