import { SvgIcon } from "@mui/material";

const UserContainedIcon = (props) => {
  return (
    <SvgIcon
      {...props}
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="34" height="34" rx="17" fill="#E8E7F6" />
      <path
        d="M17 17C19.21 17 21 15.21 21 13C21 10.79 19.21 9 17 9C14.79 9 13 10.79 13 13C13 15.21 14.79 17 17 17ZM17 19C14.33 19 9 20.34 9 23V25H25V23C25 20.34 19.67 19 17 19Z"
        fill="#FFBA33"
      />
    </SvgIcon>
  );
};

export default UserContainedIcon;
