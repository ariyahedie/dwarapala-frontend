import React from "react";
import './member-homepage.styles.scss';
import httpClient from "../../httpClient";
import config from "../../config";
import { connect } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

class MemberHomepage extends React.Component {
  constructor() {
    super();

    this.state = {
      company: '',
      position: '',
      department: ''
    }
  }

  getCompany = async () => {
    const { currentUser } = this.props;
    try {
      const response = await httpClient.get(`${config.baseUrl}/company/${currentUser.company}`);
      this.setState({ company: response.data.company });
    } catch(error) {
      console.error(error);
    }
  }

  getPosition = async () => {
    const { currentUser } = this.props;
    try {
      const response = await httpClient.get(`${config.baseUrl}/position-by-position/${currentUser.position}`);
      this.setState({ position: response.data.position });
    } catch(error) {
      console.error(error);
    }
  }

  getDepartment = async () => {
    const { currentUser } = this.props;
    try {
      const response = await httpClient.get(`${config.baseUrl}/department-by-department/${currentUser.department}`);
      this.setState({ department: response.data.department });
    } catch(error) {
      console.error(error);
    }
  }

  stringToColor = (string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  
  stringAvatar = (name) => {
    let initial_name = '';
    name.split(' ').forEach((n, index) => {
      if(index <= 1) {
        initial_name = initial_name.concat(n[0])
      }
    })
    return {
      sx: {
        bgcolor: this.stringToColor(name),
        mx: "auto",
        border: "1px solid grey"
      },
      children: initial_name
    };
  }

  componentDidMount() {
    this.getCompany();
    this.getPosition();
    this.getDepartment();
  }

  render() {
    const { currentUser } = this.props;
    const { company, position, department } = this.state;
    return (
      <div className="member-homepage">
        <div className="profile-card">
          <Stack direction="row" spacing={2}>
            <Avatar {...this.stringAvatar(currentUser.name)} />
          </Stack>
          <h3>{currentUser.name}</h3>
          <h4>{company.name}</h4>
          <span>{position.name} | {department.name}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(MemberHomepage);