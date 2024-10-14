import FeaturePriceMarkerInput from "./FeaturePriceMarkerInput";
import { Grid, Stack } from "@mui/material";

const FeaturePriceMarker = ({ input }) => {
  return (
    <Stack>
      <Grid container spacing={2}>
        {input?.value?.map((feta) => {
          return feta.subfeatures.map((subFeta) => (
            <Grid item xs={12} md={6} key={subFeta._id}>
              <FeaturePriceMarkerInput
                feature={feta}
                subFeature={subFeta}
                {...input}
              />
            </Grid>
          ));
        })}
      </Grid>
    </Stack>
  );
};

export default FeaturePriceMarker;
