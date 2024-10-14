import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Field, reduxForm } from "redux-form";
import { IconButton, Stack, Typography } from "@mui/material";
import ProductSelectInput from "components/general/Inputs/ProductSelectInput";
import { Close } from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDispatch, useSelector } from "react-redux";
import {
  addSiteBanner,
  getCarouselBanners,
} from "redux-store/banners/banner.index.slice";
import useAlert from "hooks/useAlert";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: 500 },
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  borderRadius: "10px",
  boxShadow: 24,
  px: 2,
  pb: 2,
};

function AddBannerModal({ handleSubmit }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedBanner, setBanner] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const pickerRef = React.useRef();
  const token = useSelector((state) => state.auth.token);
  const isAddLoading = useSelector((state) => state.banners.isAddLoading);
  const alert = useAlert();
  const [uid, setUid] = useState(0);
  const callBack = () => {
    handleClose();
    dispatch(getCarouselBanners({ token }));
  };

  const handleBannerSubmit = (values) => {
    const data = new FormData();
    data.append("image", values?.image, values?.image?.name);
    data.append("productId", uid);
    data.append("acticve", true);
    if (uid === 0) {
      return null;
    } else {
      dispatch(addSiteBanner({ token, alert, data, callback: callBack }));
    }
  };

  const BannerPicker = ({ input }) => {
    return (
      <Stack>
        <IconButton
          sx={{
            borderRadius: "50%",
            background: "#10B981",
            "&:hover": { background: "#10B981" },
          }}
          onClick={() => pickerRef?.current?.click()}
        >
          <AddPhotoAlternateIcon sx={{ color: "#fff" }} />
        </IconButton>
        <input
          ref={pickerRef}
          onChange={(e) => {
            input?.onChange(e.target.files[0]);
            setBanner(e.target.files[0]);
          }}
          type="file"
          style={{ display: "none" }}
        />
      </Stack>
    );
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Qo`shish
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="row" justifyContent="end" py={1}>
            <IconButton onClick={handleClose} sx={{ borderRadius: "50%" }}>
              <Close />
            </IconButton>
          </Stack>
          <Stack position="relative">
            {selectedBanner ? (
              <Box
                component="img"
                src={URL.createObjectURL(selectedBanner)}
                alt="banner"
                sx={{ borderRadius: "10px", height: 200 }}
              />
            ) : (
              <Stack height={180} alignItems="center" justifyContent="center">
                <Typography variant="caption" mb={2}>
                  Banner suratini tanlang
                </Typography>
                <Box
                  component="img"
                  src={"/assets/media/photos.png"}
                  alt="banner"
                  sx={{ borderRadius: "10px", height: 100, width: 100 }}
                />
              </Stack>
            )}
            <Box sx={{ position: "absolute", bottom: 10, right: 10 }}>
              <Field component={BannerPicker} name="image" />
            </Box>
          </Stack>
          <Stack mt={3} mb={3}>
            <Field
              component={ProductSelectInput}
              name="productId"
              setUid={setUid}
            />
          </Stack>
          <Stack mt={4}>
            <LoadingButton
              loading={isAddLoading}
              onClick={handleSubmit(handleBannerSubmit)}
              variant="contained"
            >
              Qo`shish
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["productId", "image"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "add_carousel_banner_form",
  validate,
  enableReinitialize: true,
  initialValues: {
    productId: null,
    image: null,
  },
})(AddBannerModal);
