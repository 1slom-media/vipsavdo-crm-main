import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";
import { useTranslation } from "react-i18next";

export const AmplifyPasswordRecovery = (props) => {
  const router = useRouter();
  const isMounted = useMounted();
  const { passwordRecovery } = useAuth();
  const { t } = useTranslation("translation");

  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("ValidEmail"))
        .max(255)
        .required(t("RequiredEmail")),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await passwordRecovery(values.email);

        if (isMounted()) {
          sessionStorage.setItem("username", values.email);
          router.push("/authentication/password-reset").catch(console.error);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <TextField
        autoFocus
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label={t("EmailAddress")}
        margin="normal"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
      />
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 3 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {t("RecoverPassword")}
        </Button>
      </Box>
    </form>
  );
};
