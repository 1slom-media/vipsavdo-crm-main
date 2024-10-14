import { Box, Divider, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStatusText, getColor } from "utils/helpers";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getOrdersByStatus } from "redux-store/admin/orders/orders.slice";
import { getDashboardOrdersStats } from "redux-store/admin/dashboard/dashboard.slice";

export default function InvoiceStatusTabs({ counts }) {
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
  const router = useRouter();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const isLoading = useSelector((state) => state.orders.isUpdateLoading);
  const statusParam = router?.query?.status;
  // const pageParam = router?.query?.page;
  const limitParam = router?.query?.limit;
  const pageParam = router?.query?.page;
  const handleChange = (event, newValue) => {
    router.push(
      `/dashboard/invoices/orders-invoice?page=1&limit=${limitParam}&status=${newValue}`
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
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          padding: "1rem 1.75rem 0 1.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={statusParam}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          {status?.map((item, indx) => (
            <Tab
              key={indx}
              value={item}
              label={getStatusText(item)}
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
                  {/* {counts[item]} */}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>
      <Divider />
    </Box>
  );
}
