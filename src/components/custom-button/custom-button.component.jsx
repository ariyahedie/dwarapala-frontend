import React from "react";

import './custom-button.styles.scss';

const CustomButton = ({ children, inverted, baseColor, ...otherProps }) => (
  <button
    className={`${ inverted ? 'inverted' : '' } ${ baseColor } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;