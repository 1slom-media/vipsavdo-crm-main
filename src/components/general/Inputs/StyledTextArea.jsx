import * as React from "react";
import Textarea from "@mui/joy/Textarea";
import PropTypes from "prop-types";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { useTheme } from "@emotion/react";

export default function StyledTextArea({
  label,
  input,
  classes,
  meta,
  rows,
  ...custom
}) {
  const addEmoji = (emoji) => () => input.onChange(`${input.value}${emoji}`);
  const theme = useTheme();
  return (
    <CssVarsProvider>
      <Textarea
        error={meta.touched ? meta.invalid : null}
        fullWidth
        helperText={meta.touched ? meta.error : null}
        placeholder={label}
        {...input}
        {...custom}
        minRows={rows ? rows : 4}
        variant="outlined"
        sx={{
          padding: "5px",
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: "1px solid",
          borderColor: theme.palette.devider,
          height: "100%",
        }}
        endDecorator={
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("👍")}
            >
              👍
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("😔")}
            >
              😔
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("😡")}
            >
              😡
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("🛠")}
            >
              🛠
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("🏦")}
            >
              🏦
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("✈️")}
            >
              ✈️
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={() => input.onChange("")}
            >
              <SettingsBackupRestoreIcon />
            </IconButton>
          </Box>
        }
      />
    </CssVarsProvider>
  );
}

StyledTextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
  meta: PropTypes.object,
  input: PropTypes.object,
  custom: PropTypes.object,
};

StyledTextArea.defaultProps = {
  label: "Xabar kiriting",
  placeholder: "",
  classes: {},
  meta: {},
  input: {},
  custom: {},
};
