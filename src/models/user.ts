export interface IUser {
  id: number;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
  role: string;
  name?: string;
  submissionDate: string;
}
