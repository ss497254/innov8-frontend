import { ProjectType } from "../../types";
import { BadgeTypes } from "../../ui";

export const StatusBadgeMap: Record<
  Exclude<ProjectType["status"], undefined>,
  keyof typeof BadgeTypes
> = {
  "judge-assign": "blue",
  "judge-review": "purple",
  "rating-completed": "green",
  "coach-assign":"indigo",
  "coach-review":"yellow"
};
