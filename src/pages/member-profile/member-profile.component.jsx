import React from "react";
import './member-profile.styles.scss';
import httpClient from "../../httpClient";
import config from "../../config";
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import Camera from "../../components/camera/camera.component";

class MemberProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      openCam: false,
      images: [],
      picCount: 0
    }
  }

  getPicsCount = async () => {
    const response = await httpClient.get(`${config.baseUrl}/pic_count/${this.props.currentUser.id}`);
    this.setState({ 
      picCount: response.data.count
    });
    if (response.data.count >= config.trainingImageQty) {
      this.setState({ openCam: false });
    }
  }

  componentDidMount() {
    this.getPicsCount();
  }

  getPercentage = (value) => {
    const percentage = value*(100/config.trainingImageQty);
    return (percentage > 100) ? 100 : percentage;
  }

  render() {
    const { picCount, openCam } = this.state;
    return (
      <div className="member-profile">
        {
          picCount >= config.trainingImageQty ?
          <>
            <h3>You have completed uploading your pictures</h3>
            <p>You can freely pass the portal</p>
          </>
          :
          <>
            <h3>You haven't completed uploading your pictures yet</h3>
            <p>Please provide us with your face images</p>
            <Button
              sx={{my: 2, display: "block"}}
              onClick={() => this.setState({ openCam: true })}
              variant="outlined"
              color="success"
            >
              Start Capture
            </Button>
          </>
        }
        {
          openCam ?
          <>
            <Camera 
              currentUser={this.props.currentUser} 
            />
          </> : <></>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(MemberProfile);