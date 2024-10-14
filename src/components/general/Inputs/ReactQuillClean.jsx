import { FormHelperText, Stack, alpha } from "@mui/material";
import {
  StyledEditor,
  StyledEditorToolbar,
} from "newgen-componenets/Editor/styles";
import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";

const CustomQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const ReactQuillClean = ({ error, box_height, onChange, value, ...props }) => {
  return (
    <Stack>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
            "& .ql-editor": {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            },
          }),
        }}
      >
        <StyledEditorToolbar />
        <CustomQuill
          theme="snow"
          modules={modules}
          {...props}
          value={value}
          onChange={onChange}
        />
      </StyledEditor>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Stack>
  );
};

const modules = {
  toolbar: [
    [
      {
        header: [1, 2, 3, 4, 5, 6, false],
      },
    ],
    [
      {
        font: [
          8, 9, 10, 11, 12, 13, 14, 15, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25,
          26,
        ],
      },
    ],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      {
        list: "ordered",
      },
      {
        list: "bullet",
      },
      {
        indent: "-1",
      },
      {
        indent: "+1",
      },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

export default ReactQuillClean;
