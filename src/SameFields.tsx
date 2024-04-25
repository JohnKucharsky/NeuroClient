import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import DateInput from "./DateInput.tsx";
import OutlinedInputEl from "./OutlinedInputEl.tsx";
import { FormikProps } from "formik";

export const SameFields = ({
  formikProps: {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
    values,
    setFieldValue,
  },
  handleClose,
  text,
}: {
  formikProps: FormikProps<{
    fullname: string;
    birthday: string | null;
    gender: string;
    submit: unknown;
  }>;
  handleClose: () => void;
  text: string;
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent
        dividers
        sx={{
          px: { xs: 1, sm: 2, s: 3 },
          py: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DateInput
              touched={touched.birthday}
              error={errors.birthday}
              label={"Birthday"}
              name="birthday"
              value={values.birthday}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedInputEl
              touched={touched.fullname}
              error={errors.fullname}
              label={"Full name"}
              name={"fullname"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.fullname}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                value={values.gender}
                onChange={(e) => {
                  setFieldValue("gender", e.target.value);
                }}
                onBlur={handleBlur}
                error={Boolean(touched.gender && errors.gender)}
                displayEmpty
              >
                {["0", "1"].map((item) => (
                  <MenuItem key={item} value={item}>
                    {{ "0": "Male", "1": "Female" }[item]}
                  </MenuItem>
                ))}
                <MenuItem value={""}>Not selected</MenuItem>
              </Select>
              {touched && (
                <FormHelperText error>{errors.gender}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          py: 3,
          px: { xs: 1, sm: 2, s: 3 },
        }}
      >
        {errors.submit ? (
          <FormHelperText error>{errors.submit}</FormHelperText>
        ) : null}
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
          disabled={Boolean(errors.submit) || isSubmitting}
          variant="contained"
        >
          {text}
        </Button>
      </DialogActions>
    </form>
  );
};
