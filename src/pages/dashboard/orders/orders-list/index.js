import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  Tooltip,
  Table,
  TableBody,
  TableContainer,
  Pagination,
  Stack,
  Button,
  Skeleton,
} from "@mui/material";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { StyledBtnSkaner } from "components/admin/Dashboard/styledComponents";
import ScannerOutlined from "components/icons/ScannerOutlined";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import AdminCard from "components/general/Cards/AdminCard";
import FilterWrapper from "components/admin/Dashboard/FilterOrders";
import AdminTableHeader from "components/general/TableHead/Admin";
import heading from "constants/adminOrdersHeading";
import AdminOrdersRow from "components/admin/TableRows/AdminOrdersRow";
import { useDispatch, useSelector } from "react-redux";
import ScannerModal from "components/admin/Modals/ScannerModal";
import { statuses } from "utils/orderStatusList";
import useAlert from "hooks/useAlert";
import ManyUpdateModal from "components/admin/Modals/ManyUpdateModal";
import { getStatusText } from "utils/helpers";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import Link from "next/link";
import {
  getOrdersByStatus,
  handleMultipleSelect,
  clearSelection,
  updateOrders,
} from "redux-store/admin/orders/orders.slice";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import TableLimitSelector from "components/admin/Modals/TableLimitSelector";
import OrderFilters from "components/admin/Dashboard/OrderFilters";
import { getDashboardOrdersStats } from "redux-store/admin/dashboard/dashboard.slice";
import AddIcon from "@mui/icons-material/Add";
import { clearSelectedOrders } from "redux-store/checkbox/checkbox.slice";
import { useTranslation } from "react-i18next";

