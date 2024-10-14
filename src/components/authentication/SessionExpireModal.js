import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  closeUserSessionModal,
  openUserSessionModal,
} from "redux-store/user/auth.slice";
import { removeUserData } from "redux-store/user/user.slice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

export default function SessionModal() {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const userSessionExpired = useSelector((state) => state.auth.sessionExpired);
  const token = useSelector((state) => state.auth.token);
  const sessionStartedTime = useSelector(
    (state) => state.auth.sessionStartedTime
  );

  const checkUserSession = () => {
    setInterval(() => {
      const currentTime = new Date();
      const sessionTime = new Date(sessionStartedTime);
      const difference = Math.abs(currentTime - sessionTime);
      if (difference > 60000 * 60 * 24 * 30) {
        dispatch(openUserSessionModal());
        dispatch(removeUserData());
      }
    }, 10000);
  };

  const handleClose = () => {
    dispatch(closeUserSessionModal());
  };

  useEffect(() => {
    if (token && sessionStartedTime) {
      checkUserSession();
    }
  }, [token]);

  return (
    <Modal
      open={userSessionExpired}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography
          align="center"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          {t("SenExp")}
        </Typography>
        <Typography align="center" id="modal-modal-description" sx={{ mt: 2 }}>
          {t("SenExpDesc")}
        </Typography>
      </Box>
    </Modal>
  );
}
