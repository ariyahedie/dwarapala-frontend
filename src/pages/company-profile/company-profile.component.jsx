import React from "react";
import './company-profile.styles.scss';
import config from "../../config";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import httpClient from "../../httpClient";

import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import { IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

class CompanyProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      currentName: '',
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      departments: [],
      positions: [],
      departmentsList: [{department: ''}],
      positionsList: [{position: ''}]
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
        await httpClient.put(`${config.baseUrl}/update-company-password/${currentUser.id}`, {
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
        await httpClient.put(`${config.baseUrl}/update-company-name/${currentUser.id}`, { name });
        this.setState({ currentName: name }, () => {
          this.setState({ name: '' });
        });
      } catch (error) {
        console.error(error.message);
      }
    }

    // add department and position
    this.addDepartment();
    this.addPosition();
    // console.log('add pos')
    setTimeout(() => {
      // navigate to /profile
      window.location.href = '/profile';
    }, 500);

  };

  addDepartment = async () => {
    const { currentUser } = this.props;
    this.state.departmentsList.map(async dep => {
      const department = dep.department
      if(department === '') return;
      try {
        await httpClient.post(`${config.baseUrl}/department`, {
          department, 
          company_id: currentUser.id
        });
      } catch (error) {
        console.error(error.message);
      }
    });
    this.setState({
      departmentsList: [{ department: '' }]
    });
  }

  addPosition = async () => {
    const { currentUser } = this.props;
    this.state.positionsList.map(async pos => {
      const position = pos.position
      // console.log(position)
      if(position === '') return;
      try {
        await httpClient.post(`${config.baseUrl}/position`, {
          position, 
          company_id: currentUser.id
        });
      } catch (error) {
        console.error(error.message);
      }
    });
    this.setState({
      positionsList: [{ position: '' }]
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeList = (index, event, key) => {
    const values = [...this.state[key]];
    values[index][event.target.name] = event.target.value;
    this.setState({ [key]: values });
  }

  handleAddFields = (index, key, initial_value) => {
    const list = this.state[key];
    const values = [...list];
    values.splice(index+1, 0, initial_value);
    this.setState({ [key]: values });
  }

  handleRemoveFields = (index, key) => {
    const list = this.state[key];
    const values  = [...list];
    values.splice(index, 1);
    this.setState({ [key]: values });
  }

  fetchDepartments = async () => {
    const { currentUser } = this.props;
    try {
      const data = await httpClient.get(`${config.baseUrl}/department/${currentUser.id}`);
      const { departments } = data.data;
      this.setState({ departments: departments });
    } catch (error) {
      console.error(error);
    }
  };

  fetchPositions = async () => {
    const { currentUser } = this.props;
    try {
      const data = await httpClient.get(`${config.baseUrl}/position/${currentUser.id}`);
      const { positions } = data.data;
      this.setState({ positions: positions });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    const { currentUser } = this.props;
    this.fetchDepartments();
    this.fetchPositions();
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
      confirmNewPassword,
      departments,
      positions,
      departmentsList,
      positionsList
    } = this.state;

    return(
      <div className="company-profile">
        <h2 className="title">
          Company Profile
        </h2>
        <form className="profile-update-form" onSubmit={this.handleSubmit}>
          <h4>Change Name</h4>
          <FormInput
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            label="Change company name"
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
          <h4>Company Departments</h4>
          {
            departments.map((department, index) => (
              <div className="dynamic-form" key={index}>
                <TextField
                  className="dynamic-input"
                  type="text"
                  name="department"
                  value={department.name}
                  onChange={(event) => event.preventDefault()}
                  label=""
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ mb: "20px" }}
                />
              </div>
            ))
          }
          {
            departmentsList.map((department, index) => (
              <div className="dynamic-form" key={index}>
                <TextField
                  className="dynamic-input"
                  type="text"
                  name="department"
                  value={department['department']}
                  onChange={event => this.handleChangeList(index, event, 'departmentsList')}
                  label="Add Department"
                  variant="outlined"
                  sx={{ mb: "20px" }}
                />
                <IconButton
                  onClick={() => this.handleAddFields(index, 'departmentsList', { department: '' })}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => this.handleRemoveFields(index, 'departmentsList')}
                  disabled={departmentsList.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))
          }
          <h4>Company Positions</h4>
          {
            positions.map((position, index) => (
              <div className="dynamic-form" key={index}>
                <TextField
                  className="dynamic-input"
                  type="text"
                  name="position"
                  value={position.name}
                  onChange={(event) => event.preventDefault()}
                  label=""
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ mb: "20px" }}
                />
              </div>
            ))
          }
          {
            positionsList.map((position, index) => (
              <div className="dynamic-form" key={index}>
                <TextField
                  className="dynamic-input"
                  type="text"
                  name="position"
                  value={position['position']}
                  onChange={event => this.handleChangeList(index, event, 'positionsList')}
                  label="Add Position"
                  variant="outlined"
                  sx={{ mb: "20px" }}
                />
                <IconButton
                  onClick={() => this.handleAddFields(index, 'positionsList', { position: '' })}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => this.handleRemoveFields(index, 'positionsList')}
                  disabled={positionsList.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);