const OrderList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const limitParam = router?.query?.limit;
  const pageParam = router?.query?.page;
  const statusParam = router?.query?.status;

  const token = useSelector((state) => state.auth.token);
  const { list, pageCount, statusFilter, size, isListLoading, isLoading } =
    useSelector((state) => state.orders);

  const [scaner, setScaner] = useState(false);
  const [status, setStatus] = useState("");

  // const isUpdateLoading =
  const manyOrders = useSelector((state) => state.checkbox.orders);
  const orderCounts = useSelector((state) => state.statistcis.orderStatistics);

  const [modal, setModal] = useState(false);
  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const callBack = (success) => {
    handleCloseModal();
    dispatch(clearSelectedOrders());
    if (success) {
      alert.success({
        title: "Buyurtma",
        text: "Holatlari o'zgardi!",
      });
      clearSelection();
      const params = {
        status: statusParam,
        limit: limitParam,
        page: pageParam,
        region: router?.query?.regionQueryString,
      };
      if (
        router?.query?.from &&
        router?.query?.to &&
        router?.query?.from !== "undefined" &&
        router?.query?.to !== "undefined"
      ) {
        params["startDate"] = new Date(router?.query?.from);
        params["endDate"] = new Date(router?.query?.to);
      }
      dispatch(
        getOrdersByStatus({
          token,
          params,
        })
      );
      handleCloseModal();
    } else {
      clearSelection();
      handleCloseModal();
      alert.error({
        title: "Buyurtma",
        text: "Xatolik yuz berdi",
      });
    }
  };

  const changeOrdersStatus = () => {
    dispatch(
      updateOrders({
        token,
        params: { data: { status: status, orders: manyOrders }, callBack },
      })
    );
  };

  const openUpdateManyOrderModal = (e) => {
    setStatus(e.target.value);
    handleOpenModal();
  };

  // scaner modal
  const handleOpenScanner = () => setScaner(true);
  const handleCloseScanner = () => setScaner(false);

  const onSelectAll = (e) => {
    const allId = list?.map((item) => item?._id);
    dispatch(handleMultipleSelect(allId));
  };

  useEffect(() => {
    if (token && router?.query) {
      const params = {
        status: statusParam,
        limit: limitParam,
        page: pageParam,
        region: router?.query?.regionQueryString,
      };
      if (
        router?.query?.startTime &&
        router?.query?.endTime &&
        router?.query?.startTime !== "undefined" &&
        router?.query?.endTime !== "undefined"
      ) {
        params["startTime"] = new Date(router?.query?.startTime);
        params["endTime"] = new Date(router?.query?.endTime);
      }
      dispatch(
        getOrdersByStatus({
          token,
          params,
        })
      );
      dispatch(getDashboardOrdersStats({ token }));
    }
  }, [token, router?.query]);

  const handlePageChange = (event, newValue) => {
    const searchParams = new URLSearchParams();
    searchParams.append("page", newValue);
    searchParams.append("limit", limitParam);
    searchParams.append("status", statusParam);
    if (router?.query?.regionQueryString) {
      searchParams.append(
        "regionQueryString",
        router?.query?.regionQueryString
      );
    }
    router.push(`${router?.pathname}?${searchParams?.toString()}`);
  };
  return (
    <>
      <Head>
        <title>Vipcrm | {t("ForYourBusiness")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack py={4} pt={{ xs: 10, md: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" color="text.legacy">
                {t("Buyurtmalar")}
              </Typography>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={{ xs: "start", sm: "flex-end" }}
                  width="100%"
                >
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    gap="10px"
                  >
                    <Grid
                      container
                      xs={12}
                      display="flex"
                      alignItems="center"
                      gap="10px"
                    >
                      <Grid item xs={12} md={"auto"}>
                        {manyOrders?.length ? (
                          <TextField
                            size="small"
                            sx={{ backgroundColor: "background.main" }}
                            select
                            defaultValue="new"
                            onChange={openUpdateManyOrderModal}
                            fullWidth={{ xs: true, md: false }}
                          >
                            {statuses.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          ""
                        )}
                      </Grid>
                      <Grid item xs={5.5} md={"auto"}>
                        <Tooltip>
                          <TableLimitSelector status={statusParam} />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6} md={"auto"}>
                        <Tooltip title={t("ScanOrderQR")}>
                          <StyledBtnSkaner
                            variant="contained"
                            startIcon={<ScannerOutlined />}
                            onClick={handleOpenScanner}
                            fullWidth={{ xs: true, md: false }}
                          >
                            {t("Skaner")}
                          </StyledBtnSkaner>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12} md={"auto"}>
                        <Link href="/dashboard/orders/orders-list/new">
                          <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            color="primary"
                            size="small"
                            fullWidth={{ xs: true, md: false }}
                          >
                            {t("Buyurtma qo'shish")}
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AdminCard sx={{ p: 0, minHeight: "74vh" }}>
                <FilterWrapper
                  currStatus={statusFilter}
                  statusCount={size}
                  loading={isLoading}
                  page={parseInt(router?.query?.page)}
                  counts={orderCounts ? orderCounts : []}
                />
                <OrderFilters />
                {isListLoading ? (
                  <Stack px={2}>
                    {Array(parseInt(limitParam))
                      .fill()
                      .map((_, indx) => (
                        <Skeleton key={indx} height={70} />
                      ))}
                  </Stack>
                ) : !isListLoading && list.length > 0 ? (
                  <Stack alignItems="space-between">
                    <TableContainer>
                      <Table arial-label="simple table">
                        <AdminTableHeader
                          heading={heading}
                          onSelectAll={onSelectAll}
                          checked={
                            manyOrders?.length === list?.length &&
                            manyOrders.length > 0
                          }
                        />
                        <TableBody>
                          {list.map((item) => (
                            <AdminOrdersRow
                              key={item._id}
                              {...item}
                              page={parseInt(router?.query?.page)}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                ) : (
                  <Stack mt={15}>
                    <EmptyCard
                      txt={t("NoOrdersForThisState")}
                      img="/assets/media/noPayment.png"
                    />
                  </Stack>
                )}
                {list?.length === parseInt(limitParam) ||
                (pageCount === parseInt(pageParam) && pageCount > 1) ? (
                  <Stack
                    alignItems="center"
                    pt={2}
                    pb={6}
                    pr={{ xs: 0, md: 5 }}
                  >
                    <Pagination
                      siblingCount={0}
                      onChange={handlePageChange}
                      page={parseInt(pageParam)}
                      count={pageCount}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                    />
                  </Stack>
                ) : null}
              </AdminCard>
            </Grid>
          </Grid>
        </Stack>
        <ScannerModal open={scaner} handleClose={handleCloseScanner} />
        <ManyUpdateModal
          error={`${manyOrders.length} ${t(
            "PieceSelectedOrdersState"
          )} ${getStatusText(status)} ${t("ChangingTo")}`}
          open={modal}
          handleClose={handleCloseModal}
          handleSuccess={changeOrdersStatus}
        />
      </Container>
    </>
  );
};

OrderList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default OrderList;
