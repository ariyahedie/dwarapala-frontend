import React from "react";
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/DwarapalaLogo.svg';
import httpClient from "../../httpClient";
import config from "../../config";
import { connect } from 'react-redux';
import { setCurrentUser } from "../../redux/user/user.actions";
import './header.styles.scss'

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
      open: false
    }
  }

  logoutUser = async () => {
    await httpClient.post(`${config.baseUrl}/logout-user`);
    setCurrentUser({});
    window.location.href = '/';
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget, open: true });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, open: false });
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  stringToColor = (string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  
  stringAvatar = (name) => {
    let initial_name = '';
    name.split(' ').forEach((n, index) => {
      if(index <= 1) {
        initial_name = initial_name.concat(this.capitalizeFirstLetter(n[0]))
      }
    })
    return {
      sx: {
        bgcolor: this.stringToColor(name),
        mx: "auto",
        width: "32px",
        height: "32px",
        border: "1px solid grey"
      },
      children: initial_name
    };
  }

  // getUsertype = () => {
  //   const { currentUser } = this.props;
  //   switch(currentUser.usertype) {
  //     case config.usertype.admin:
  //       return 'Admin';
  //     case config.usertype.company:
  //       return 'Company';
  //     case config.usertype.member:
  //       return 'Member';
  //     case config.usertype.superadmin:
  //       return 'Superadmin';
  //     default:
  //       return;
  //   }
  // }

  render() {
    const { currentUser } = this.props;
    const { open } = this.state;
    return (
      <div className="header">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        {
          currentUser ? (
            <div>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ minWidth: 50 }}>
                  {this.capitalizeFirstLetter(currentUser.name)}
                </Typography>
                <Tooltip title="Your Account">
                  <IconButton
                    onClick={this.handleClick}
                    size="medium"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar {...this.stringAvatar(currentUser.name)} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={this.state.anchorEl}
                id="account-menu"
                open={open}
                onClose={this.handleClose}
                onClick={this.handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <Avatar /> Your Profile
                </MenuItem>
                <Divider />
                {/* <MenuItem>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem> */}
                {/* <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem> */}
                <MenuItem onClick={this.logoutUser}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : null
        }
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);