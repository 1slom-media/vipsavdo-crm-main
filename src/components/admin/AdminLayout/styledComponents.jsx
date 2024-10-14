import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Box, Button, IconButton, Stack } from "@mui/material";

export const drawerWidth = 240;

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: "#fff",
  height: "100vh",
  flexGrow: 1,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: theme.palette.primary.contrastText,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const StyledContainer = styled(Stack)(({ theme }) => ({
  background: theme.palette.background.gray,
  height: "96%",
  borderRadius: "50px",
  marginTop: 40,
  padding: "20px 30px",
  top: 0,
  position: "sticky",
  overflowY: "auto",
  boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

export const StyledRoundedBox = styled(Box)(({ theme }) => ({
  maxWidth: "25px",
  minWidth: "25px",
  maxHeight: "25px",
  minHeight: "25px",
  borderRadius: "50%",
  backgroundColor: theme.palette.info[200],
  color: theme.palette.info[800],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledRoundedOutlinedBox = styled(Box)(({ theme }) => ({
  maxWidth: "25px",
  minWidth: "25px",
  maxHeight: "25px",
  minHeight: "25px",
  borderRadius: "50%",
  border: `1px solid ${theme.palette.info[200]}`,
  color: "inherit",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "50%",
  border: "1px solid",
  borderColor: theme.palette.neutral[1000],
  width: 40,
  height: 40,
}));

export const StyledDeleteBtn = styled(Button)(({ theme }) => ({
  px: 10,
  "&:hover": {
    background: "inherit",
  },
}));
