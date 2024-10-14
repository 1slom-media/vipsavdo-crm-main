import * as React from "react";
import { Stack } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const CategorySelectRow = ({ children, input }) => {
  const router = useRouter();
  const { t } = useTranslation("translation");

  const [selected, setSelected] = React.useState(null);

  return (
    <Stack>
      <Stack>
        <FormControl fullWidth>
          <InputLabel size="small" id="demo-simple-select-label">
            {t("ChooseCate")}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={t("ChooseCate")}
            value={selected}
            size="small"
            onChange={(e) => {
              setSelected(e.target.value);
              input.onChange(e.target.value?.uid);
            }}
          >
            {children?.map((item, indx) => (
              <MenuItem key={indx} value={item}>
                {item?.title && item?.title[router?.locale]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack mt={3}>
        {selected?.children.length && (
          <CategorySelectRow children={selected.children} input={input} />
        )}
      </Stack>
    </Stack>
  );
};

export default CategorySelectRow;
