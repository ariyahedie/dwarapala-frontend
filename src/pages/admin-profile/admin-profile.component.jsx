import React from "react";
import './admin-profile.styles.scss';
import config from "../../config";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import httpClient from "../../httpClient";

import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";

class AdminProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      currentName: '',
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      departmentsList: [],
      department_id: '',
      current_department_id: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { 
      name, 
      password, 
      newPassword,
      confirmNewPassword,
      currentName,
      current_department_id,
      department_id
    } = this.state;

    const { currentUser } = this.props;

    // change password
    if(password !== '' || newPassword !== '' || confirmNewPassword !== '') {
      if (password === '' || newPassword === '' || confirmNewPassword === '') {
        alert("complete form!");
        return;
      }
      try {
        await httpClient.put(`${config.baseUrl}/update-admin-password/${currentUser.id}`, {
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
        await httpClient.put(`${config.baseUrl}/update-admin-name/${currentUser.id}`, { name });
        this.setState({ currentName: name }, () => {
          this.setState({ name: '' });
        });
      } catch (error) {
        console.error(error.message);
      }
    }

    // change department
    if(current_department_id !== department_id && department_id !== '') {
      try {
        await httpClient.put(`${config.baseUrl}/update-admin-department/${currentUser.id}`, {
          department_id
        });
        this.setState({ current_department_id: department_id }, () => {
          this.setState({ department_id: '' });
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
    console.log(name, value);
    this.setState({ [name]: value });
  };

  getDepartment = (member) => {
    const { departmentsList } = this.state;
    const department = departmentsList.find(department => department.id === member.department);
    if(department === undefined) return;
    return department.name;
  };

  fetchDepartments = async () => {
    const { currentUser } = this.props;
    try {
      const data = await httpClient.get(`${config.baseUrl}/department/${currentUser.company}`);
      const { departments } = data.data;
      this.setState({ departmentsList: departments });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    const { currentUser } = this.props;
    this.fetchDepartments();
    this.setState({
      currentName: currentUser.name,
      name: currentUser.name,
      newPassword: '',
      confirmNewPassword: '',
      password: '',
      confirmPassword: '',
      current_department_id: currentUser.department
    });
  }

  render() {
    const { 
      name,
      password,
      newPassword,
      confirmNewPassword,
      departmentsList
    } = this.state;

    const { currentUser } = this.props;

    return(
      <div className="admin-profile">
        <h2 className="title">
          Admin Profile
        </h2>
        <form className="profile-update-form" onSubmit={this.handleSubmit}>
          <h4>Change Name</h4>
          <FormInput
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            label="Change admin name"
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
          <label>Change Department</label>
          <div className="select">
            <select onChange={this.handleChange} name="department_id">
              <option
                key={currentUser.department}
                value={currentUser.department}
              >
                {this.getDepartment(currentUser)}
              </option>
              {
                departmentsList.map(department => {
                  if(department.id !== currentUser.department) {
                    return (
                      <option
                        key={department.id}
                        value={department.id}
                      >
                        {department.name}
                      </option>
                    );
                  } else return null;
                })
              }
            </select>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);