import { Grid, MenuItem, Stack, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import FeaturesSelectRow from "./FeatureSelectRow";
import { useRouter } from "next/router";

const Features = ({ value, input, meta, ...props }) => {
  const features = useSelector((state) => state.features.list);
  const router = useRouter();

  return (
    <Stack>
      <Grid container spacing={3}>
        {input?.value?.map((fet) => (
          <Grid item xs={12} key={fet?.uid}>
            <FeaturesSelectRow
              feature={fet}
              input={input}
              meta={meta}
              {...props}
            />
          </Grid>
        ))}
        <Grid item xs={12} md={6}>
          {input?.value && input?.value.length < 5 ? (
            <Stack>
              <TextField
                onChange={(event) => {
                  const selected = features?.find(
                    (item) => item.uid === parseInt(event.target.value)
                  );
                  if (selected) {
                    input.onChange([
                      ...input.value,
                      { ...selected, values: [] },
                    ]);
                  }
                }}
                fullWidth
                select
                label={props.label}
                helperText={meta.touched && meta.error}
                error={meta.touched && meta.invalid}
                {...props}
              >
                {features
                  ?.filter(
                    (fet) => !input?.value?.find((item) => item.uid === fet.uid)
                  )
                  ?.map((item) => (
                    <MenuItem key={item.uid} value={item.uid}>
                      {item?.title ? item?.title[router?.locale] : null}
                    </MenuItem>
                  ))}
              </TextField>
            </Stack>
          ) : null}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Features;
