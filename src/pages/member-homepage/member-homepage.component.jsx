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
      department: '',
      selectedFile: '',
      image: 'https://fakeimg.pl/300x300/?text=Hello',
      saveImage: '',
      open: { confirm: false, deny: false },
      row_temp: {}
    }
  }

  // handleOpen = (row_temp, key) => {
  //   this.setState({ row_temp: row_temp });
  //   this.setState({ open: { [key]: true } });
  // }

  // handleClose = (key) => {
  //   this.setState({ row_temp: {} });
  //   this.setState({ open: { [key]: false } });
  //   this.props.fetchCompanies();
  // }

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

  handleUploadChange = event => {
    console.log(event.target.files);
    let uploaded = event.target.files;
    console.log(URL.createObjectURL(uploaded));
    this.setState({ image: URL.createObjectURL(uploaded), saveImage: uploaded });
  }

  handleSubmit = async () => {
    // const files = []
    // files.push(this.state.saveImage);
    httpClient.post(`${config.baseUrl}/upload_file`, {
      files: this.state.saveImage
    });
    this.setState({ saveImage: '' });
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
        {/* <Modal
          open={open.confirm && row_temp.id === row.id}
          onClose={() => this.handleClose('confirm')}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        ></Modal> */}
        
        {/* <form onSubmit={this.handleSubmit}>
          <div>
            <img src={image} className="image-thumbnail" alt="" />
          </div>
          <div className="upload-image">
            <input
              type="file"
              className="form-control"
              id="formFile"
              onChange={this.handleUploadChange}
              accept="image/*"
            />
            <button className="submit-image" type="submit">
              Upload picture
            </button>
          </div>
        </form> */}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(MemberHomepage);