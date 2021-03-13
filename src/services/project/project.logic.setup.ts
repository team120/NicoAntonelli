import { findProjects } from "../../utils/project/project.utils";
import * as projectLogic from "./project.logic";

export const getProjects = projectLogic.getProjects(findProjects);
