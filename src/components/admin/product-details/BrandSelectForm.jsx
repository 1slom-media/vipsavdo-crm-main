import * as React from "react";
import { Stack } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBrands } from "redux-store/brands/brands.slice";
import { useTranslation } from "react-i18next";

const BrandSelectForm = ({ input, ...rest }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const list = useSelector((state) => state.brands.data.brands);

  React.useEffect(() => {
    dispatch(getBrands());
  }, []);

  return (
    <Stack>
      <Stack>
        <FormControl fullWidth>
          <InputLabel size="small" id="demo-simple-select-label">
            {t("ChooseProdBrand")}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={t("ChooseProdBrand")}
            size="small"
            value={parseInt(input?.value)}
            onChange={(e) => {
              input.onChange(e.target.value);
            }}
          >
            {list?.map((item, indx) => (
              <MenuItem key={indx} value={item.uid}>
                {item?.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default BrandSelectForm;
