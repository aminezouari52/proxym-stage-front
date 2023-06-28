export interface ICreateSessionPayload {
  title: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
  deadlineDate: Date;
  description: string;
  maxCandidates: number;
}
