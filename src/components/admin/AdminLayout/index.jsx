import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Stack, styled, Typography } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutOutlined from "components/icons/LogoutOutlined";
import {
  Main,
  AppBar,
  DrawerHeader,
  drawerWidth,
  StyledContainer,
} from "./styledComponents";
import { navigations } from "./NavigationList";
import { useRouter } from "next/router";
import StyledSearchEllipse from "../StyledInputs/StyledSearchEllipse";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import NotificationMenu from "./NotificationMenu";
import { removeUser } from "redux-store/user/auth.slice";
import { useDispatch } from "react-redux";
import MobileViewDisabled from "../Modals/MobileViewDisabled";
import { useSelector } from "react-redux";
import { removeUserData, getUser } from "redux-store/user/user.slice";
import { useTranslation } from "react-i18next";

const StyledMainBack = styled(Box)(({ theme }) => ({
  background: theme.palette.background.inputGray,
  display: "flex",
  alignItems: "center",
  borderRadius: "25px",
  padding: "0 1rem",
  color: theme.palette.secondary[100],
  height: 40,
}));

function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.token);

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch(removeUser());
    dispatch(removeUserData());
    router.push("/");
  };

  React.useEffect(() => {
    if (!token) {
      router.push("/");
    }
    if (!user && token) {
      dispatch(getUser({ token }));
    }
  }, [token]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Stack display={{ xs: "none", sm: "flex" }}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon color="primary" />
            </IconButton>
            <Stack
              width="100%"
              direction="row"
              gap={2}
              justifyContent="flex-end"
            >
              <Link href="/">
                <StyledMainBack>
                  <LanguageIcon />
                  <Typography ml={2}>{t("GotoMainPage")}</Typography>
                </StyledMainBack>
              </Link>
              <StyledSearchEllipse placeholder={t("Search") + "..."} />
              <NotificationMenu />
              <ProfileMenu />
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: "none",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Stack justifyContent="space-between" height="90%">
            <Stack>
              <DrawerHeader>
                <Box
                  component="img"
                  src="/assets/dashboard-logo.png"
                  alt="logo"
                />
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Stack pl={1}>
                <List>
                  {navigations.map((nav, key) => (
                    <ListItem key={nav.name} disablePadding>
                      <ListItemButton
                        onClick={() => router.push(nav.path)}
                        selected={
                          router.pathname === nav.path ||
                          router.pathname.includes(nav.path)
                        }
                      >
                        <ListItemIcon>
                          <nav.icon
                            sx={{
                              color:
                                router.pathname !== nav.path &&
                                !router.pathname.includes(nav.path)
                                  ? theme.palette.secondary[900]
                                  : theme.palette.light.main,
                            }}
                            color={
                              router.pathname !== nav.path &&
                              !router.pathname.includes(nav.path)
                                ? theme.palette.secondary[900]
                                : theme.palette.light.main
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{
                            sx: {
                              color:
                                router.pathname !== nav.path &&
                                !router.pathname.includes(nav.path)
                                  ? theme.palette.secondary[100]
                                  : theme.palette.light.main,
                              fontSize: "15px",
                            },
                          }}
                          primary={t(nav.name)}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Stack>
            <Stack pl={1}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={logout}>
                    <ListItemIcon>
                      <LogoutOutlined />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          color: theme.palette.secondary[100],
                          fontSize: "15px",
                        },
                      }}
                    >
                      {t("LogOutFromSystem")}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            </Stack>
          </Stack>
        </Drawer>
        <Main open={open}>
          <StyledContainer>{children}</StyledContainer>
        </Main>
      </Stack>
      <Stack display={{ xs: "block", sm: "none" }}>
        <AppBar position="fixed"></AppBar>
        <Main open={open}>
          <StyledContainer>{children}</StyledContainer>
        </Main>
      </Stack>
    </Box>
  );
}

export default AdminLayout;
