import { LoadingButton } from "@mui/lab";
import {
  styled,
  Box,
  Button,
  IconButton,
  Typography,
  Card,
} from "@mui/material";

export const StyledInfoCard = styled(Box)(({ theme }) => ({
  background: `linear-gradient(111.66deg, ${theme.palette.background.start} 2.61%, ${theme.palette.background.end} 100%)`,
  border: "1px solid rgba(21, 44, 112, 0.5)",
  borderRadius: "22px",
}));

export const StyledInfoChild = styled(Box)(({ theme, shadow }) => ({
  background: theme.palette.info.contrastText,
  padding: "12px",
  borderRadius: "10px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "& .MuiSvgIcon-root": {
    fill: "none",
  },
  ...(shadow && {
    boxShadow: shadow,
  }),
}));

export const StyledFilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.filter,
  color: theme.palette.text.secondary,
  height: "100%",
  "&:hover": {
    backgroundColor: theme.palette.background.filter,
    color: theme.palette.text.secondary,
  },
}));

export const StyledIconButtonMenu = styled(IconButton)(({ theme }) => ({
  maxWidth: "45px",
  maxHeight: "100%",
  minWidth: "45px",
  minHeight: "100%",
  background: theme.palette.background.filter,
  position: "absolute",
  left: 0,
  top: 0,
}));

export const StyledBtnSkaner = styled(LoadingButton)(({ theme }) => ({
  background: theme.palette.background.btns,
  color: theme.palette.background.contrastText,
  minWidth: "100px",
  "&:hover": {
    background: theme.palette.background.btns,
  },
}));

export const StyledSettingsBox = styled(Box)(({ theme }) => ({
  borderRadius: "15px",
  padding: "1rem 2rem",
}));

export const StyledIconBox = styled(Box)(({ theme, w, h }) => ({
  width: w ? w : "44px",
  height: h ? h : "44px",
  borderRadius: "50%",
  backgroundColor: "#E2EBED",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledTypographyWrapText = styled(Typography)(({ theme }) => ({
  width: "318px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "pre-line",
}));

export const StyledNotificationCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: "20px",
  width: "100%",
  height: "100%",
  padding: "20px",
}));

export const StyledResetIcon = styled(IconButton)(({ theme }) => ({
  minWidth: "43px",
  maxWidth: "43px",
  minHeight: "43px",
  maxHeight: "43px",
  backgroundColor: theme.palette.success[300],
}));

export const StyledIconDeleteBtn = styled(IconButton)(({ theme }) => ({
  minWidth: "33px",
  maxWidth: "33px",
  minHeight: "33px",
  maxHeight: "33px",
  borderRadius: "50%",
  backgroundColor: theme.palette.disabled[100],
  color: theme.palette.background.btns,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledIncDecBtn = styled(IconButton)(({ theme, inc }) => ({
  borderRadius: "50%",
  color: theme.palette.background.paper,
  backgroundColor: inc ? theme.palette.success[200] : theme.palette.error[200],
  color: inc ? theme.palette.success[900] : theme.palette.error[900],
  "&:hover": {
    backgroundColor: inc
      ? theme.palette.success[200]
      : theme.palette.error[200],
  },
}));
