import { Stack, Typography } from "@mui/material";
import { reduxForm, Field } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import useAlert from "hooks/useAlert";
import { Box, Container } from "@mui/system";
import ProductCreateStepper from "components/admin/product-details/Stepper";
import { useRouter } from "next/router";
import SKUUpdateForm from "./SKUUPdateFOrm";
import { updateSKUList } from "redux-store/product-sku/productSKU.slice";

const ProductCreateAndEditSKU = ({ handleSubmit, isLoading, ...rest }) => {
  const alert = useAlert();
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();
  const dispatch = useDispatch();

  const callback = () => {
    router.push("/dashboard/products/products-list");
  };

  const handleUpdateSKUList = (values) => {
    dispatch(
      updateSKUList({ token, alert, data: { ...values?.data }, callback })
    );
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
        px: { xs: 0, md: 3, lg: 6 },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 1 }, py: { xs: 6, md: 1 } }}>
        <Stack>
          <Typography variant="h5" color="text.legacy" mb={2}>
            Tovar SKU tahriri
          </Typography>
        </Stack>
        <Stack mb={4}>
          <ProductCreateStepper
            isLoading={isLoading}
            step={1}
            onSave={handleSubmit(handleUpdateSKUList)}
          />
        </Stack>
        <Field component={SKUUpdateForm} name="data" />
      </Container>
    </Box>
  );
};

function validate(values, props) {
  let errors = {};

  return errors;
}

export default reduxForm({
  form: "product_SKU_UPDATE",
  touchOnBlur: false,
  validate,
  enableReinitialize: true,
})(ProductCreateAndEditSKU);
