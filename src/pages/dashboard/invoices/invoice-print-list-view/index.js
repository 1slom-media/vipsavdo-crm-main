import React, { useEffect } from "react";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import AdminCard from "components/general/Cards/AdminCard";
import Head from "next/head";
import classes from "./style.module.css";
import { QRCodeCanvas } from "qrcode.react";
import { regions } from "utils/regions";
import ReactToPrint from "react-to-print";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  setNameinCheck,
  setQrInCheck,
} from "redux-store/settings/settings.slice";
import { useTranslation } from "react-i18next";
import { getInvoiceListByStatus } from "redux-store/invoice/invoice.slice";
import { useRouter } from "next/router";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Page = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");
  const router = useRouter();

  const token = useSelector((state) => state.auth.token);
  const { isNameOff, isQrOff } = useSelector((state) => state.settings);
  const componentRef = React.useRef(null);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 250,
      },
    },
  };

  const [fontSize, setFont] = React.useState(11);
  const [columnsSize, setColumns] = React.useState(6);
  const [contact, setContact] = React.useState(null);

  const handleChange = (event) => {
    setFont(event.target.value);
  };

  const handleColumnChange = (event) => {
    setColumns(event.target.value);
  };

  const { isGetLoading, list, size, pageCount } = useSelector(
    (state) => state.invoice
  );

  useEffect(() => {
    if (token && router?.query) {
      dispatch(
        getInvoiceListByStatus({
          token,
          params: {
            filter: router?.query?.filter,
            status: router?.query?.status,
            region: router?.query?.region,
            from: router?.query?.from,
            to: router?.query?.to,
            limit: router?.query?.limit,
          },
        })
      );
    }
  }, [token, router?.query]);

  const result = new Array(Math.ceil(list?.length / 6))
    .fill("")
    .map((_, i) => list.slice(i * 6, (i + 1) * 6));

  const totalPriceForPrint = list.reduce((a, b) => {
    const singleTotalPrice = b?.products?.reduce((d, e) => {
      return d + e?.price * e?.quantity;
    }, 0);
    return a + singleTotalPrice;
  }, 0);

  return (
    <>
      <Head>
        <title>VIPSAVDO | {t("ChosenInvoices")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack my={4}>
          <Stack
            mb={3}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>{t("Checklar")}</Typography>
            <ReactToPrint
              trigger={() => (
                <Button startIcon={<LocalPrintshopIcon />} variant="contained">
                  {t("Chiqarish")}
                </Button>
              )}
              content={() => componentRef.current}
            />
          </Stack>
          <Stack>
            <AdminCard sx={{ p: 0 }}>
              <Stack mb={2} p={3}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4} lg={2}>
                    <FormControl fullWidth>
                      <InputLabel size="small" id="demo-simple-select-label">
                        {t("FontSize")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fontSize}
                        label={t("FontSize")}
                        size="small"
                        onChange={handleChange}
                        MenuProps={MenuProps}
                      >
                        {Array(30)
                          .fill()
                          .map((_, indx) => (
                            <MenuItem key={indx} value={indx + 1}>
                              {indx + 1}px
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={4} lg={2}>
                    <FormControl fullWidth>
                      <InputLabel size="small" id="demo-simple-select-label">
                        {t("SetNumColumn")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={columnsSize}
                        label={t("FontSize")}
                        size="small"
                        onChange={handleColumnChange}
                        MenuProps={MenuProps}
                      >
                        {[
                          { count: 12, label: "1 " + t("Qator") },
                          { count: 6, label: "2 " + t("Qator") },
                          { count: 4, label: "3 " + t("Qator") },
                          { count: 3, label: "4 " + t("Qator") },
                          { count: 2, label: "6 " + t("Qator") },
                        ].map((item, indx) => (
                          <MenuItem key={indx} value={item.count}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={4} lg={2}>
                    <TextField
                      placeholder="Aloqa raqami"
                      label="Aloqa raqami"
                      size="small"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={4} lg={2}>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          sx={{ m: 1 }}
                          checked={!isQrOff}
                          onChange={() => dispatch(setQrInCheck())}
                        />
                      }
                      label={t("ViewQR")}
                    />
                  </Grid>
                  <Grid item xs={6} md={4} lg={2}>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          sx={{ m: 1 }}
                          checked={!isNameOff}
                          onChange={() => dispatch(setNameinCheck())}
                        />
                      }
                      label={t("ViewSiteName")}
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack my={2}>
                <Divider />
              </Stack>
              <AdminCard
                sx={{
                  borderRadius: 0,
                  background: "#F9FAFC",
                  boxShadow: "none",
                }}
              >
                <Stack ref={componentRef}>
                  {result?.map((item, key) => {
                    return (
                      <div key={key} className={classes.container}>
                        {item?.map((order) => {
                          const city = regions.find(
                            (reg) => reg.id === order.city_id
                          );
                          const totalPrice = order?.products?.reduce((a, b) => {
                            return a + b.price * b?.quantity;
                          }, 0);
                          const prNames = order?.products?.map((pr) => {
                            return (
                              pr?.quantity +
                              " " +
                              "dona" +
                              "  " +
                              pr.title[router.locale]
                            );
                          });
                          return (
                            <div
                              key={order._id}
                              className={classes.check_container}
                            >
                              <table className={classes.table_container}>
                                <tbody>
                                  <tr
                                    className={`${classes.tr_bottom_border} ${classes.t_row}`}
                                  >
                                    <th className={classes.t_head}>
                                      {t("OrderedTime")}
                                    </th>
                                    <td className={classes.t_detail}>
                                      {order?.createdAt &&
                                        format(
                                          new Date(order?.createdAt),
                                          "dd-MMMM, yyyy, HH:mm",
                                          { locale: uz }
                                        )}
                                    </td>
                                  </tr>
                                  <tr
                                    className={`${classes.tr_bottom_border} ${classes.t_row}`}
                                  >
                                    <th className={classes.t_head}>
                                      {t("OrderSent")}:
                                    </th>
                                    <td className={classes.t_detail}>
                                      {order?.createdAt &&
                                        format(
                                          new Date(),
                                          "dd-MMMM, yyyy, HH:mm",
                                          {
                                            locale: uz,
                                          }
                                        )}
                                    </td>
                                  </tr>
                                  <tr
                                    className={`${classes.tr_bottom_border} ${classes.t_row}`}
                                  >
                                    <th className={classes.t_head}>
                                      {t("Orderer")}:
                                    </th>
                                    <td className={classes.t_detail}>
                                      {order.name}
                                    </td>
                                  </tr>
                                  <tr
                                    className={`${classes.tr_bottom_border} ${classes.t_row}`}
                                  >
                                    <th className={classes.t_head}>
                                      {t("Telefon")}:
                                    </th>
                                    <td className={classes.t_detail}>
                                      {order.phone}
                                    </td>
                                  </tr>
                                  <tr
                                    className={`${classes.tr_bottom_border} ${classes.t_row}`}
                                  >
                                    <th className={classes.t_head}>
                                      {t("Address")}:
                                    </th>
                                    <td className={classes.t_detail}>
                                      {city?.label}
                                      {order?.address
                                        ? `-${order.address}`
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr
                                    className={`${classes.tr_bottom_border} ${classes.t_row}`}
                                  >
                                    <th className={classes.t_head}>
                                      {t("Buyurtmalar")}:
                                    </th>
                                    <td className={classes.t_detail}>
                                      {prNames}
                                    </td>
                                  </tr>
                                  <tr
                                    className={`${classes.tr_bottom_border} ${classes.t_row}`}
                                  >
                                    <th className={classes.t_head}>
                                      {t("Narxi")}:
                                    </th>
                                    <td className={classes.t_detail}>
                                      {totalPrice?.toLocaleString()} so`m
                                    </td>
                                  </tr>
                                  <tr
                                    className={`${classes.tr_bottom_border} ${classes.t_row}`}
                                  >
                                    <th className={classes.t_head}>
                                      {t("MoreInfoo")}:
                                    </th>
                                    <td className={classes.t_detail}>
                                      {order?.extra_info}
                                    </td>
                                  </tr>
                                  <tr
                                    className={`${classes.tr_bottom_border} ${classes.t_row}`}
                                  >
                                    <th className={classes.t_head}>
                                      {t("Operator")}:
                                    </th>
                                    <td className={classes.t_detail}>
                                      {contact}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className={classes.t_head}>
                                      {t("OrderNumber")}:
                                    </th>
                                    <td className={classes.t_detail}>
                                      {order?.orderId}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <Stack pl={1.5}>
                                {!isQrOff && (
                                  <QRCodeCanvas
                                    id="qrCode"
                                    value={order?.number}
                                    size={60}
                                    level={"H"}
                                  />
                                )}
                                {!isNameOff && (
                                  <span style={{ color: "#000000" }}>
                                    Baroka.uz
                                  </span>
                                )}
                              </Stack>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                  <Stack
                    sx={{ pageBreakBefore: "always", padding: "40px 0px" }}
                  >
                    <Stack direction="row" alignItems="center" mb={2} pl={2}>
                      <Typography color="#000000" variant="subtitle1">
                        {t("TotalAmount")}:
                      </Typography>
                      <Typography color="#000000" variant="subtitle1" ml={2}>
                        {list?.length} {t("Dona")}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" mb={2} pl={2}>
                      <Typography color="#000000" variant="subtitle1">
                        {t("OverallPrice")}:
                      </Typography>
                      <Typography color="#000000" variant="subtitle1" ml={2}>
                        {totalPriceForPrint?.toLocaleString()} so`m
                      </Typography>
                    </Stack>
                    <Stack pl={2}>
                      <Grid container spacing={2}>
                        {regions.map((reg) => {
                          const qty = list?.filter(
                            (ty) => ty.city_id === reg.id
                          );

                          const totalPriceForCity = qty.reduce((a, b) => {
                            const singleTotalPrice = b.products.reduce(
                              (d, e) => {
                                return d + e?.price * e?.quantity;
                              },
                              0
                            );
                            return a + singleTotalPrice;
                          }, 0);

                          return (
                            <Grid key={reg.id} item xs={6} sm={4} md={4}>
                              <Stack>
                                <Typography color="#000000">
                                  {reg.label}
                                </Typography>
                                <Stack direction="row" alignItems="center">
                                  <Typography color="#000000">
                                    {t("Amount")}:
                                  </Typography>
                                  <Typography color="#000000" ml={2}>
                                    {qty.length} {t("Dona")}
                                  </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center">
                                  <Typography color="#000000">
                                    {t("Summa")}:
                                  </Typography>
                                  <Typography color="#000000" ml={2}>
                                    {totalPriceForCity?.toLocaleString()} so`m
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Stack>
                  </Stack>
                </Stack>
              </AdminCard>
            </AdminCard>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Page;
