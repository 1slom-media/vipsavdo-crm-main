import { styled, Switch } from "@mui/material";
import useAlert from "hooks/useAlert";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-switchBase.MuiButtonBase-root": {
    backgroundColor: "transparent",
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.grey[400],
    "&:before, &:after": {
      width: 16,
      height: 16,
      top: "50%",
      content: '""',
      position: "absolute",
      transform: "translateY(-50%)",
    },
  },
  "& .MuiSwitch-thumb": {
    width: 16,
    height: 16,
    margin: "2px",
    boxShadow: "none",
    backgroundColor: theme.palette.grey[600],
  },
  "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
    backgroundColor: theme.palette.info.main,
  },
}));

const SwitchInput = ({ input, meta, selectableOff, ...rest }) => {
  const alert = useAlert();
  return (
    <StyledSwitch
      checked={input.value}
      onChange={(e) => {
        if (selectableOff) {
          alert.error({
            title: "Ooops",
            text: "O'chirib bo'lmaydigan qiymat!",
          });
        } else {
          input.onChange(e.target.checked);
        }
      }}
      {...rest}
    />
  );
};

SwitchInput.defaultProps = {
  input: {},
  rest: {},
  meta: {},
};

export default SwitchInput;
