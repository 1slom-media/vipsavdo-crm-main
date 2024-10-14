import * as React from "react";
import { Avatar, Divider, IconButton, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCommentList } from "redux-store/admin/comments/comment.slice";
import { useTranslation } from "react-i18next";

const CommentItem = ({ order, text, name, date, rating, photo }) => {
  const router = useRouter();
  const { t } = useTranslation("translation");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Stack my={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap="20px"
        py={2}
      >
        <Stack direction="row" alignItems="center" gap="10px">
          <Avatar />
          <Stack>
            <Typography>{name}</Typography>
            <Typography>{date}</Typography>
          </Stack>
        </Stack>
        <Stack>
          <Rating value={rating} />
          <Typography>{text}</Typography>
        </Stack>
        <Stack>
          <IconButton
            shape="rounded"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>{t("Answer")}</MenuItem>
            <MenuItem onClick={handleClose}>{t("Editt")}</MenuItem>
            <MenuItem onClick={handleClose}>{t("Delete")}</MenuItem>
          </Menu>
        </Stack>
      </Stack>
      <Divider />
    </Stack>
  );
};

export default CommentItem;
