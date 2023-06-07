import { HypothesesType } from "./hypotheses";
import { UserType } from "./user";

export interface InterviewType {
  id: string;
  interviewTitle: string;
  name: string;
  projectId: string;
  teamMembers: UserType[];
  hypotheses: HypothesesType;
  coach: UserType;
  rating?: Record<string, number>;
  updatedAt: string;
}
