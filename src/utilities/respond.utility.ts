import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    nextPage: number;
    perPage: number;
    count: number;
    hasNext: boolean;
  };
}

export const generatePaginationMeta = <T>(payload: T[], page: number, perPage: number): PaginatedResponse<T> => {
  const hasNext = payload.length > perPage;
  const data = hasNext ? payload.slice(0, -1) : payload;
  const nextPage = hasNext ? page + 1 : null;

  return {
    data,
    meta: {
      page,
      nextPage: nextPage,
      perPage,
      hasNext,
      count: hasNext ? perPage : payload.length
    }
  };
};

const respond = <T>(
  res: Response,
  payload: T,
  statusCode: number = StatusCodes.OK,
  errors: unknown = null,
  meta: Record<string, unknown> = {}
): Response => {
  const isError = statusCode >= 400;
  const status = isError ? 'error' : 'success';
  const payloadKey = isError ? 'message' : 'data';

  const response = {
    status,
    [payloadKey]: payload,
    meta,
    ...(isError && errors ? { data: errors } : {})
  };

  return res.status(statusCode).json(response);
};

export default respond;
