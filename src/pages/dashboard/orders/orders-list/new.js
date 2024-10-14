import { Avatar, Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import AdminCard from "components/general/Cards/AdminCard";
import { useSelector, useDispatch } from "react-redux";
import useAlert from "hooks/useAlert";
import { Box, Container } from "@mui/system";
import PhoneMaskInput from "components/general/Inputs/PhoneMaskInput";
import ProductAddToOrder from "components/general/Inputs/ProductAdd";
import {
  createManualOrder,
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "redux-store/admin/orders/orders.slice";
import { StyledIncDecBtn } from "components/admin/Dashboard/styledComponents";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "components/icons/DeleteIcon";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { reduxForm, Field } from "redux-form";
import TextInput from "components/general/Inputs/TextField";
import RegionSelectInput from "components/general/Inputs/RegionSelectInput";
import StyledTextArea from "components/general/Inputs/StyledTextArea";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import AddProductBySelect from "components/general/Inputs/AddProductBySelect";

const Page = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.orders.orderProducts);
  const isManualCreateLoading = useSelector(
    (state) => state.orders.isManualCreateLoading
  );

  const saveOrder = (values) => {
    values["orderItems"] = products.map((lg) => ({
      productId: lg?.productId?._id,
      quantity: lg?.quantity,
    }));
    dispatch(
      createManualOrder({
        data: values,
        alert,
        token,
      })
    );
  };

  const total = products?.reduce((acc, curr) => {
    let price = curr?.price ? curr?.price : curr?.productId?.price;
    let qty = curr?.quantity ? curr?.quantity : curr?.productId?.price;

    return acc + price * qty;
  }, 0);

  console.log("aaaaaaaa", products);
  return (
    <>
      <Head>
        <title>Vipcrm | {t("ForYourBusiness")}</title>
      </Head>
      <Box my={3}>
        <Container>
          <Stack>
            <Typography>{t("ManuallyAddOrder")}</Typography>
          </Stack>
          <Stack mt={2}>
            <AdminCard>
              <Grid container spacing={{ xs: 2, md: 4 }}>
                <Grid item xs={12} md={6}>
                  <Field
                    component={TextInput}
                    placeholder={t("ClientName")}
                    label={t("ClientName")}
                    name="name"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    component={PhoneMaskInput}
                    placeholder={t("PhoneNumber")}
                    label={t("PhoneNumber")}
                    name="phone"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    component={RegionSelectInput}
                    placeholder={t("Viloyati")}
                    label={t("Viloyati")}
                    name="city_id"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    component={TextInput}
                    placeholder={t("ClientFullName")}
                    label={t("ClientFullName")}
                    name="address"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={StyledTextArea}
                    rows={8}
                    multiple
                    placeholder={t("MoreInfors")}
                    label={t("MoreInfors")}
                    name="extra_info"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <AddProductBySelect />
                </Grid>
                <Grid item xs={12} mt={5} mb={2}>
                  <Stack direction="row" justifyContent="flex-end">
                    <LoadingButton
                      onClick={handleSubmit(saveOrder)}
                      variant="contained"
                      loading={isManualCreateLoading}
                    >
                      {t("AddOrder")}
                    </LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </AdminCard>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

function validate(values, props) {
  let errors = {};
  const requiredFields = ["name", "address", "phone", "city_id"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Iltimos malumotlarni to'liq kiriting";
    }
  });

  return errors;
}

export default reduxForm({
  form: "order_update_form",
  validate,
  enableReinitialize: true,
  initialValues: {
    city_id: 0,
    name: null,
    phone: null,
    address: null,
    extra_info: null,
  },
})(Page);
