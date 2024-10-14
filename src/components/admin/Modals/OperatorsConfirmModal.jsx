import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, IconButton, Stack, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOperatorProfile,
  getOperatorsOrderHistory,
  renewOperatorOrderById,
} from "../../../redux-store/admin/operators/operator.slice";
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

const OperatorsConfirmModal = ({ uid, token, alert, status, page }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const isLoading = useSelector(
    (state) => state.operators.isOrdersRemoveLoading
  );
  const [open, setOpen] = useState(false);

  const callBack = () => {
    if (token) {
      dispatch(
        getOperatorProfile({
          token,
          params: {
            userId: uid,
            type: "info",
          },
        })
      );
      dispatch(
        getOperatorsOrderHistory({
          token,
          params: {
            userId: uid,
            type: "order",
            status,
            page,
          },
        })
      );
    }
  };
  const handleProcess = () => {
    dispatch(renewOperatorOrderById({ uid, token, alert, callBack }));
  };
  return (
    <div>
      <Button
        sx={{ marginTop: "2rem", marginBottom: "1rem" }}
        variant={"outlined"}
        color={"error"}
        onClick={() => setOpen(true)}
      >
        {t("RemoveFromOrdersList")}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack alignItems="center">
            <Box
              width={60}
              height={60}
              component="img"
              src="/assets/media/warning.png"
              alt="delete display image"
            />
          </Stack>
          <Box width="80%" margin="auto">
            <Typography my={2} variant="body1" component="h2" align="center">
              {t("Attention")}
            </Typography>
            <Typography my={2} variant="body1" component="h2" align="center">
              {t("ThisOperRemove")}
            </Typography>
          </Box>
          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              color="error"
            >
              {t("Cancel").toUpperCase()}
            </Button>
            <LoadingButton
              onClick={() => handleProcess()}
              variant="contained"
              color="primary"
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

export default OperatorsConfirmModal;
