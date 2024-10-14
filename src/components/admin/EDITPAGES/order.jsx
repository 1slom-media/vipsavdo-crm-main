import { Field, reduxForm } from "redux-form";
import TextInput from "components/general/Inputs/TextField";
import {
  Grid,
  Stack,
  Typography,
  styled,
  Box,
  Avatar,
  InputAdornment,
  Divider,
} from "@mui/material";
import RegionSelect from "components/general/Inputs/RegionSelectInput";
import StyledTextArea from "components/general/Inputs/StyledTextArea";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import TelegramIcon from "@mui/icons-material/Telegram";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import OrderStatusSelect from "components/general/Inputs/OrderStatusSelect";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { updateOrder } from "redux-store/admin/orders/orders.slice";
import useAlert from "hooks/useAlert";
import { useTranslation } from "react-i18next";
import SelectExtraProduct from "../OrderAndProduct/AddProduct";
import CustomerOrderedProducts from "../OrderAndProduct/CustomerOrderedProducts";

const StyledDateContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: theme.palette.background.default,
  borderRadius: "20px",
  padding: "7px 15px",
}));

const AdminContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  padding: "15px 15px",
  borderRadius: "10px",
  marginTop: "10px",
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  width: "max-content",
  height: "max-content",
  borderRadius: "50%",
  padding: "5px",
  background: "#fff",
}));

const OrderEditForm = ({
  createdAt,
  number,
  name,
  streamHolder,
  handleSubmit,
  phone,
  takenById,
  _id,
  operator,
}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const isLoading = useSelector((state) => state.orders.isUpdateLoading);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.data.isAdmin);

  const callBack = (status) => {
    if (status == 200 || 201)
      alert.success({ title: "Buyurtma", text: "Tahrirlandi!" });
    else alert.error({ title: "Buyurtma", text: "Xatolik yuz berdi!" });
  };
  const handleEditOrders = (values) => {
    dispatch(
      updateOrder({
        params: { data: values, id: _id, callBack },
        token,
      })
    );
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <StyledDateContainer>
            <Stack
              direction="row"
              className="right_divider"
              gap={1}
              alignItems="center"
              mr={1}
            >
              <Typography variant="string">ID:</Typography>
              <Typography variant="string" color="text.legacy">
                {number}
              </Typography>
            </Stack>
            -
            <Stack direction="row" ml={1} gap={1} alignItems="center">
              <Typography variant="string">{t("Vaqti")}:</Typography>
              <Typography variant="string" color="text.legacy">
                {format(new Date(createdAt), "dd-MMMM, HH:mm", {
                  locale: uz,
                })}
              </Typography>
            </Stack>
          </StyledDateContainer>
          <LoadingButton
            startIcon={<SaveIcon />}
            loading={isLoading}
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleEditOrders)}
          >
            {t("Save")}
          </LoadingButton>
        </Stack>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid container spacing={2} item xs={12}>
          <Grid item xs={12}>
            <TextInput
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              disabled
              label={t("UserFullname")}
              value={name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              InputProps={{
                startAdornment: <PhoneIcon />,
              }}
              disabled
              label={t("OrdererNumber")}
              value={phone}
            />
          </Grid>
          <Grid item xs={12}>
            <Field component={OrderStatusSelect} name="status" />
          </Grid>
          <Grid item xs={12}>
            <Field component={RegionSelect} name="city_id" />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={StyledTextArea}
              name="extra_info"
              placeholder={t("MoreInfo")}
              size="small"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12}>
            <Field
              component={StyledTextArea}
              name="address"
              placeholder={t("FullAdd")}
              size="small"
            />
          </Grid>
          {user ? (
            <Grid item xs={12}>
              <Field
                component={StyledTextArea}
                name="message"
                placeholder={t("DescForAdmin")}
                size="small"
              />
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stack
          px={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>Buyurtma qilingan tovarlar</Typography>
          <Field component={SelectExtraProduct} name="orderItems" />
        </Stack>
        <Stack my={2} px={2}>
          <Divider />
        </Stack>
        <Field component={CustomerOrderedProducts} name="orderItems" />
      </Grid>
      <Grid item xs={12}>
        <Stack borderBottom="1px dashed" borderColor="rgba(0, 0, 0, 0.2)" />
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={12} md={6}>
          {streamHolder && (
            <Typography mb={3} variant="body1" color="text.legacy">
              {t("AdminInfo")}
            </Typography>
          )}
          {streamHolder && (
            <AdminContainer>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack direction="row" gap={2} alignItems="center">
                    <AvatarContainer>
                      <Avatar
                        src={streamHolder?.avatar}
                        alt={streamHolder?.name}
                        sx={{ width: "70px", height: "70px" }}
                      />
                    </AvatarContainer>
                    <Stack>
                      <Typography color="text.legacy">
                        {streamHolder?.name}
                      </Typography>
                      <Typography>{t("Admin")}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item container xs={12} spacing={3}>
                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <PhoneIcon sx={{ color: "#152C70" }} />
                      <Typography color="text.legacy">
                        {streamHolder?.phone}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <AlternateEmailIcon sx={{ color: "#152C70" }} />
                      <Typography color="text.legacy">
                        {streamHolder?.username}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <TelegramIcon sx={{ color: "#152C70" }} />
                      <Typography color="text.legacy">
                        {streamHolder?.telegramID}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <AccountBalanceWalletIcon sx={{ color: "#152C70" }} />
                      <Typography color="text.legacy">
                        {streamHolder?.balance?.toLocaleString()} so`m
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </AdminContainer>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {operator && (
            <Typography mb={3} variant="body1" color="text.legacy">
              {t("OperatorInfo")}
            </Typography>
          )}
          {operator ? (
            <AdminContainer>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack direction="row" gap={2} alignItems="center">
                    <AvatarContainer>
                      <Avatar
                        src={operator?.avatar}
                        alt={operator?.name}
                        sx={{ width: "70px", height: "70px" }}
                      />
                    </AvatarContainer>
                    <Stack>
                      <Typography color="text.legacy">
                        {operator?.name}
                      </Typography>
                      <Typography>{t("Operator")}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item container xs={12} spacing={3}>
                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <PhoneIcon sx={{ color: "#152C70" }} />
                      <Typography color="text.legacy">
                        {operator?.phone}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <AlternateEmailIcon sx={{ color: "#152C70" }} />
                      <Typography color="text.legacy">
                        {operator?.username}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <TelegramIcon sx={{ color: "#152C70" }} />
                      <Typography color="text.legacy">
                        {operator?.telegramID}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <AccountBalanceWalletIcon sx={{ color: "#152C70" }} />
                      <Typography color="text.legacy">
                        {operator?.balance?.toLocaleString()} so`m
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </AdminContainer>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

function validate(values, props) {
  let errors = {};
  const requiredFields = [
    "name",
    "referal_price",
    "price",
    "bought_price",
    "image",
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  if (!values.image || values.image.length === 0) {
    errors["image"] = "Malumot kiritilmadi!";
  }

  return errors;
}

export default reduxForm({
  form: "order_update_form",
  validate,
  enableReinitialize: true,
})(OrderEditForm);
