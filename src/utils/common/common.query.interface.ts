import { DeleteResult } from "typeorm";

export type getQueryFunc = <T>(
  type: { new (...args: any[]): T },
  relationsToInclude?: string[],
) => Promise<T[]>;

export type getOneQueryFunc = <T>(
  type: { new (...args: any[]): T },
  id: number | string,
  relationsToInclude?: string[],
) => Promise<T>;

export type createQueryFunc = <R, T>(
  type: { new (...args: any[]): T },
  value: R,
  relationsToInclude?: string[],
) => Promise<T>;

export type updateQueryFunc = <R, T>(
  type: { new (...args: any[]): T },
  valueCurrent: T,
  valueUpdated: R,
) => Promise<T>;

export type deleteQueryFunc = <T>(
  type: { new (...args: any[]): T },
  id: number,
) => Promise<DeleteResult | void>;
