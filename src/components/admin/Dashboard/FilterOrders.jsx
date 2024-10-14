import { Box, Divider, Grid, Tab, Tabs, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStatusText, getColor } from "utils/helpers";
import { useRouter } from "next/router";
import { Stack } from "@mui/system";
import SearchModal from "../Modals/OrdersSearchModal";
import { StyledResetIcon } from "./styledComponents";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useSelector } from "react-redux";
import { getOrdersByStatus } from "redux-store/admin/orders/orders.slice";
import { getDashboardOrdersStats } from "redux-store/admin/dashboard/dashboard.slice";
import { useTranslation } from "react-i18next";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "35px",
  maxWidth: "100%",
  padding: "8px 0",
  [theme.breakpoints.down("sm")]: {
    gap: "15px",
  },
}));

export default function FilterWrapper({ counts }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { t } = useTranslation();

  const status = [
    "new",
    "ready",
    "onway",
    "delivered",
    "pending",
    "canceled",
    "hold",
    "archived",
  ];

  const isLoading = useSelector((state) => state.orders.isUpdateLoading);
  const { list, pageCount, statusFilter, size } = useSelector(
    (state) => state.orders
  );
  const statusParam = router?.query?.status;
  // const pageParam = router?.query?.page;
  const limitParam = router?.query?.limit;
  const pageParam = router?.query?.page;
  const handleChange = (event, newValue) => {
    router.push(
      `/dashboard/orders/orders-list?page=1&limit=${limitParam}&status=${newValue}`
    );
  };

  const getDataByStatus = () => {
    dispatch(
      getOrdersByStatus({
        token,

        params: {
          status: statusParam,
          limit: limitParam,
          page: pageParam,
        },
      })
    );
  };

  useEffect(() => {
    if (token) {
      getDataByStatus();
      dispatch(getDashboardOrdersStats({ token }));
    }
  }, [token, isLoading, statusParam, pageParam, limitParam]);
  return (
    <Box>
      <Grid
        container
        xs={12}
        sx={{
          padding: {
            xs: "0px",
            md: "1rem 1.75rem 0 1.75rem",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={12} md={8}>
          <Box>
            <Tabs
              value={statusParam}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label=" scrollable  secondary tabs example"
              variant="scrollable"
              scrollButtons="off"
            >
              {status?.map((item, indx) => (
                <Tab
                  key={indx}
                  value={item}
                  label={t(getStatusText(item))}
                  iconPosition="end"
                  icon={
                    <Box
                      sx={{
                        // backgroundColor: statusParam===item ? `${getColor(item)}.main` : `${getColor(item)}.light`,
                        backgroundColor: `${getColor(item)}.main`,
                        color: "#ffffff",
                        borderRadius: "3px",
                        fontSize: "14px",
                        padding: "0 8px",
                      }}
                    >
                      {counts[item]}
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>
        </Grid>
        <Grid xs={12} md={3}>
          <StyledBox>
            <SearchModal />
            <StyledResetIcon onClick={getDataByStatus}>
              <RestartAltIcon sx={{ color: "#fff" }} />
            </StyledResetIcon>
          </StyledBox>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
}
