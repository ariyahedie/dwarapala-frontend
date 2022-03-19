import React from "react";
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/DwarapalaLogo.svg';
import httpClient from "../../httpClient";
import config from "../../config";
import { connect } from 'react-redux';
import { setCurrentUser } from "../../redux/user/user.actions";
import './header.styles.scss'

import CustomButton from "../custom-button/custom-button.component";

class Header extends React.Component {
  logoutUser = async () => {
    await httpClient.post(`${config.baseUrl}/logout-user`);
    setCurrentUser({});
    window.location.href = '/';
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className="header">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        {
          currentUser ? (
            <CustomButton
              onClick={this.logoutUser}
              inverted
            >
              Sign Out
            </CustomButton>
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