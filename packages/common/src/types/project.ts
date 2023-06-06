import { UserType } from "common";

export interface ProjectType {
  id: string;
  name: string;
  elevatorPitch: string;
  summary: string;
  captureValue: string;
  teamOverview: string;
  teamMembers: UserType[];
  slideLink: string;
  files: string[];
  updatedAt: number;
  judge?: UserType;
  coach?: UserType;
  hasHypotheses?: boolean;
  status?:
    | "draft"
    | "judge-assign"
    | "judge-review"
    | "rating-completed"
    | "coach-assign"
    | "coach-review";
  overallRating?: number;
  rating?: Record<string, number>;
}
