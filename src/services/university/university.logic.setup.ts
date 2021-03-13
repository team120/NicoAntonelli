import * as universityLogic from "./university.logic";
import * as queries from "../../utils/common/common.query";

export const getUniversities = universityLogic.getUniversitiesLogic(
  queries.getFromRepoQuery,
);

export const getOneUniversity = universityLogic.getOneUniversityLogic(
  queries.getOneFromRepoQuery,
);

export const createUniversity = universityLogic.createUniversityLogic(
  queries.createFromRepoQuery,
);

export const updateUniversity = universityLogic.updateUniversityLogic(
  queries.updateFromRepoQuery,
  queries.getOneFromRepoQuery,
);

export const deleteUniversity = universityLogic.deleteUniversityLogic(
  queries.deleteFromRepoQuery,
  queries.getOneFromRepoQuery,
);
