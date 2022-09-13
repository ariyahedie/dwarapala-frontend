import React from "react";
import './members-table.styles.scss';
import httpClient from "../../httpClient";
import config from "../../config";
import { connect } from "react-redux";
import { createTheme, ThemeProvider  } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormInput from "../form-input/form-input.component"; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 4,
};

const theme = createTheme({
  palette: {
    grey: {
      main: '#dedede',
      contrastText: '#5e5e5e',
    }
  }
});

class MembersTable extends React.Component {
  constructor() {
    super();

    this.state = {
      membersList: [],
      departmentsList: [],
      positionsList: [],
      open: false,
      name: '',
      email: '',
      department_id: '',
      position_id: ''
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  fetchMembers = async (key) => {
    const { currentUser, type } = this.props;
    try {
      const data = await httpClient.get(`${config.baseUrl}/member/${currentUser[key]}`);
      const { members } = data.data;
      this.setState({
        membersList: members.filter(member => 
          member.usertype === config.usertype[type]
        )
      });
    } catch (error) {
      console.error(error);
    }
  };

  fetchDepartments = async (key) => {
    const { currentUser } = this.props;
    try {
      const data = await httpClient.get(`${config.baseUrl}/department/${currentUser[key]}`);
      const { departments } = data.data;
      this.setState({ departmentsList: departments });
    } catch (error) {
      console.error(error);
    }
  };

  fetchPositions = async (key) => {
    const { currentUser } = this.props;
    try {
      const data = await httpClient.get(`${config.baseUrl}/position/${currentUser[key]}`);
      const { positions } = data.data;
      this.setState({ positionsList: positions });
    } catch (error) {
      console.error(error);
    }
  };

  getDepartment = (member) => {
    const { departmentsList } = this.state;
    const department = departmentsList.find(department => department.id === member.department);
    if(department === undefined) return;
    return department.name;
  };

  getPosition = (member) => {
    const { positionsList } = this.state;
    const position = positionsList.find(position => position.id === member.position);
    if(position === undefined) return;
    return position.name;
  };

  isMembersListEmpty = () => {
    return this.state.membersList.length === 0;
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  generatePassword = (name, position_id, department_id) => {
    const password = name.split(' ')[0] + '_' + position_id.substring(0, 5) + department_id.substring(0, 5);
    return password.charAt(0).toUpperCase() + password.slice(1);
  }

  createAdminPosition = async () => {
    const { currentUser, type } = this.props;
    if (type !== 'admin') return;
    try {
      const response = await httpClient.get(`${config.baseUrl}/admin-position-exist/${currentUser.id}`);
      if(response.data.position_id !== '') {
        this.setState({ position_id: response.data.position_id });
      }
      else {
        try {
          const res = await httpClient.post(`${config.baseUrl}/position`, {
            position: 'Admin',
            company_id: currentUser.id
          });
          this.setState({ position_id: res.data.id });
        } catch(error) {
          console.error(error);
        }
      }
    } catch(error) {
      console.error(error);
    }
  }

  getKey = () => {
    const { currentUser } = this.props;
    return currentUser.usertype === config.usertype.admin ? 'company' : 'id';
  }

  handleSubmit = async event => {
    event.preventDefault();
    await this.createAdminPosition();
    const { name, email, department_id, position_id } = this.state;
    const { currentUser, type } = this.props;
    const key = this.getKey();
    const password = this.generatePassword(name, position_id, department_id);
    console.log(password);
    try {
      const response = await httpClient.get(`${config.baseUrl}/company/${currentUser[key]}`);
      const company_name = response.data.company.name;
      await httpClient.post(`${config.baseUrl}/member/${currentUser[key]}`, {
        usertype_name: type,
        company_name,
        position_id,
        department_id,
        name,
        email,
        password
      });
      this.setState({
        name: '',
        email: '',
        department_id: '',
        position_id: ''
      });
      this.getAPI();
    } catch (error) {
      console.error(error.message);
    }
    this.handleClose();
  };

  getAPI = async () => {
    const key = this.getKey();
    this.fetchMembers(key);
    this.fetchDepartments(key);
    this.fetchPositions(key);
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  componentDidMount() {
    this.getAPI();
  }

  render (){
    const {
      membersList,
      open,
      name,
      email,
      departmentsList,
      positionsList
    } = this.state;
    const { type } = this.props;
    return (
      <div className="data-table">
        {
          this.isMembersListEmpty() ?
          (
            <h2>No {type} yet</h2>
          ) : (
            <h2>{this.capitalizeFirstLetter(type)}s List</h2>
          )
        }
        <ThemeProvider theme={theme}>
          <Button onClick={this.handleOpen} color="grey" variant="contained">Add new {type}</Button>
        </ThemeProvider>
        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a new {type}
            </Typography>
            <form className="add-admin-form" onSubmit={this.handleSubmit}>
              <FormInput
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                label="Name"
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
              <label>Select Department</label>
              <div className="select">
                <select onChange={this.handleChange} name="department_id">
                  <option value={''}>-</option>
                  {
                    departmentsList.map(department => (
                      <option key={department.id} value={department.id}>{department.name}</option>
                    ))
                  }
                </select>
              </div>
              {
                (type === 'admin') ? null : (
                  <div>
                    <label>Select Position</label>
                    <div className="select">
                      <select onChange={this.handleChange} name="position_id">
                        <option value={''}>-</option>
                        {
                          positionsList.map(position => (
                            position.name === 'Admin' ? null : (
                              <option key={position.id} value={position.id}>{position.name}</option>
                            )
                          ))
                        }
                      </select>
                    </div>
                  </div>
                )
              }
              <Button
                type="submit"
                variant="contained"
              >
                Add {type}
              </Button>
            </form>
          </Box>
        </Modal>
        <table className={`table ${this.isMembersListEmpty() ? 'hidden' : ''}`}>
          <thead>
            <tr>
              <th>{this.capitalizeFirstLetter(type)}s Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
          {
            membersList.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{this.getDepartment(member)}</td>
                <td>{this.getPosition(member)}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(MembersTable);