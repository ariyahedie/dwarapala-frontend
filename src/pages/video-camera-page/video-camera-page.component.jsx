import React from 'react';
import './video-camera-page.styles.scss';
import { connect } from 'react-redux';
import { setCurrentUser } from "../../redux/user/user.actions";
// import httpClient from '../../httpClient';
// import config from '../../config';

import VideoCamera from '../../components/video-camera/video-camera.component';

class VideoCameraPage extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     company: {}
  //   }
  // }

  // getCompany = async () => {
  //   const { currentUser } = this.props;
  //   try {
  //     const response = await httpClient.get(`${config.baseUrl}/company/${currentUser.company}`);
  //     this.setState({ company: response.data.company });
  //   } catch(error) {
  //     console.error(error);
  //   }
  // }

  // componentDidMount() {
  //   this.getCompany();
  // }
  
  render() {
    const { currentUser } = this.props;
    return (
      <div className='camera-page'>
        <VideoCamera companyId={currentUser.company} mode='video_feed' />
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoCameraPage);