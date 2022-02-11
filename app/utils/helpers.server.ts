import { Params } from "react-router-dom";
import invariant from "tiny-invariant";

export const parseParamId = (params: Params) => {
  invariant(params.id, "expected params.id");

  if (isNaN(parseInt(params.id))) {
    throw new Response("Invalid ID", {
      status: 400,
    });
  }

  return parseInt(params.id);
};
