import { HypothesesType } from "./hypotheses";
import { UserType } from "./user";

export interface InterviewType extends HypothesesType {
  id: string;
  interviewTitle: string;
  name: string;
  projectId: string;
  teamMembers: UserType[];
  coach: UserType;
  completed?: boolean;
  rating?: Record<string, number>;
  updatedAt: string;
}
