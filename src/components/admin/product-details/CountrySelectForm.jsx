import * as React from "react";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCountry } from "redux-store/coutry/getCountry.slice";
import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const CountrySelectForm = ({ input, ...rest }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");
  //   const list = useSelector((state) => state.categories.parentalCategories);
  const country = useSelector((state) => state.country);

  React.useEffect(() => {
    if (!country || (country && !country?.length)) {
      dispatch(getCountry());
    }
  }, []);

  const options = Object.values(country.data).map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <Stack>
      <Stack>
        <Autocomplete
          onChange={(event, valueLabel) => {
            input?.onChange(valueLabel?.name);
          }}
          id="grouped-demo"
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.name}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label={t("SelectCountry")} />
          )}
        />
      </Stack>
    </Stack>
  );
};

export default CountrySelectForm;
