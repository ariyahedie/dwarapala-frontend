import React from "react";
import './sign-up-page.styles.scss'

import SignUp from "../../components/sign-up/sign-up.component";

const SignUpPage = () => (
  <div className="sign-up">
    <SignUp usertype="company" />
  </div>
);

export default SignUpPage;