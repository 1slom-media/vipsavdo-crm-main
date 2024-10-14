import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const TableLimitSelector = ({
  status,
  isOperatorPage,
  isCustomerPage,
  isPayment,
}) => {
  const router = useRouter();
  const { t } = useTranslation("translation");

  const { limit } = router?.query;
  const statusParam = router?.query?.status;

  const [age, setAge] = React.useState(7);

  const handleChange = (event) => {
    status
      ? router.push(
          `${router.pathname}?page=${1}&limit=${
            event.target.value
          }&status=${statusParam}`
        )
      : router.push(`${router.pathname}?page=${1}&limit=${event.target.value}`);
    setAge(event.target.value);
  };

  const handleCustomers = (event) => {
    const { id, page, status } = router?.query;
    router.push(
      `/dashboard/users/${isOperatorPage ? "operators" : "customers"}/${
        isPayment ? "payment" : "orders"
      }/${id}?page=${page}&limit=${event?.target?.value}&status=${status}`
    );
    setAge(event?.target?.value);
  };

  React.useEffect(() => {
    setAge(limit);
  }, []);

  return (
    <main>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel size="small" id="demo-simple-select-label">{t("Limit")}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age === undefined ? 7 : age}
            label="Age"
            size="small"
            onChange={isCustomerPage ? handleCustomers : handleChange}
            defaultValue={7}
          >
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </main>
  );
};

export default TableLimitSelector;
