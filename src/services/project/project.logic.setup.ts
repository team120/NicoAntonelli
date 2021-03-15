import * as queries from "../../utils/common/common.query";
import * as projectLogic from "./project.logic";
import { findProjects } from "../../utils/project/project.utils";

export const getProjects = projectLogic.getProjects(findProjects);

export const getOneProject = projectLogic.getOneProject(
  queries.getOneFromRepoQuery,
);
