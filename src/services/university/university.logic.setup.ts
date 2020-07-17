import * as universityLogicFactories from "./university.logic";
import * as queries from "../../utils/common/common.query";

export const getUniversity = universityLogicFactories.getUniversitiesLogicFactory(
  queries.getFromRepoQuery,
);

export const getOneUniversity = universityLogicFactories.getOneUniversityLogicFactory(
  queries.getOneFromRepoQuery,
);
