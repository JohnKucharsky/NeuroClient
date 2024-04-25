import { Dialog, IconButton, Stack, TableCell } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Patient, ServerError } from "./types.ts";
import { Dispatch, SetStateAction, useState } from "react";
import EditPatient from "./EditPatient.tsx";
import axios from "axios";
import { SERVER_URL } from "./server_url.ts";
import ConfirmDelete from "./ConfirmDelete.tsx";

export default function PatientRow({
  patient,
  setPatients,
}: {
  patient: Patient;
  setPatients: Dispatch<SetStateAction<Patient[]>>;
}) {
  const [open, setOpen] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await axios.delete<{ patientID: string }>(
        SERVER_URL + `/${patient.guid}`,
      );
      setPatients((p) => p.filter((item) => item.guid !== res.data.patientID));
    } catch (err) {
      console.error((err as ServerError).response?.data?.error);
    }
  };

  return (
    <>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <EditPatient
          handleClose={() => setOpen(false)}
          setPatients={setPatients}
          initialValues={patient}
        />
      </Dialog>
      <Dialog
        onClose={() => setOpenConfirmDelete(false)}
        open={openConfirmDelete}
      >
        <ConfirmDelete
          handleClose={() => setOpenConfirmDelete(false)}
          handleDelete={handleDelete}
        />
      </Dialog>
      <TableCell component="th" scope="row">
        {patient.fullname}
      </TableCell>
      <TableCell>{patient.birthday}</TableCell>
      <TableCell>{patient.gender ? "female" : "male"}</TableCell>
      <TableCell>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <IconButton onClick={() => setOpen(true)}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton onClick={() => setOpenConfirmDelete(true)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </>
  );
}
