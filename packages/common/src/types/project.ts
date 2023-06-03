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
  updateAt: number;
  judge?: UserType;
  status?:
    | "idea-generation"
    | "judge-assign"
    | "judge-review"
    | "rating-completed"
    | "coach-assign"
    | "coach-review";
  overallRating?: number;
  rating?: Record<string, number>;
}
