import { Button, Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import CustomerProfileLayout from "../../../../../components/admin/CustomerView/layout";
import { customerNavigations } from "../../../../../constants/navigations";
import AdminCard from "../../../../../components/general/Cards/AdminCard";
import { LoadingButton } from "@mui/lab";
import PasswordInputField from "../../../../../components/general/Inputs/PasswordInput";
import CheckLineOutlined from "../../../../../components/icons/CheckLineOutlined";
import DeleteXOutlined from "../../../../../components/icons/DeleteXOutlined";
import { updateCustomer } from "../../../../../redux-store/admin/customers/customers.slice";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "../../../../../hooks/useAlert";
import { useRouter } from "next/router";
import { Field, reduxForm } from "redux-form";
import { AuthGuard } from "../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../components/dashboard/dashboard-layout";
import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";

const Page = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.customers.isUpdateLoading);

  const callBack = (success) => {
    if (success) alert.success({ title: "Parol", text: "Parol o'zgartirildi" });
    else alert.error({ title: "Parol", text: "Xatolik yuz berdi" });
  };

  const handleEditUserPassword = (values) => {
    dispatch(
      updateCustomer({
        token,

        params: {
          id: router.query.id,
          data: { password: values.password },
          callBack,
        },
      })
    );
  };

  return (
    <>
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack my={3}>
          <CustomerProfileLayout navs={customerNavigations}>
            <AdminCard sx={{ p: 0 }}>
              <Stack px={3}>
                <Grid container spacing={2} my={2}>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      borderRight: "1px solid rgb(230, 230, 230)",
                      pr: "20px",
                    }}
                  >
                    <Typography variant="body2" color="text.legacy" mb={1}>
                      {t("Sozlamalar")}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          component={PasswordInputField}
                          placeholder="Yangi parol"
                          size="small"
                          name="password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          component={PasswordInputField}
                          placeholder="Parolni qayta kiriting"
                          name="re_password"
                          size="small"
                        />
                      </Grid>
                    </Grid>

                    <Stack px={3} mt={2}>
                      <Stack
                        mt={2}
                        direction="row"
                        alignItems="center"
                        gap="20px"
                        justifyContent="flex-end"
                      >
                        <Button variant="contained" color="disabled">
                          BEKOR QILISH
                        </Button>
                        <LoadingButton
                          onClick={handleSubmit(handleEditUserPassword)}
                          variant="contained"
                          loading={isLoading}
                        >
                          Saqlash
                        </LoadingButton>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.legacy" mb={1}>
                      Yangi parol quyidagi shartlarga mos kelishi kerak
                    </Typography>
                    <Stack
                      direction="row"
                      my={1}
                      justifyContent="flex-start"
                      alignItems="center"
                      gap="10px"
                    >
                      <CheckLineOutlined />
                      <Typography variant="body1" color="text.lightGray">
                        8 ta belgidan kam bo`lmasligi
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      my={1}
                      justifyContent="flex-start"
                      alignItems="center"
                      gap="10px"
                    >
                      <CheckLineOutlined />
                      <Typography variant="body1" color="text.lightGray">
                        1 ta kichik harf qatnashganligi
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      my={1}
                      justifyContent="flex-start"
                      alignItems="center"
                      gap="10px"
                    >
                      <DeleteXOutlined />
                      <Typography variant="body1" color="text.lightGray">
                        1 ta katta harf qatnashganligi
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      my={1}
                      justifyContent="flex-start"
                      alignItems="center"
                      gap="10px"
                    >
                      <CheckLineOutlined />
                      <Typography variant="body1" color="text.lightGray">
                        1 ta raqam qatnashganligi
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      my={1}
                      justifyContent="flex-start"
                      alignItems="center"
                      gap="10px"
                    >
                      <CheckLineOutlined />
                      <Typography variant="body1" color="text.lightGray">
                        1 ta maxsus belgi borligi
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </AdminCard>
          </CustomerProfileLayout>
        </Stack>
      </Container>
    </>
  );
};

function validate(values, props) {
  let errors = {};
  const requiredFields = ["password", "re_password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  return errors;
}

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default reduxForm({
  form: "user_password_edit",
  validate,
})(Page);
