import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "hooks/useAlert";
import { deleteAdminGame } from "redux-store/admin/game/game.slice";
import { useRouter } from "next/router";
import DeleteIcon from "components/icons/DeleteIcon";
import { useTranslation } from "react-i18next";

export default function DeleteGameModal({ id, callBack }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const confirmModal = () => {
    dispatch(deleteAdminGame({ id, token, alert, callBack }));
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => handleOpen()}>
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("RUSDelete")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("RUSDesc")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleClose()}
          >
            {t("NoCancel")}
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => confirmModal()}
            autoFocus
          >
            {t("YesDelete")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
