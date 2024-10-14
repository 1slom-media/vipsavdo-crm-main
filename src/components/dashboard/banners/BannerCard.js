import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Stack } from "@mui/system";
import SwitchInput from "components/general/Inputs/Switch";
import { Typography } from "@mui/material";
import DeleteBannerModal from "components/admin/Modals/DeleteBannerModal";
import { useDispatch } from "react-redux";
import {
  getCarouselBanners,
  updateCarouselBanner,
} from "redux-store/banners/banner.index.slice";
import { useSelector } from "react-redux";
import useAlert from "hooks/useAlert";

export default function BannerCard({ image, active, _id }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const alert = useAlert();

  const callBack = () => {
    dispatch(getCarouselBanners({ token }));
  };

  const handleStatusChange = () => {
    dispatch(
      updateCarouselBanner({
        id: _id,
        token,
        alert,
        callBack,
        data: { active: !active },
      })
    );
  };
  return (
    <Card>
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Banner surati"
      />
      <Stack
        p={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center">
          <SwitchInput
            input={{ value: active, onChange: handleStatusChange }}
          />
          <Typography variant="string==">
            {active ? "O'chirish" : "Faollashtirish"}
          </Typography>
        </Stack>
        <DeleteBannerModal id={_id} />
      </Stack>
    </Card>
  );
}
