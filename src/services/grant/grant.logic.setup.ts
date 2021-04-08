import * as queries from "../../utils/common/common.query";
import * as grantLogic from "./grant.logic";

export const getGrants = grantLogic.getGrantsLogic(
  queries.getFromRepoQuery,
);

export const getOneGrant = grantLogic.getOneGrantLogic(
  queries.getOneFromRepoQuery,
);

