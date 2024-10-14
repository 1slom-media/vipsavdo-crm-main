import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { editUser } from "../../../redux-store/user/edit.slice";
import { useState } from "react";
import useAlert from "../../../hooks/useAlert";
import { getUser } from "../../../redux-store/user/user.slice";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useTranslation } from "react-i18next";

const StyledFileButton = styled(Box)(({ theme }) => ({
  maxWidth: "64px",
  maxHeight: "64px",
  borderRadius: "50%",
  marginBottom: "10px",
  display: "flex",
  cursor: "pointer",
}));

export const AccountGeneralSettings = (props) => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.data);
  const alert = useAlert();

  const [name, setName] = useState(user?.name || "");
  const [img, setImg] = useState(user?.avatar || null);
  const [sendImg, setSendImg] = useState(null);
  const updateImg = () => {
    const form = new FormData();
    form.append("avatar", sendImg);
    form.append("name", name);

    dispatch(
      editUser({ token, data: form, callBack: () => console.log(), alert })
    ).then((r) => {
      dispatch(getUser({ token }));
    });
  };
  const updateName = () => {
    const form = new FormData();
    form.append("name", name);

    dispatch(
      editUser({ token, data: form, callBack: () => console.log(), alert })
    ).then((r) => {
      dispatch(getUser({ token }));
    });
  };

  const onImageChange = (event) => {
    setSendImg(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  console.log("aaaaaa", user);

  const ImagePicker = () => {
    return (
      <Box>
        <input
          accept="image/*"
          onChange={onImageChange}
          id="upload-company-logo"
          type="file"
          hidden
        />
        <StyledFileButton
          component="label"
          htmlFor="upload-company-logo"
          sx={{ position: "relative" }}
        >
          <Avatar
            src={img}
            sx={{
              height: 64,
              mr: 2,
              width: 64,
            }}
          ></Avatar>
          <Box sx={{ position: "absolute", top: "23px", left: "23px" }}>
            <CameraAltIcon fontSize="small" />
          </Box>
        </StyledFileButton>
      </Box>
    );
  };
  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Asosiy malumotlar</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              {/*<GeneralModal user={user}/>*/}
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <TextField
                  id="filled-basic"
                  name={"avatar"}
                  component={ImagePicker}
                  label="Filled"
                  variant="filled"
                />
                <Button sx={{ marginLeft: "2rem" }} onClick={() => updateImg()}>
                  O`zgartirish
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  defaultValue={user?.name}
                  value={name}
                  onChange={(e) => {
                    setName(e?.target?.value);
                  }}
                  label="Ism va familiya"
                  name={"name"}
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
                <Button onClick={() => updateName()}>Saqlash</Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  defaultValue={user?.phone}
                  disabled
                  label="Telefon raqam"
                  required
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderStyle: "dashed",
                    },
                  }}
                />
                <Button>O`zgartirish</Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Ijtimoiy sahifa</Typography>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <div>
                  <Typography variant="subtitle1">
                    Shaxsiy malumotlar
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Malumotlarni boshqalar bilan ulashish
                  </Typography>
                </div>
                <Switch />
              </Box>
              <Divider />
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                }}
              >
                <div>
                  <Typography variant="subtitle1">
                    Ko`rinishni belgilash
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Onlayn yoki yo`qliginizni boshqalarga ko`rsatish yoki
                    berkitishingiz mumkin
                  </Typography>
                </div>
                <Switch defaultChecked />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Profilni o`chirish</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 3 }} variant="subtitle1">
                Shaxsiy malumotlarni to`liqligicha o`chirish uchun ushbu
                funksiyadan foydalaning. Malomutlarni qayta tiklab bo`lmaydi.
              </Typography>
              <Button color="error" variant="outlined">
                Profilni o`chirish
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
