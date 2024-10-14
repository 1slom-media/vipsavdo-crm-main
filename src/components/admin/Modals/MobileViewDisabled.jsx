import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useWindowSize from "hooks/useWindowSize";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function MobileViewDisabled() {
  const screenWidth = useWindowSize();
  const { t } = useTranslation("translation");
  const handleClose = () => {};

  return (
    <Modal
      open={screenWidth < 1300}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack alignItems="center" justifyContent="center" height="100%" px={1}>
          <Box
            component="img"
            src="/assets/turn.png"
            alt="mobile disabled view icon"
            width={80}
          />
          <Typography
            align="center"
            variant="string"
            color="text.legacy"
            mt={2}
          >
            {t("NotSupportedScreen")}
          </Typography>
        </Stack>
      </Box>
    </Modal>
  );
}
