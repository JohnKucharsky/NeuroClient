import { date, number, object, string } from "yup";

export const yupSchema = object().shape({
  fullname: string().strict().max(64).required(),
  birthday: date()
    .nullable()
    .typeError("Wrong format")
    .min(new Date(1900, 0, 1))
    .max(new Date(2050, 0, 1))
    .required(),
  gender: number().required(),
});
