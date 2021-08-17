import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { onDelete } from "../../Redux/Chat/Chat-operations";
import { socket } from "../helpers/io";
import { getRoomId } from "../../Redux/selectors";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [close, setClose] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const roomId = useSelector(getRoomId);
  const id = props.id;

  useEffect(() => {
    setAnchorEl(props.anchorEl);
  }, [props.anchorEl]);

  useEffect(() => {
    setAnchorEl(null);
    props.sendAnchor(null);
    setClose(false);
  }, [close]);

  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setClose(true)}
    >
      <StyledMenuItem>
        <ListItemIcon>
          <SendIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Delete"
          onClick={() => {
            dispatch(onDelete({ id: id }, roomId));
            // socket.emit("message:delete", id);
            props.handleToUpdate(id);
            setClose(true);
          }}
        />
      </StyledMenuItem>
      <StyledMenuItem>
        <ListItemIcon>
          <DraftsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Edit"
          onClick={() => {
            props.onChangeMenu({ id: id });
            props.handleToUpdate(id);
            setClose(true);
          }}
        />
      </StyledMenuItem>
      <StyledMenuItem>
        <ListItemIcon>
          <DraftsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Copy Text"
          onClick={() => {
            console.log(props);
            props.getCopiedMessage({ id: id });
            setClose(true);
          }}
        />
      </StyledMenuItem>
    </StyledMenu>
  );
}
