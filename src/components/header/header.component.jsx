import React from "react";
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/DwarapalaLogo.svg';
import './header.styles.scss'

import CustomButton from "../custom-button/custom-button.component";

const Header = () => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <CustomButton inverted>Sign Out</CustomButton>
  </div>
);

export default Header;