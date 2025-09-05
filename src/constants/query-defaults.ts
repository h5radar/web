/**
 * Default query parameters for list requests (pagination + sorting).
 * - page: 1-based page index
 * - size: items per page
 * - sort: [field, direction]
 */
export const DEFAULT_QUERY_PARAM = {
  page: 1,
  size: 10,
  sort: ["title", "asc"],
};
