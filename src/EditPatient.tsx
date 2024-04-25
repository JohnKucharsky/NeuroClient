import { Formik } from "formik";
import axios from "axios";
import { SERVER_URL } from "./server_url.ts";
import { Dispatch, SetStateAction } from "react";
import { Patient, ServerError } from "./types.ts";
import dayjs from "dayjs";
import { SameFields } from "./SameFields.tsx";
import Title from "./Title.tsx";
import { yupSchema } from "./yupSchema.ts";

export default function EditPatient({
  handleClose,
  setPatients,
  initialValues,
}: {
  handleClose: () => void;
  setPatients: Dispatch<SetStateAction<Patient[]>>;
  initialValues: Patient;
}) {
  return (
    <>
      <Title handleClose={handleClose} title={"Edit patient"} />
      <Formik
        initialValues={{
          fullname: initialValues.fullname,
          birthday: initialValues.birthday as string | null,
          gender: String(initialValues.gender),
          submit: null as unknown,
        }}
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
            const res = await axios.put<{ patient: Patient }>(
              SERVER_URL + `/${initialValues.guid}`,
              {
                ...valuesToSend,
              },
            );
            setPatients((p) => {
              return p.map((item) => {
                if (item.guid === res.data.patient.guid) {
                  return res.data.patient;
                }
                return item;
              });
            });
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
            text={"Edit patient"}
          />
        )}
      </Formik>
    </>
  );
}
