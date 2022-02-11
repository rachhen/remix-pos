import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { Unit } from "@prisma/client";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { setFlash } from "~/utils/sessions.server";
import { parseParamId } from "~/utils/helpers.server";
import { GenericCatchBoundary } from "~/components/core/boundaries";
import { PageHeader } from "~/components/core/PageHeader";
import { deleteUnitById, getUnit } from "~/services/units";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? "View - " + data.name : "Not Found",
    description: "View unit",
  };
};

export const action: ActionFunction = async ({ params, request }) => {
  if (request.method === "DELETE") {
    const id = parseParamId(params);
    const unit = await deleteUnitById(id);

    return setFlash(request, {
      status: "success",
      message: `Unit "${unit.name}" deleted!`,
      redirectTo: "/units",
    });
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseParamId(params);
  const unit = await getUnit(id);

  return json(unit);
};

function UnitShow() {
  const data = useLoaderData<Unit>();

  return (
    <Box>
      <PageHeader title="Unit" type="view" path="units" />
      <VStack align="stretch" mt="5" p="5" spacing="5">
        <Box>
          <Heading size="sm">Name</Heading>
          <Text>{data.name}</Text>
        </Box>
      </VStack>
    </Box>
  );
}

export default UnitShow;

export function CatchBoundary() {
  return <GenericCatchBoundary title="Unit" type="view" path="units" />;
}
