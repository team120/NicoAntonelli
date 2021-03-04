import { getFromRepoQuery } from "../../utils/common/common.query";
import * as projectLogic from "./project.logic";

export const getProjects = projectLogic.getProjects(getFromRepoQuery);
