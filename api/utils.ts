import type Meta from "./meta.interface";

export const defaultMeta = (): Meta => ({
  count: 0,
  pageCount: 0,
  page: 1,
  total: 0,
});

export default defaultMeta;