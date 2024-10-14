import { Stack } from "@mui/material";
import ReactQuillClean from "components/general/Inputs/ReactQuillClean";

const DescriptionInputs = ({ input, meta, label_en, label_uz, label_ru }) => {
  return (
    <Stack gap="15px">
      <ReactQuillClean
        placeholder={label_uz}
        theme="snow"
        box_height={250}
        value={input?.value?.uz}
        onChange={(valuP) => {
          let val = {};
          if (input?.value) {
            val = { ...input?.value };
          }
          val["uz"] = valuP;
          input?.onChange(val);
        }}
        error={
          meta.touched && meta.invalid && !input?.value?.uz
            ? meta?.error?.uz
            : null
        }
      />
      <ReactQuillClean
        placeholder={label_ru}
        theme="snow"
        box_height={250}
        meta={meta}
        lang="ru"
        value={input?.value?.ru}
        onChange={(valuP) => {
          let val = {};
          if (input?.value) {
            val = { ...input?.value };
          }
          val["ru"] = valuP;
          input?.onChange(val);
        }}
        error={
          meta.touched && meta.invalid && !input?.value?.ru
            ? meta?.error?.ru
            : null
        }
      />
      <ReactQuillClean
        placeholder={label_en}
        theme="snow"
        box_height={250}
        value={input?.value?.en}
        onChange={(valuP) => {
          let val = {};
          if (input?.value) {
            val = { ...input?.value };
          }
          val["en"] = valuP;
          input?.onChange(val);
        }}
        error={
          meta.touched && meta.invalid && !input?.value?.en
            ? meta?.error?.en
            : null
        }
      />
    </Stack>
  );
};

export default DescriptionInputs;
