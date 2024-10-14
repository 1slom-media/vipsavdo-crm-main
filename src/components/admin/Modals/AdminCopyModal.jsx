import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, Grid, styled, IconButton } from "@mui/material";
import CopyIcon from "components/icons/CopyIcon";
import CloseIcon from "components/icons/CloseIcon";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TelegramIcon from "@mui/icons-material/Telegram";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useAlert from "hooks/useAlert";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
};

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "5px 20px",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.background.card}`,
}));

const StyledIconBtn = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  borderRadius: "50%",
  background: theme.palette.background[200],
  width: "35px",
  height: "35px",
}));

function AdminCopyModal({ img, name, tgId, phone, balance, username }) {
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <StyledIconBtn onClick={handleOpen}>
        <CopyIcon />
      </StyledIconBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StyledBox>
            <Typography variant="body1" color="secondary.100">
              {t("Admin")}
            </Typography>

            <StyledIconBtn onClick={handleClose}>
              <CloseIcon />
            </StyledIconBtn>
          </StyledBox>

          <Box px={2.2} py={2.5}>
            <Grid
              container
              xs={12}
              p={1}
              bgcolor="background.lightBlue"
              borderRadius="10px"
            >
              <Grid item xs={12} mb={2.2}>
                <Box display="flex" gap={2} alignItems="center">
                  <Avatar src={img} />
                  <Box>
                    <Typography variant="body1" color="secondary.100">
                      {name}
                    </Typography>
                    <Typography variant="caption" color="text.ligtGrey">
                      {t("Admin")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <LocalPhoneIcon />
                    <Typography variant="body1" color="secondary.100">
                      {phone}
                    </Typography>
                  </Box>

                  <CopyToClipboard
                    text={phone}
                    onCopy={() =>
                      alert.success({
                        title: t("Telefon"),
                        text: t("Copied"),
                      })
                    }
                  >
                    <StyledIconBtn>
                      <ContentCopyIcon color="disabled" sx={{ fontSize: 15 }} />
                    </StyledIconBtn>
                  </CopyToClipboard>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <TelegramIcon />
                    <Typography variant="body1" color="secondary.100">
                      {tgId}
                    </Typography>
                  </Box>
                  <CopyToClipboard
                    text={tgId}
                    onCopy={() =>
                      alert.success({
                        title: "Telegram ID",
                        text: t("Copied"),
                      })
                    }
                  >
                    <StyledIconBtn>
                      <ContentCopyIcon color="disabled" sx={{ fontSize: 15 }} />
                    </StyledIconBtn>
                  </CopyToClipboard>
                </Box>
                <Box display="flex" alignItems="center" gap={2} mb={1.5}>
                  <AlternateEmailIcon />
                  <Typography variant="body1" color="secondary.100">
                    {username}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <AccountBalanceWalletIcon />
                  <Typography variant="body1" color="secondary.100">
                    {balance} so`m
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminCopyModal;
