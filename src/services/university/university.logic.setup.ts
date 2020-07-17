import * as universityLogicFactories from "./university.logic";
import * as queries from "../../utils/common/common.query";

export const getUniversities = universityLogicFactories.getUniversitiesLogicFactory(
  queries.getFromRepoQuery,
);

export const getOneUniversity = universityLogicFactories.getOneUniversityLogicFactory(
  queries.getOneFromRepoQuery,
);
