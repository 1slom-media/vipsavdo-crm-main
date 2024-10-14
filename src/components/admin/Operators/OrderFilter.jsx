import React from "react";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import { getStatusText } from "utils/helpers";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const OrderFilter = ({ status, current, size }) => {
  const router = useRouter();

  const { id, page, limit } = router?.query;
  const statusParam = router?.query?.status;

  const handleChange = (event, newValue) => {
    router.push(
      `/dashboard/users/operators/orders/${id}?page=${page}&limit=${limit}&status=${newValue}`
    );
  };

  return (
    <Stack direction="row" justifyContent="flex-start" gap="10px">
      <Tabs value={statusParam} onChange={handleChange}>
        {status.map((item, index) => {
          return (
            <Tab
              key={index}
              value={item}
              label={`${getStatusText(item)} ${
                item === statusParam ? size : ""
              }`}
            />
          );
        })}
      </Tabs>
      {/*{status?.map((sts) => {*/}
      {/*    return (*/}
      {/*        <Chip*/}
      {/*            key={sts}*/}
      {/*            size="small"*/}
      {/*            label={`${getStatusText(sts)} ${sts === statusParam ? size : ""}`}*/}
      {/*            onClick={() => changeParamStatus(sts)}*/}
      {/*            variant={statusParam === sts ? "outlined" : "contained"}*/}
      {/*            sx={{*/}
      {/*                p: "1rem 0.8rem",*/}
      {/*                fontSize: 14,*/}
      {/*                color: !!getColor(sts) ? `${getColor(sts)}.900` : "inherit",*/}
      {/*                border: `1p solid ${getColor(sts)}.900`,*/}
      {/*                backgroundColor:*/}
      {/*                    `${!!getColor(sts)}.200` && statusParam !== sts*/}
      {/*                        ? `${getColor(sts)}.200`*/}
      {/*                        : "none",*/}
      {/*            }}*/}
      {/*        />*/}
      {/*    );*/}
      {/*})}*/}
    </Stack>
  );
};

export default OrderFilter;
