import { Box, Button, Stack, Typography } from "@mui/material";

export default function ConfirmDelete({
  handleClose,
  handleDelete,
}: {
  handleClose: () => void;
  handleDelete: () => void;
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p={{ xs: 1, sm: 2, s: 3, md: 4 }}
    >
      <Typography
        align="center"
        sx={{
          py: 2,
          px: { xs: 1, sm: 2, s: 3 },
        }}
        variant="h4"
      >
        Are you sure you want to delete this patient?
      </Typography>

      <Stack direction={"row"} spacing={2}>
        <Button variant="text" size="large" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          size="large"
          variant="contained"
          color={"error"}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
}
