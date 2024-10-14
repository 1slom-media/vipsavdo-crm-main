import { Stack, TextField } from "@mui/material";

const NameInputs = ({ input, classes, meta }) => {
  return (
    <Stack gap="15px">
      <TextField
        label="Mahsulot nomi O'zbekcha"
        placeholder="Mahsulot nomi O'zbekcha"
        size="small"
        value={input?.value?.uz}
        error={meta.touched && meta.invalid && !input?.value?.uz}
        helperText={
          meta.touched && meta.error?.uz && !input?.value?.uz
            ? meta.error?.uz
            : null
        }
        onChange={(e) => {
          let val = {};
          if (input?.value) {
            val = { ...input?.value };
          }
          val["uz"] = e.target.value;
          input.onChange(val);
        }}
      />
      <TextField
        label="Название продукта русское."
        placeholder="Название продукта русское."
        size="small"
        value={input?.value?.ru}
        error={meta.touched && meta.invalid && !input?.value?.ru}
        helperText={
          meta.touched && meta.error?.uz && !input?.value?.ru
            ? meta.error?.ru
            : null
        }
        onChange={(e) => {
          let val = {};
          if (input?.value) {
            val = { ...input?.value };
          }
          val["ru"] = e.target.value;
          input.onChange(val);
        }}
      />
      <TextField
        label="Product Name in English"
        placeholder="Product Name in English"
        size="small"
        value={input?.value?.en}
        error={meta.touched && meta.invalid && !input?.value?.en}
        helperText={
          meta.touched && meta.error?.uz && !input?.value?.en
            ? meta.error?.en
            : null
        }
        onChange={(e) => {
          let val = {};
          if (input?.value) {
            val = { ...input?.value };
          }
          val["en"] = e.target.value;
          input.onChange(val);
        }}
      />
    </Stack>
  );
};

export default NameInputs;
