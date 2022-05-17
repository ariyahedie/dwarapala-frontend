import React from "react";
import './superadmin-profile.styles.scss';
import config from "../../config";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import httpClient from "../../httpClient";

import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";

class SuperadminProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      currentName: '',
      password: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { 
      name, 
      password, 
      newPassword,
      confirmNewPassword,
      currentName
    } = this.state;

    const { currentUser } = this.props;

    // change password
    if(password !== '' || newPassword !== '' || confirmNewPassword !== '') {
      if (password === '' || newPassword === '' || confirmNewPassword === '') {
        alert("complete form!");
        return;
      }
      try {
        await httpClient.put(`${config.baseUrl}/update-superadmin-password/${currentUser.id}`, {
          password,
          newPassword
        });
        this.setState({ 
          password: '', 
          newPassword: '', 
          confirmNewPassword: '' 
        });
      } catch (error) {
        console.error(error.message);
      }
    }
    
    // change name
    if(currentName !== name && name !== '') {
      try {
        await httpClient.put(`${config.baseUrl}/update-superadmin-name/${currentUser.id}`, { name });
        this.setState({ currentName: name }, () => {
          this.setState({ name: '' });
        });
      } catch (error) {
        console.error(error.message);
      }
    }

    // navigate to /profile
    window.location.href = '/profile';
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    const { currentUser } = this.props;
    this.setState({
      currentName: currentUser.name,
      name: currentUser.name,
      newPassword: '',
      confirmNewPassword: '',
      password: '',
      confirmPassword: ''
    });
  }

  render() {
    const { 
      name,
      password,
      newPassword,
      confirmNewPassword
    } = this.state;

    return(
      <div className="superadmin-profile">
        <h2 className="title">
          Superadmin Profile
        </h2>
        <form className="profile-update-form" onSubmit={this.handleSubmit}>
          <h4>Change Name</h4>
          <FormInput
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            label="Change superadmin name"
            required
          />
          <h4>Change Password</h4>
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Current Password"
          />
          <FormInput
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={this.handleChange}
            label="New Password"
          />
          <FormInput
            type="password"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={this.handleChange}
            label="Confirm New Password"
          />
          <CustomButton type="submit">Save</CustomButton>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SuperadminProfile);