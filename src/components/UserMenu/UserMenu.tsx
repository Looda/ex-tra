import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { FormattedMessage, useIntl } from "react-intl";
import { useUsers } from "../UserContext/UserContextProvider";

const UserMenu: React.FC = () => {
  const intl = useIntl();
  const { logOut, isAuth } = useUsers();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logOut();
    setAnchorEl(null);
  };

  if (!isAuth) {
    return null;
  }

  return (
    <div>
      <IconButton
        aria-label={intl.formatMessage({ id: "userMenu.label" })}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <FormattedMessage id="userMenu.logOut" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
