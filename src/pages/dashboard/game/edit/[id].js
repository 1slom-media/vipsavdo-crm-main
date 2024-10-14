import { Box, Container } from "@mui/system";
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextInput from "components/general/Inputs/TextField";
import CalendarInput from "components/general/Inputs/CalendarInput";
import { Card, CardContent, Grid } from "@mui/material";
import { Field, getFormValues, reduxForm } from "redux-form";
import ImagePicker from "components/general/Inputs/ImagePicker";
import ReactQuill from "components/general/Inputs/ReactQuill";
import { useDispatch } from "react-redux";
import { postAdminGame } from "redux-store/admin/game/game.slice";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import useAlert from "hooks/useAlert";
import { useRouter } from "next/router";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import ImgCard from "components/general/Cards/ImgCard";
import { useTranslation } from "react-i18next";

const Page = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isGameLoading = useSelector((state) => state.game.isGameLoading);

  const id = router.asPath?.slice(21);
  const handleClose = () => router.push("/dashboard/game");

  const callBack = () => {
    handleClose();
  };

  const addGame = (values) => {
    const form = new FormData();
    form.append("name", values.name);
    form.append("content", values.content);
    form.append("startTime", values.startTime);
    form.append("endTime", values.endTime);
    values.image.forEach((file) => {
      form.append("banner", file);
    });
    dispatch(postAdminGame({ token, data: form, alert, callBack, id }));
  };

  const form = useSelector((state) => getFormValues("game_modal")(state));

  return (
    <Box pt={3} pb={3}>
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h5" color="text.legacy" textAlign="left" mb={2}>
            {t("EditGame")}
          </Typography>
        </Box>
        <Card>
          <CardContent>
            <Box>
              <Typography variant="body1" color="text.legacy" mb={1.5}>
                {t("UploadImage")}
              </Typography>
              <Box>
                <Field component={ImagePicker} name="image" />
              </Box>
              <Grid item xs={12} mb={2}>
                <Grid container spacing={2}>
                  {form?.image?.map((item, key) => (
                    <Grid key={key} item xs={4} md={1.5}>
                      <Field
                        component={ImgCard}
                        name="image"
                        img={URL.createObjectURL(item)}
                        obj={item}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box mb={2}>
                <Typography variant="body1" color="text.legacy" mb={1.5}>
                  {t("GameName")}
                </Typography>
                <Field
                  component={TextInput}
                  size="small"
                  label={t("TypeNameGame")}
                  name="name"
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body1" color="text.legacy" mb={1.5}>
                  {t("AboutGame")}
                </Typography>
                <Field
                  component={ReactQuill}
                  name="content"
                  placeholder={t("AboutGame")}
                  theme="snow"
                  box_height={150}
                />
              </Box>
              <Box mb={2.5}>
                <Typography variant="body1" color="text.legacy" mb={1.5}>
                  {t("GameDuration")}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Field
                      component={CalendarInput}
                      meta="change"
                      label={t("From") + "..."}
                      name="startTime"
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field
                      component={CalendarInput}
                      meta="change"
                      label={t("To") + "..."}
                      name="endTime"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box gap={3} display="flex" justifyContent="end">
                <Button variant="contained" color="error" onClick={handleClose}>
                  {t("Cancel")}
                </Button>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  loading={isGameLoading}
                  onClick={handleSubmit(addGame)}
                >
                  {t("Renew")}
                </LoadingButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

function validate(values, _) {
  let errors = {};
  const requiredFields = ["banner", "content", "endTime", "startTime", "name"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  return errors;
}

export default reduxForm({
  form: "game_modal",
  validate,
  enableReinitialize: true,
  initialValues: {
    name: "",
    banner: null,
    content: "",
    endTime: "",
    startTime: "",
  },
})(Page);
