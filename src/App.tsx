import {
  Box,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { ColorModeContext } from "./Layout.tsx";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import PatientRow from "./PatientRow.tsx";
import { Patient } from "./types.ts";
import CreatePatient from "./CreatePatient.tsx";
import { SERVER_URL } from "./server_url.ts";

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    axios
      .get<{ patients: Patient[] }>(SERVER_URL)
      .then((res) => setPatients(res.data.patients))
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <Dialog onClose={() => setDialogOpened(false)} open={dialogOpened}>
        <CreatePatient
          handleClose={() => setDialogOpened(false)}
          setPatients={setPatients}
        />
      </Dialog>
      <Box p={2}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            variant={"h4"}
            color={(theme) => theme.palette.text.primary}
            mb={1}
          >
            Patients
          </Typography>

          <IconButton
            sx={{ ml: 1, color: "text.primary" }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={600}>Full Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Birthday</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Gender</Typography>
                </TableCell>
                <TableCell padding={"checkbox"} align={"center"}>
                  <IconButton onClick={() => setDialogOpened(true)}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((row) => (
                <TableRow
                  key={row.guid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <PatientRow patient={row} setPatients={setPatients} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default App;
