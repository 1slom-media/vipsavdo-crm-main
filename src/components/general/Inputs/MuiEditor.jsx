import MUIRichTextEditor from "mui-rte";
import InvertColorsIcon from "@mui/icons-material/InvertColors";

const MuiTextEditor = () => {
  return (
    <MUIRichTextEditor
      controls={["my-style"]}
      customControls={[
        {
          name: "my-style",
          icon: <InvertColorsIcon />,
          type: "inline",
          inlineStyle: {
            backgroundColor: "black",
            color: "white",
          },
        },
      ]}
    />
  );
};

export default MuiTextEditor;
