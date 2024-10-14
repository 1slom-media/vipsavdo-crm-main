import { Box, Stack, Typography, styled } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import AlertProgress from "./AlertProgress";

const StyledAlert = styled(Box)(({ theme }) => ({
  padding: "8px 15px",
  // background: theme.palette.warning.light,
  background: theme?.palette?.mode === "light" ? "#111827" : "#ffffff",
  width: "250px",
  borderRadius: "6px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  position: "fixed",
  top: 30,
  zIndex: 1000000,
  right: 50,
  cursor: "pointer",
  "&::before": {
    content: "''",
    width: "2px",
    height: "100%",
    background: theme.palette.warning.main,
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "2px",
  },
  justifyContent: "space-between",
  position: "fixed",
  zIndex: 1000000,
  right: "40%",
  cursor: "pointer",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  animationName: "popup",
  animationDuration: "0.3s",
  animationTimingFunction: "ease-in-out",
  "@keyframes popup": {
    "0%": { top: 2 },
    "100%": { top: 30 },
  },
  [theme.breakpoints.down("sm")]: {
    width: "70%",
    right: "15%",
    top: 10,
    "@keyframes popup": {
      "0%": { top: -5 },
      "100%": { top: 10 },
    },
  },
}));

const StyledIcon = styled(Box)(({ theme }) => ({
  background: theme.palette.warning.main,
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  color: theme.palette.primary.contrastText,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "15px",
}));

const WarningAlert = ({ text, title, handleClose }) => {
  return (
    <StyledAlert onClick={handleClose}>
      <Stack direction="row" alignItems="center" mr={1}>
        <StyledIcon>
          <PriorityHighIcon />
        </StyledIcon>
        <Stack>
          <Typography variant="subtitle1" color="black.main">
            {title}
          </Typography>
          <Typography variant="string" color="text.main">
            {text?.length > 16 ? `${text?.slice(0, 16)}...` : text}
          </Typography>
        </Stack>
      </Stack>
      <AlertProgress color="warning" />
    </StyledAlert>
  );
};

export default WarningAlert;
