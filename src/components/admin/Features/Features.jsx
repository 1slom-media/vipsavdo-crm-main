import { Box, Button, Grid, MenuItem, Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const Features = ({ value, values, input, meta, arr, ...props }) => {
  const [featureArr, setFeatureArr] = useState([...arr]);
  const router = useRouter();
  return (
    <Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            value={value}
            onChange={input.onChange}
            defaultValue={input.value}
            fullWidth
            select
            label={props.label}
            helperText={meta.touched && meta.error}
            error={meta.touched && meta.invalid}
            {...props}
          >
            {featureArr?.map((item) => (
              <MenuItem key={item.uid} value={item.uid?.toString()}>
                {item?.title ? item?.title[router?.locale] : null}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Features;
