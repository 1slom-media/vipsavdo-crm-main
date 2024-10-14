import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { getStatusText } from "utils/helpers";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const PaymentFilter = ({ currStatus = {}, status }) => {
  const router = useRouter();
  const { id, limit, page } = router?.query;
  const statusParam = router?.query?.status;
  const handleChange = (event, newValue) => {
    router.push(
      `/dashboard/users/customers/payment/${id}?page=${page}&limit=${limit}&status=${newValue}`
    );
  };

  return (
    <Stack direction="row" justifyContent="flex-start" gap="10px">
      <Tabs
        value={statusParam}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="off"
      >
        {status.map((item, index) => {
          return (
            <Tab key={index} value={item} label={`${getStatusText(item)} `} />
          );
        })}
      </Tabs>
    </Stack>
  );
};

export default PaymentFilter;
