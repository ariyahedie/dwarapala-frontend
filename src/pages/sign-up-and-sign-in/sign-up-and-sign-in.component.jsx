import React from "react";
import './sign-up-and-sign-in.styles.scss'

import SignUp from "../../components/sign-up/sign-up.component";

const SignUpAndSignIn = () => (
  <div className="sign-up-and-sign-in">
    <SignUp usertype="company" />
    {/* <SignIn /> */}
  </div>
);

export default SignUpAndSignIn;