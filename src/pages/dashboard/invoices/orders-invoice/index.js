import { useEffect, useRef, useState } from "react";
import Head from "next/head";
// import { endOfDay, startOfDay } from "date-fns";
import {
  Box,
  Button,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { InvoiceListFilters } from "components/dashboard/invoice/invoice-list-filters";
import { InvoiceListTable } from "components/dashboard/invoice/invoice-list-table";
import { Filter as FilterIcon } from "icons/filter";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { gtm } from "lib/gtm";
import { getInvoiceListByStatus } from "redux-store/invoice/invoice.slice";
import { useDispatch, useSelector } from "react-redux";
import InvoiceStatusTabs from "components/dashboard/invoice/invoice-tabs";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const InvoiceListInner = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  overflow: "hidden",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  zIndex: 1,
  [theme.breakpoints.up("lg")]: {
    marginLeft: -380,
  },
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up("lg")]: {
      marginLeft: 0,
    },
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const InvoiceList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const { isGetLoading, list, size, pageCount } = useSelector(
    (state) => state.invoice
  );

  const rootRef = useRef(null);

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
    noSsr: true,
  });
  const [openFilters, setOpenFilters] = useState(mdUp);

  const [filters, setFilters] = useState({
    filter: "",
    from: null,
    to: null,
    customer: [],
  });

  useEffect(() => {
    if (token && router?.query) {
      dispatch(
        getInvoiceListByStatus({
          token,

          params: {
            filter: router?.query?.filter,
            status: router?.query?.status,
            limit: router?.query?.limit,
            page: router?.query?.page,
            region: router?.query?.region,
            from: router?.query?.from,
            to: router?.query?.to,
          },
        })
      );
    }
    gtm.push({ event: "page_view" });
  }, [token, router?.query]);

  const handleToggleFilters = () => {
    setOpenFilters((prevState) => !prevState);
  };

  const handleChangeFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const handlePageChange = (event, newPage) => {
    const limit = router?.query?.limit;
    const status = router?.query?.status;
    router.push(
      `/dashboard/invoices/orders-invoice?page=${newPage}&limit=${limit}&status=${status}`
    );
  };

  const handleRowsPerPageChange = (event) => {
    const page = router?.query?.page;
    const status = router?.query?.limit;
    router.push(
      `/dashboard/invoices/orders-invoice?page=${page}&limit=${event.target.value}&status=${status}`
    );
  };

  return (
    <>
      <Head>
        <title>Vipcrm | {t("ForYourBusiness")}</title>
      </Head>
      <Box
        component="main"
        ref={rootRef}
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <InvoiceListFilters
          containerRef={rootRef}
          filters={filters}
          onChange={handleChangeFilters}
          onClose={handleCloseFilters}
          open={openFilters}
        />
        <InvoiceListInner open={openFilters}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={3} justifyContent="space-between">
              <Grid item>
                <Typography variant="h4">{t("Invoices")}</Typography>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <Button
                  endIcon={<FilterIcon fontSize="small" />}
                  onClick={handleToggleFilters}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  {t("Filters")}
                </Button>
                <Tooltip title={t("ViewFilteredInvoices")}>
                  <Button
                    startIcon={<VisibilityIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="contained"
                    component="a"
                    href={`/dashboard/invoices/invoice-print-list-view?status=${router?.query?.status}&region=${router?.query?.region}`}
                  >
                    {t("ViewInvoices")}
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
            <InvoiceStatusTabs />
          </Box>
          <InvoiceListTable
            invoices={list}
            invoicesCount={pageCount}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={parseInt(router?.query?.page)}
            rowsPerPage={parseInt(router?.query?.limit)}
          />
        </InvoiceListInner>
      </Box>
    </>
  );
};

InvoiceList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default InvoiceList;
