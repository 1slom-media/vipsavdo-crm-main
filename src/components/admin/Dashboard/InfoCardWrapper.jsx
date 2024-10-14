import { Grid, Typography } from "@mui/material";
import BoxOutlined from "components/icons/BoxOutlined";
import CancelOutlined from "components/icons/CancelOutlined";
import CheckOutlined from "components/icons/CheckOutlined";
import ClockOutlined from "components/icons/ClockOutlined";
import ListingOutlined from "components/icons/ListingOutlined";
import TruckOutlined from "components/icons/TruckOutlined";
import React from "react";
import InfoCard from "./InfoCard";
import { StyledInfoChild } from "./styledComponents";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const InfoCardWrapper = ({ data, shadow }) => {
  const { t } = useTranslation("translation");

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={2}>
        <StyledInfoChild shadow={shadow}>
          <InfoCard color="info">
            <BoxOutlined />
          </InfoCard>
          <Typography variant="h5" color="info.900" textAlign="center" my={1}>
            {data.new || 0}
          </Typography>
          <Typography
            variant="string"
            color="info.900"
            textAlign="center"
            mb={1}
          >
            {t("NewOrders")}
          </Typography>
          <Typography
            variant="body2"
            color="success.900"
            textAlign="center"
            mb={1}
          >
            100%
          </Typography>
        </StyledInfoChild>
      </Grid>
      <Grid item xs={6} md={2}>
        <StyledInfoChild shadow={shadow}>
          <InfoCard color="neutral">
            <ListingOutlined />
          </InfoCard>
          <Typography variant="h5" color="info.900" textAlign="center" my={1}>
            {data.ready || 0}
          </Typography>
          <Typography
            variant="string"
            color="info.900"
            textAlign="center"
            mb={1}
          >
            {t("ReadyOrders")}
          </Typography>
          <Typography
            variant="body2"
            color="success.900"
            textAlign="center"
            mb={1}
          >
            100%
          </Typography>
        </StyledInfoChild>
      </Grid>
      <Grid item xs={6} md={2}>
        <StyledInfoChild shadow={shadow}>
          <InfoCard color="background">
            <TruckOutlined />
          </InfoCard>
          <Typography variant="h5" color="info.900" textAlign="center" my={1}>
            {data.onway || 0}
          </Typography>
          <Typography
            variant="string"
            color="info.900"
            textAlign="center"
            mb={1}
          >
            {t("OnwayOrders")}
          </Typography>
          <Typography
            variant="body2"
            color="success.900"
            textAlign="center"
            mb={1}
          >
            100%
          </Typography>
        </StyledInfoChild>
      </Grid>
      <Grid item xs={6} md={2}>
        <StyledInfoChild shadow={shadow}>
          <InfoCard color="success">
            <CheckOutlined />
          </InfoCard>
          <Typography variant="h5" color="info.900" textAlign="center" my={1}>
            {data.delivered || 0}
          </Typography>
          <Typography
            variant="string"
            color="info.900"
            textAlign="center"
            mb={1}
          >
            {t("DeliveredOrders")}
          </Typography>
          <Typography
            variant="body2"
            color="success.900"
            textAlign="center"
            mb={1}
          >
            100%
          </Typography>
        </StyledInfoChild>
      </Grid>
      <Grid item xs={6} md={2}>
        <StyledInfoChild shadow={shadow}>
          <InfoCard color="background">
            <CancelOutlined />
          </InfoCard>
          <Typography variant="h5" color="info.900" textAlign="center" my={1}>
            {data.canceled || 0}
          </Typography>
          <Typography
            variant="string"
            color="info.900"
            textAlign="center"
            mb={1}
          >
            {t("CanceledOrders")}
          </Typography>
          <Typography
            variant="body2"
            color="success.900"
            textAlign="center"
            mb={1}
          >
            100%
          </Typography>
        </StyledInfoChild>
      </Grid>
      <Grid item xs={6} md={2}>
        <StyledInfoChild shadow={shadow}>
          <InfoCard color="warning">
            <ClockOutlined />
          </InfoCard>
          <Typography variant="h5" color="info.900" textAlign="center" my={1}>
            {data.hold || 0}
          </Typography>
          <Typography
            variant="string"
            color="info.900"
            textAlign="center"
            mb={1}
          >
            {t("PendingOrders")}
          </Typography>
          <Typography
            variant="body2"
            color="success.900"
            textAlign="center"
            mb={1}
          >
            100%
          </Typography>
        </StyledInfoChild>
      </Grid>
    </Grid>
  );
};

InfoCardWrapper.propTypes = {
  data: PropTypes.object,
};

InfoCardWrapper.defaultProps = {
  data: {},
};

export default InfoCardWrapper;
