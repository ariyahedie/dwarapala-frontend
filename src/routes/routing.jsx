import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.actions';
import httpClient from '../httpClient';
import config from '../config';

import Homepage from '../pages/homepage/homepage.component';
import Header from '../components/header/header.component';
import SignUpPage from '../pages/sign-up-page/sign-up-page.component';
import LoginPage from '../pages/login-page/login-page.component';
import NotFound from '../pages/not-found/not-found.component';
import ProfilePage from '../pages/profile-page/profile-page.component';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import VideoCameraPage from '../pages/video-camera-page/video-camera-page.component';

class Routing extends React.Component {
  getCurrentUser = async () => {
    const { setCurrentUser } = this.props;
    try {
      const response = await httpClient.get(`${config.baseUrl}/@me`);
      setCurrentUser(response.data);
    } catch(error) {
      console.log('Not Authenticated');
    }
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={
            <ProtectedRoutes isAuth={currentUser}>
              <Homepage />
            </ProtectedRoutes>
          }/>
          <Route path='/profile' element={
            <ProtectedRoutes isAuth={currentUser}>
              <ProfilePage />
            </ProtectedRoutes>
          }/>
          <Route path='/camera' element={
            <ProtectedRoutes isAuth={currentUser}>
              <VideoCameraPage />
            </ProtectedRoutes>
          }/>
          <Route path='/login' element={
            <PublicRoutes isAuth={currentUser}>
              <LoginPage />
            </PublicRoutes>
          }/>
          <Route path='/signup' element={
            <PublicRoutes isAuth={currentUser}>
              <SignUpPage />
            </PublicRoutes>
          }/>
          <Route component={NotFound} />
        </Routes>
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

export default connect(mapStateToProps, mapDispatchToProps)(Routing);