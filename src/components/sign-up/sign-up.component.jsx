import React from "react";
import './sign-up.styles.scss'
import config from "../../config";
import axios from "axios";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import { IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      departments: [{ department: '' }],
      positions: [{ position: '' }]
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = this.state;
    
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    
    let company_id = '';
    try {
      await axios.post(`${config.baseUrl}/${this.props.usertype}`, {
        name,
        email,
        password
      }).then(response => {
        company_id = response.data.id;
      });
      this.setState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error(error.message);
    }

    if(this.props.usertype === 'company') {
      this.addDepartment(company_id);
      this.addPosition(company_id);
    }
    company_id = '';
  };

  addDepartment = (company_id) => {
    this.state.departments.map(async dep => {
      const department = dep.department
      try {
        await axios.post(`${config.baseUrl}/department`, {department, company_id});
      } catch (error) {
        console.error(error.message);
      }
    });
    this.setState({
      departments: [{ department: '' }]
    });
  }

  addPosition = (company_id) => {
    this.state.positions.map(async pos => {
      const position = pos.position
      try {
        await axios.post(`${config.baseUrl}/position`, {position, company_id});
      } catch (error) {
        console.error(error.message);
      }
    });
    this.setState({
      positions: [{ position: '' }]
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

  render() {
    const { 
      name,
      email,
      password,
      confirmPassword,
      departments,
      positions
    } = this.state;

    return(
      <div className="sign-up">
        <h2 className="title">
          Sign up your company
        </h2>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            label="Company name"
            required
          />
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
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <h4>Add Company Departments</h4>
          {
            departments.map((department, index) => (
              <div className="dynamic-form" key={index}>
                <TextField
                  className="dynamic-input"
                  type="text"
                  name="department"
                  value={department['department']}
                  onChange={event => this.handleChangeList(index, event, 'departments')}
                  label="Add Department"
                  variant="filled"
                  required
                />
                <IconButton
                  onClick={() => this.handleAddFields(index, 'departments', { department: '' })}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => this.handleRemoveFields(index, 'departments')}
                  disabled={departments.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))
          }
          <h4>Add Positions for Members</h4>
          {
            positions.map((position, index) => (
              <div className="dynamic-form" key={index}>
                <TextField
                  className="dynamic-input"
                  type="text"
                  name="position"
                  value={position['position']}
                  onChange={event => this.handleChangeList(index, event, 'positions')}
                  label="Add Position"
                  variant="filled"
                  required
                />
                <IconButton
                  onClick={() => this.handleAddFields(index, 'positions', { position: '' })}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => this.handleRemoveFields(index, 'positions')}
                  disabled={positions.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))
          }
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;