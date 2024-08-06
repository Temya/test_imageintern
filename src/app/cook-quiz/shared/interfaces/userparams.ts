import { UserData } from "./userdata";

export interface UserParams {
  limit: number;
  skip: number;
  total: number;
  users: UserData[];
}
