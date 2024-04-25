import { Formik } from "formik";
import axios from "axios";
import { SERVER_URL } from "./server_url.ts";
import { Dispatch, SetStateAction } from "react";
import { Patient, ServerError } from "./types.ts";
import dayjs from "dayjs";
import { SameFields } from "./SameFields.tsx";
import Title from "./Title.tsx";
import { yupSchema } from "./yupSchema.ts";

const emptyInitialValues = {
  fullname: "",
  birthday: null as string | null,
  gender: "0",
  submit: null as unknown,
};

export default function CreatePatient({
  handleClose,
  setPatients,
}: {
  handleClose: () => void;
  setPatients: Dispatch<SetStateAction<Patient[]>>;
}) {
  return (
    <>
      <Title handleClose={handleClose} title={"Create patient"} />
      <Formik
        initialValues={emptyInitialValues}
        validationSchema={yupSchema}
        onSubmit={async (
          values,
          { resetForm, setErrors, setStatus, setSubmitting },
        ) => {
          const valuesToSend = {
            fullname: values.fullname,
            birthday: dayjs(values.birthday).format("YYYY-MM-DD"),
            gender: Number(values.gender),
          };

          try {
            const res = await axios.post<{ patient: Patient }>(SERVER_URL, {
              ...valuesToSend,
            });
            setPatients((p) => [res.data.patient, ...p]);
            handleClose();

            resetForm();
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({
              submit: (err as ServerError).response?.data?.error,
            });
            setSubmitting(false);
          }
        }}
      >
        {(formikProps) => (
          <SameFields
            formikProps={formikProps}
            handleClose={handleClose}
            text={"Create patient"}
          />
        )}
      </Formik>
    </>
  );
}
