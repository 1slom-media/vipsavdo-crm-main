import { Stack, TextField } from "@mui/material";

const GeneralNameInput = ({ input, label_en, label_uz, label_ru }) => {
  return (
    <Stack gap="15px">
      <TextField
        label={label_uz}
        placeholder={label_uz}
        size="small"
        value={input?.value?.uz}
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
        label={label_ru}
        placeholder={label_ru}
        size="small"
        value={input?.value?.ru}
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
        label={label_en}
        placeholder={label_en}
        size="small"
        value={input?.value?.en}
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

export default GeneralNameInput;
