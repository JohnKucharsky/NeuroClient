import { AxiosError } from "axios";

export interface Patient {
  birthday: string;
  fullname: string;
  gender: number;
  guid: string;
}

export type ServerError = AxiosError<{
  error: string;
}>;
