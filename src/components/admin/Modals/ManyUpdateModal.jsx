import { Stack } from "@mui/joy";
import { LoadingButton } from "@mui/lab";
import { Modal, Box, Typography, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

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

const ManyUpdateModal = ({ open, handleClose, handleSuccess, error }) => {
  const { t } = useTranslation("translation");
  const isLoading = useSelector((state) => state.orders.isUpdateLoading);

  return (
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
            onClick={handleSuccess}
            variant="contained"
            loading={isLoading}
          >
            {t("Confirm").toUpperCase()}
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ManyUpdateModal;
