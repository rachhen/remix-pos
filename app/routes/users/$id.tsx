import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { setFlash } from "~/utils/sessions.server";
import { deleteUserById, getUser } from "~/services/users";
import { parseParamId } from "~/utils/helpers.server";
import { LoaderData, UserView } from "~/components/users/UserView";
import { GenericCatchBoundary } from "~/components/core/boundaries";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? "View - " + data.fullName : "Not Found",
    description: "View user data",
  };
};

export const action: ActionFunction = async ({ params, request }) => {
  if (request.method === "DELETE") {
    const id = parseParamId(params);
    const user = await deleteUserById(id);

    return setFlash(request, {
      status: "success",
      message: `User "${user.fullName}" deleted!`,
      redirectTo: "/users",
    });
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseParamId(params);
  const user = await getUser(id);

  return json(user);
};

function UserShow() {
  const data = useLoaderData<LoaderData>();

  return <UserView user={data} />;
}

export default UserShow;

export function CatchBoundary() {
  return <GenericCatchBoundary title="User" type="view" path="users" />;
}
