import { Switch, styled, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-switchBase.MuiButtonBase-root": {
    backgroundColor: "transparent",
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.grey[400],
    "&:before, &:after": {
      width: 16,
      height: 16,
      top: "50%",
      content: '""',
      position: "absolute",
      transform: "translateY(-50%)",
    },
  },
  "& .MuiSwitch-thumb": {
    width: 16,
    height: 16,
    margin: "2px",
    boxShadow: "none",
    backgroundColor: theme.palette.grey[600],
  },
  "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
    backgroundColor: theme.palette.info.main,
  },
}));

const FeaturePriceMarkerInput = ({ value, onChange, subFeature, feature }) => {
  const { t } = useTranslation("translation");
  const [on, setStatus] = useState(false);

  return (
    <Stack gap="5px">
      <TextField
        type="number"
        value={subFeature?.price}
        onChange={(e) => {
          let features = value ? [...value] : [];
          let subFeatures = feature?.subfeatures
            ? [...feature?.subfeatures]
            : [];
          const fetaIndxPosition = features.findIndex(
            (item) => item._id === feature._id
          );
          const subFetaIndxPosition = subFeatures?.findIndex(
            (item) => item._id === subFeature._id
          );
          subFeatures[subFetaIndxPosition] = {
            ...subFeature,
            price: parseInt(e.target.value),
          };
          features[fetaIndxPosition]["subfeatures"] = subFeatures;
          onChange(features);
        }}
        disabled={!on}
        size="small"
        placeholder={`${subFeature?.name} ${feature?.name} ${t("Narxi")}`}
        label={`${subFeature?.name} ${feature?.name?.toLowerCase()} ${t(
          "Narxi"
        )}`}
        sx={{ marginBottom: "10px" }}
      />
      <Stack direction="row" alignItems="center">
        <StyledSwitch
          checked={on}
          onChange={(e) => setStatus(e.target.checked)}
        />
        <Typography variant="caption" ml={1}>
          {t("SetPriceForThis")}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default FeaturePriceMarkerInput;
