import { useSearchParams } from "remix";

export const useGetPagination = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const pageIndex = page ? +page : 1;
  const pageSize = limit ? +limit : 10;

  return { pageIndex, pageSize };
};
