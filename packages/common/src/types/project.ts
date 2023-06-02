import { UserType } from "common";

export interface ProjectType {
  id: string;
  name: string;
  elevatorPitch: string;
  summary: string;
  captureValue: string;
  teamOverview: string;
  teamMembers: UserType[];
  leaderId: UserType["id"];
  slideLink: string;
  files: string[];
  createdAt: string;
  judge?: UserType;
  status?:
    | "judge-assign"
    | "judge-review"
    | "rating-completed"
    | "coach-assign"
    | "coach-review";
  overallRating?: number;
  rating?: Record<string, number>;
}
