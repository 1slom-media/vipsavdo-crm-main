import PropTypes from "prop-types";
import NextLink from "next/link";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "../icons/menu";
import { Logo } from "./logo";
import { Stack } from "@mui/system";
import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import CodeCheckModal from "./landing/CodeCheckModal";
import { useSelector } from "react-redux";

export const MainNavbar = (props) => {
  const site = useSelector((state) => state.settings);
  const token = useSelector((state) => state.auth.token);
  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottomColor: "divider",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        color: "text.secondary",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <NextLink href="/" passHref>
            <a>
              <Logo
                sx={{
                  display: {
                    md: "inline",
                    xs: "inline",
                  },
                  height: 40,
                  width: 40,
                }}
              />
            </a>
          </NextLink>
          <Box sx={{ flexGrow: 1 }} />
          <Box display={{ md: "none" }}>
            <CodeCheckModal />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: {
                md: "flex",
                xs: "none",
              },
            }}
          >
            <Link href="email:ecommerce@gmail.com">
              <Stack direction="row" gap={1}>
                <EmailOutlined />
                <Typography>vipitstudio@gmail.com</Typography>
              </Stack>
            </Link>
            <Stack mx={2} direction="row" gap={1}>
              <PhoneOutlined />
              <Typography>+99897 638 24 81</Typography>
            </Stack>
            {!token ? (
              <CodeCheckModal />
            ) : (
              <Link href="/dashboard">
                <Stack>
                  <Avatar src={site?.avatar}>
                    {site?.site_name ? site?.site_name[0] : ""}
                  </Avatar>
                </Stack>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
