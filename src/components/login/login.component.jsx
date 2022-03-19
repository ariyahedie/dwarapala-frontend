import React from "react";
import './login.styles.scss';
import httpClient from "../../httpClient";
import config from "../../config";
import {Link} from "react-router-dom";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await httpClient.post(`${config.baseUrl}/login-user`, {
        email,
        password
      }).then(response => {
        console.log(response.data.id);
      });
      this.setState({
        email: '',
        password: ''
      });
      window.location.href = '/';
    } catch (error) {
      console.error(error.message);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
        <h2 className="title">
          Log into your account
        </h2>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <CustomButton type="submit">Login</CustomButton>
          <Link className="sign-up-link" to="/signup">Don't have an account? Sign up</Link>
        </form>
      </div>
    );
  }
}

export default Login;