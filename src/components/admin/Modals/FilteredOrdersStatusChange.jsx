import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import GppBadIcon from "@mui/icons-material/GppBad";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { orderStatuses } from "constants/statuses";
import { getStatusText } from "utils/helpers";
import {
  getOrdersByStatus,
  updateFilteredOrders,
} from "redux-store/admin/orders/orders.slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useAlert from "hooks/useAlert";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 400 },
  bgcolor: "background.paper",
  border: 0,
  boxShadow: 24,
  borderRadius: "5px",
  p: 2,
};

function FilteredOrdersStatusChangeModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isFilterUpdateLoading = useSelector(
    (state) => state.orders.isFilterUpdateLoading
  );

  const [newStatus, setStatus] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const callback = () => {
    setOpen(false);
    const params = {
      status: router?.query?.status,
      limit: router?.query?.limit,
      page: router?.query?.page,
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
  };

  const handleStatusChange = () => {
    const { status, regionQueryString } = router.query;
    dispatch(
      updateFilteredOrders({
        token,
        alert,
        callback,
        params: { status, region: regionQueryString },
        data: { newStatus },
      })
    );
  };

  return (
    <div>
      <Button
        startIcon={<PublishedWithChangesIcon />}
        variant="contained"
        onClick={handleOpen}
        size="large"
      >
        {t("ChangeState")}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Stack mb={3} mt={1}>
            <Typography variant="caption" align="center">
              {t("AllAppProdStateUpd")}
            </Typography>
          </Stack>
          <Stack mb={3} px={2}>
            <FormControl fullWidth>
              <InputLabel size="small" id="demo-simple-select-label">
                {t("selectState")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newStatus}
                label={t("Age")}
                onChange={handleChange}
                size="small"
              >
                {orderStatuses?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {getStatusText(item)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            px={2}
          >
            <Button
              onClick={handleClose}
              startIcon={<GppBadIcon />}
              variant="outlined"
              color="error"
            >
              {t("Cancel")}
            </Button>
            <LoadingButton
              onClick={handleStatusChange}
              startIcon={<ChangeCircleIcon />}
              variant="contained"
              loading={isFilterUpdateLoading}
            >
              {t("Edit")}
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default FilteredOrdersStatusChangeModal;
