import * as queryTypes from "./common.query.interface";
import { getRepository, DeleteResult } from "typeorm";
import * as Er from "../errors/error.variants";

export const getFromRepoQuery: queryTypes.getQueryFunc = <T>(
  type: {
    new(...args: any[]): T;
  },
  include?: string[],
): Promise<T[]> =>
  getRepository(type)
    .find({ relations: include ?? [] })
    .catch((err: Error) => {
      throw Er.DbError(err.message, err.stack);
    });

export const getOneFromRepoQuery: queryTypes.getOneQueryFunc = <T>(
  type: { new(...args: any[]): T },
  id: number,
  include?: string[],
): Promise<T> =>
  getRepository(type)
    .findOne(id, { relations: include ?? [] })
    .catch((err) => {
      throw Er.DbError(err.message, err.stack);
    })
    .then((entity) => {
      if (entity === undefined) {
        throw Er.NotFoundError(id);
      }
      return entity;
    });

export const createFromRepoQuery: queryTypes.createQueryFunc = <R, T>(
  type: {
    new(...args: any[]): T;
  },
  value: R,
): Promise<T> =>
  getRepository(type)
    .save(getRepository(type).create(value))
    .catch((err: Error) => {
      throw Er.DbError(err.message, err.stack);
    });

export const deleteFromRepoQuery: queryTypes.deleteQueryFunc = <T>(
  type: { new(...args: any[]): T },
  id: number,
): Promise<DeleteResult> =>
  getRepository(type)
    .delete(id)
    .catch((err) => {
      throw Er.DbError(err.message, err.stack);
    });
