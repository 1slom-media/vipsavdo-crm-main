import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { Logo } from "../../logo";
import { Pencil as PencilIcon } from "../../../icons/pencil";
import { PropertyList } from "../../property-list";
import { PropertyListItem } from "../../property-list-item";
import { useTranslation } from "react-i18next";
import SmsIcon from "@mui/icons-material/Sms";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useSelector } from "react-redux";
import { formatNumber } from "utils/helpers";

const StyledWrapperBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  border: "1px solid #2d3748",
  borderRadius: "8px",
  padding: "14px 20px",
  gap: "9px",
  height: "100%",
}));

export const ExampleBox = ({ number, icon, txt }) => {
  return (
    <StyledWrapperBox>
      <Box>
        <Typography variant="body1" color="text">
          {txt} :
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          gap: 3,
        }}
      >
        <Box>{icon}</Box>
        <Box>
          <Typography fontSize="23px" fontWeight="bold" color="text">
            {number ? number : 0}
          </Typography>
        </Box>
      </Box>
    </StyledWrapperBox>
  );
};

export const AccountBillingSettings = (props) => {
  const [selected, setSelected] = useState("");
  const profileData = useSelector((state) => state.profile);
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.data);
  console.log("userrrrr", user);
  return (
    <div {...props}>
      <Card>
        <CardContent>
          <div>
            <Typography variant="h6">Foydalanuvchining hisobi : </Typography>
          </div>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item sm={4} xs={12}>
                <ExampleBox
                  number={user?.countSendedSms + " " + "ta"}
                  txt={"Yuborilgan SMS lar soni"}
                  icon={<SmsIcon fontSize="large" />}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <ExampleBox
                  number={user?.countSentCode + " " + "ta"}
                  txt={"Yuborilgan SMS ko'dlar  soni"}
                  icon={<PermPhoneMsgIcon fontSize="large" />}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <ExampleBox
                  number={formatNumber(user?.balance) + " " + "so'm"}
                  txt={"Hisib raqamdagi pul miqdori"}
                  icon={<AccountBalanceWalletIcon fontSize="large" />}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider
            sx={{
              mb: 3,
              mt: 3,
            }}
          />
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">To&apos;lovlar</Typography>
          </Box>
          <Grid container spacing={2} mb={2}>
            <Grid item md={6} xs={12}>
              <StyledWrapperBox>
                <Typography variant="h6" color="text">
                  To&apos;lanishi kerak bo&apos;lgan miqdor
                </Typography>
              </StyledWrapperBox>
            </Grid>
            <Grid item md={6} xs={12}>
              <StyledWrapperBox></StyledWrapperBox>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained">To&apos;lov qilish</Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
