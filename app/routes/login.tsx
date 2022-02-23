import {
  Flex,
  useColorModeValue,
  Stack,
  Box,
  Checkbox,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "remix";
import { z } from "zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { createUserSession, login } from "~/utils/sessions.server";
import { FormInput, SubmitButton } from "~/components/core";

export const meta: MetaFunction = () => {
  return {
    title: "Login",
    description: "Login to access POS system!",
  };
};

export const validator = withZod(
  z.object({
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required"),
    redirectTo: z.string().optional(),
  })
);

type LoaderData = {
  defaultValues: {
    username: string;
    password: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await validator.validate(await request.formData());
  if (error) return validationError(error);

  const user = await login(data!);
  if (!user) {
    return json({ formError: "Invalid credentials" }, 400);
  }

  return createUserSession(user.id, data?.redirectTo || "/");
};

export const loader: LoaderFunction = () => {
  return json<LoaderData>({
    defaultValues: {
      username: "woufu",
      password: "123456",
    },
  });
};

function Login() {
  const { defaultValues } = useLoaderData<LoaderData>();
  const actionData = useActionData();
  const [searchParams] = useSearchParams();

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.700")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          w={350}
          rounded="md"
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="md"
          px="5"
          py="7"
        >
          {actionData?.formError ? (
            <Alert status="error">
              <AlertIcon />
              {actionData?.formError}
            </Alert>
          ) : null}
          <ValidatedForm
            validator={validator}
            defaultValues={defaultValues}
            method="post"
          >
            <input
              type="hidden"
              name="redirectTo"
              value={searchParams.get("redirectTo") ?? undefined}
            />
            <Stack spacing={4}>
              <FormInput name="username" label="Username" />
              <FormInput name="password" label="Password" type="password" />
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                </Stack>
                <SubmitButton />
              </Stack>
            </Stack>
          </ValidatedForm>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
