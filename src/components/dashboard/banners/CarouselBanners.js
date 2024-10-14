import { useEffect } from "react";
import { Button, Card, Divider, Grid, Skeleton, Stack } from "@mui/material";
import StyledSearch from "components/admin/StyledInputs/StyledSearch";
import BannerCard from "./BannerCard";
import AddBannerModal from "./AddBannerModal";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselBanners } from "redux-store/banners/banner.index.slice";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";

const CarouselBanners = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { list, isGetLoading } = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(getCarouselBanners({ token }));
  }, [token]);
  console.log("banner", list);

  return (
    <Stack>
      <Card>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <StyledSearch placeholder="Bannerni qidirish" />
          <AddBannerModal />
        </Stack>
      </Card>
      <Divider />
      <Stack py={2}>
        <Grid container spacing={2}>
          {isGetLoading ? (
            Array(10)
              .fill()
              .map((_, indx) => (
                <Grid key={indx} item xs={12} sm={6} md={4}>
                  <Card>
                    <Stack>
                      <Skeleton variant="rectangular" height={194} />
                    </Stack>
                    <Stack
                      p={1}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Skeleton variant="rounded" height={30} width={120} />
                      <Skeleton variant="circular" width={40} height={40} />
                    </Stack>
                  </Card>
                </Grid>
              ))
          ) : list && list?.length ? (
            list?.map((banner) => {
              return (
                <Grid key={banner?._id} item xs={12} sm={6} md={4}>
                  <BannerCard {...banner} />
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12}>
              <EmptyCard
                txt="Qo'shilgan bannerlar topilmadi ! "
                img="/assets/media/noBlackList.png"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default CarouselBanners;
