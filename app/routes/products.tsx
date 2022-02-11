import { LoaderFunction, Outlet, useLoaderData } from "remix";
import { responseWithFlash, requireUserId } from "~/utils/sessions.server";
import { GenericErrorBoundary } from "~/components/core/boundaries";
import { Layout } from "~/components/core/layout";
import { FlashType } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return await responseWithFlash(request);
};

export default function Products() {
  const toast = useLoaderData<FlashType>();

  return (
    <Layout toast={toast}>
      <Outlet />
    </Layout>
  );
}

export { GenericErrorBoundary as ErrorBoundary };
