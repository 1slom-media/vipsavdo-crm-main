import * as React from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { generateMediaLinks } from "api/requests";
import useAlert from "hooks/useAlert";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { Close } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const VideoPicker = ({ input }) => {
  const alert = useAlert();
  const theme = useTheme();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);

  const ref = React.useRef();
  const [loading, setLoading] = React.useState(false);

  const handleVideoPicker = async (e) => {
    if (e.target.files[0]) {
      setLoading(true);
      const formData = new FormData();
      formData.append("video", e.target.files[0]);
      const media = await generateMediaLinks({ token, alert, data: formData });
      setLoading(false);
      if (media?.video) {
        input?.onChange(media?.video);
      }
    }
  };

  const handleDelete = () => {
    input?.onChange(null);
  };

  return (
    <Stack width={150} gap="10px">
      <VisuallyHiddenInput
        onChange={handleVideoPicker}
        type="file"
        accept="video/*"
        ref={ref}
      />
      <Box
        height={180}
        sx={{
          border: "1px dotted",
          borderColor: theme.palette.divider,
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {input?.value ? (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <IconButton
              onClick={handleDelete}
              color="error"
              sx={{ borderRadius: "50%" }}
            >
              <Close />
            </IconButton>
          </Box>
        ) : null}
        {input?.value && !loading ? (
          <video width={150} height={180} src={input?.value} controls></video>
        ) : loading ? (
          <CircularProgress />
        ) : (
          <Stack
            onClick={() => ref.current.click()}
            alignItems="center"
            gap="10px"
          >
            <CloudUploadIcon />
            <Typography variant="caption">{t("UploadVideo")}</Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default VideoPicker;
