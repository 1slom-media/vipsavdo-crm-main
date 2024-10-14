import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, Stack, styled } from "@mui/material";
import Link from "next/link";
import EmailOutlined from "components/icons/EmailOutlined";
import PhoneOutlined from "components/icons/PhoneOutlined";
import CodeCheckModal from "./CodeCheckModal";
import { useSelector } from "react-redux";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: "15px",
  boxShadow: theme.shadows[5],
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "10px 20px",
}));

export default function LandingHeader() {
  const site = useSelector((state) => state.settings);
  const token = useSelector((state) => state.auth.token);
  return (
    <StyledAppBar position="sticky" color="background">
      <Box component="img" src="/assets/dashboard-logo.png" alt="Logo" />
      <Stack direction="row" alignItems="center" gap={2}>
        <Stack
          display={{ xs: "none", md: "flex" }}
          direction="row"
          alignItems="center"
          gap={2}
        >
          <Link href="email:ecommerce@gmail.com">
            <Stack direction="row" gap={1}>
              <EmailOutlined />
              <Typography>vipitstudio@gmail.com</Typography>
            </Stack>
          </Link>
          <Stack direction="row" gap={1}>
            <PhoneOutlined />
            <Typography>+99897 638 24 81</Typography>
          </Stack>
          {!token ? (
            <CodeCheckModal />
          ) : (
            <Link href="/admin/dashboard">
              <Stack>
                <Avatar src={site?.avatar}>
                  {site?.site_name ? site?.site_name[0] : ""}
                </Avatar>
              </Stack>
            </Link>
          )}
        </Stack>
      </Stack>
    </StyledAppBar>
  );
}
