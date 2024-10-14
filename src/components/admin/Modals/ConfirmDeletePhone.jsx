import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, IconButton, Stack, styled } from "@mui/material";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "components/icons/DeleteIcon";
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

export const StyledIconBtnDelete = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
}));

export default function ConfirmDeletePhone({
  error,
  loading,
  isOpen,
  phone,
  handleOpen,
  handleClose,
  onSuccess,
  id,
}) {
  const { t } = useTranslation("translation");

  return (
    <div>
      <StyledIconBtnDelete onClick={handleOpen}>
        <DeleteIcon />
      </StyledIconBtnDelete>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack alignItems="center">
            <Box
              width={100}
              height={100}
              component="img"
              src="/assets/media/delete.png"
              alt="delete display image"
            />
          </Stack>
          <Box width="80%" margin="auto">
            <Typography my={2} variant="body1" component="h2" align="center">
              {error + " " + phone}
            </Typography>
          </Box>
          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button color="error" onClick={handleClose} variant="contained">
              {t("Cancel").toUpperCase()}
            </Button>
            <LoadingButton
              onClick={onSuccess}
              variant="contained"
              color="success"
              loading={loading}
            >
              {t("Confirm").toUpperCase()}
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

ConfirmDeletePhone.propTypes = {
  error: PropTypes.string,
  handleDelete: PropTypes.func,
  handleDeleteModal: PropTypes.func,
};

ConfirmDeletePhone.defaultProps = {
  error: "",
  handleDelete: () => {},
  handleDeleteModal: () => {},
};
