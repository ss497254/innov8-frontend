import { ProjectType } from "../../types";
import { BadgeTypes } from "../../ui";

export const StatusBadgeMap: Record<
  Exclude<ProjectType["status"], undefined>,
  keyof typeof BadgeTypes
> = {
  "admin-review": "blue",
  "judge-review": "purple",
  "rating-completed": "green",
};
