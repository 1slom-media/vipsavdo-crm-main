import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import ArchieveOutlined from "components/icons/ArchieveOutlined";
import useAlert from "hooks/useAlert";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersByStatus,
  updateOrder,
} from "redux-store/admin/orders/orders.slice";
import { StyledEditeBtn } from "../TableRows/ProductsRow";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px",
};

const ConfirmArchivemodal = ({ error, status, id, prevStatus, page }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const isLoading = useSelector((state) => state.orders.isUpdateLoading);
  const { statusFilter } = useSelector((state) => state.orders);
  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callBack = () => {
    if (success) {
      alert.success({
        title: t("Order"),
        text: status == "archived" ? t("UnArch") : t("Arch"),
      });
      handleClose();
      dispatch(
        getOrdersByStatus({
          token,
          params: {
            status: statusFilter,
            filter: filterValue,
            limit: 7,
            page: page,
          },
        })
      );
    } else {
      handleClose();
      alert.error({
        title: t("Order"),
        text: t("ErrorDec"),
      });
    }
  };

  const moveToArchive = () => {
    dispatch(
      updateOrder({
        token,
        params: { data: { status: "archived" }, id, callBack },
      })
    );
  };

  const moveToPrevious = () => {
    dispatch(
      updateOrder({
        token,
        params: { data: { status: prevStatus }, id, callBack },
      })
    );
  };

  return (
    <div>
      <StyledEditeBtn onClick={handleOpen}>
        <ArchieveOutlined />
      </StyledEditeBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack alignItems="center">
            <Stack
              width="150px"
              height="150px"
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              bgcolor="background.iconButtonLight"
            >
              <Box
                width={90}
                height={90}
                component="img"
                src="/assets/media/archive.png"
                alt="delete display image"
              />
            </Stack>
          </Stack>
          <Box width="80%" margin="auto">
            <Typography
              my={2}
              variant="body1"
              component="h2"
              color="text.secondary"
              align="center"
            >
              {error}
            </Typography>
          </Box>
          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button onClick={handleClose} variant="contained" color="disabled">
              {t("Cancel").toUpperCase()}
            </Button>
            <LoadingButton
              onClick={status === "archived" ? moveToPrevious : moveToArchive}
              variant="contained"
              loading={isLoading}
            >
              {t("Confirm").toUpperCase()}
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmArchivemodal;
