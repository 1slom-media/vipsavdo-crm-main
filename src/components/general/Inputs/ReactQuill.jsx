import { Box, FormHelperText, Stack, styled } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";

const CustomQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const ReactQuill = ({
  error,
  box_height,
  input: { onChange, value },
  meta,
  ...props
}) => {
  const Container = styled(Box)(({ theme, box_height }) => ({
    "& .quill": {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${
        error ? theme.palette.error.main : theme.palette.background.card
      }`,
      borderRadius: "10px",
    },
    "& .ql-toolbar.ql-snow": {
      padding: 0,
      margin: "0 10px 10px 10px",
      border: "none",
      paddingTop: "10px",
      order: 1,
      borderTop: `1px solid ${theme.palette.background.card}`,
    },
    "& .ql-editor": {
      minHeight: box_height ?? 500,
      color: `${theme.palette.text.primary} !important`,
      direction: theme.direction, // ...(theme.direction === "rtl" && { direction: "rtl", textAlign: "right" }),
    },
    "& .ql-container.ql-snow": {
      border: "none",
    },
    "& .ql-container": {
      minHeight: box_height ?? 500,
      // borderColor: theme.palette.divider,
    },
    "& .ql-editor.ql-blank::before": {
      color: `${theme.palette.text.secondary} !important`,
      // borderColor: theme.palette.divider,
    },
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
  }));
  return (
    <Stack>
      <Container box_height={box_height}>
        <CustomQuill
          theme="snow"
          modules={modules}
          {...props}
          onChange={onChange}
          value={value}
        />
      </Container>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Stack>
  );
};

ReactQuill.defaultProps = {
  input: { onChange: () => {}, value: "" },
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

export default ReactQuill;
