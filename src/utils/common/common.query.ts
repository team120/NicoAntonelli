import * as queryTypes from "./common.query.interface";
import { getRepository } from "typeorm";
import * as Er from "../errors/errors";

export const getFromRepoQuery: queryTypes.getQueryFunc = <T>(
  type: {
    new (...args: any[]): T;
  },
  include: string[],
): Promise<T[]> =>
  getRepository(type)
    .find({ relations: include })
    .catch((err: Error) => {
      throw Er.DbError(err.message, err.stack);
    });

export const getOneFromRepoQuery: queryTypes.getOneQueryFunc = <T>(
  type: { new (...args: any[]): T },
  include: string[],
  id: number,
): Promise<T> =>
  getRepository(type)
    .findOne(id, { relations: include })
    .catch((err) => {
      throw Er.DbError(err.message, err.stack);
    })
    .then((post) => {
      if (post === undefined) {
        throw Er.NotFoundError(id);
      }
      return post;
    });

export const saveQuery: queryTypes.saveQueryFunc = <R, T>(
  type: {
    new (...args: any[]): T;
  },
  value: R,
): Promise<T> =>
  getRepository(type)
    .save(getRepository(type).create(value))
    .catch((err: Error) => {
      throw Er.DbError(err.message, err.stack);
    });
