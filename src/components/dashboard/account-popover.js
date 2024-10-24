import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Cog as CogIcon } from "../../icons/cog";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { useDispatch } from "react-redux";
import { removeUser } from "redux-store/user/auth.slice";
import { removeUserData } from "redux-store/user/user.slice";
import { useSelector } from "react-redux";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`

  const handleLogout = async () => {
    dispatch(removeUser());
    dispatch(removeUserData());
    router.push("/");
  };

  const user = useSelector((state) => state.user.data);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: "center",
          p: 2,
          display: "flex",
        }}
      >
        <Avatar
          src={user?.avatar}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography variant="body1">{user?.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            {user?.phone}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <NextLink href="/dashboard/account" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <UserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Mening sahifam</Typography>}
            />
          </MenuItem>
        </NextLink>
        <NextLink href="/dashboard" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">Statistika bo`limi</Typography>
              }
            />
          </MenuItem>
        </NextLink>
        <NextLink href="/dashboard/settings" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">Umumiy sozlamalar</Typography>
              }
            />
          </MenuItem>
        </NextLink>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Tizmidan chiqish</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
