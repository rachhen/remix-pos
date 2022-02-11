export const getLoaderFilters = (request: Request) => {
  const url = new URL(request.url);
  const skip = Math.max(+(url.searchParams.get("page") || 1) - 1, 0);
  const take = Math.max(+(url.searchParams.get("limit") || 10), 10);

  return { skip, take };
};
