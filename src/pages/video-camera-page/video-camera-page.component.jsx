import React from 'react';
import './video-camera-page.styles.scss';
import { connect } from 'react-redux';
import { setCurrentUser } from "../../redux/user/user.actions";

import VideoCamera from '../../components/video-camera/video-camera.component';

class VideoCameraPage extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div className='camera-page'>
        <VideoCamera companyId={currentUser.company} />
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