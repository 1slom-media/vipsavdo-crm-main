import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "hooks/useAlert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import {
  deleteCarouselBanner,
  getCarouselBanners,
} from "redux-store/banners/banner.index.slice";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

export default function DeleteBannerModal({ id }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.banners.isDeleteLoading);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const callBack = () => {
    handleClose();
    dispatch(getCarouselBanners({ token }));
  };

  const confirmModal = () => {
    dispatch(deleteCarouselBanner({ id, token, alert, callBack }));
  };

  return (
    <div>
      <IconButton onClick={() => handleOpen()} color="error" alignSelf="end">
        <DeleteForeverIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("BannerBeingDeleted")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("BannerBeingDeletedDesc")}
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
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="success"
            onClick={() => confirmModal()}
            autoFocus
          >
            {t("YesDelete")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
