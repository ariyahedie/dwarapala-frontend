import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import httpClient from './httpClient';
import config from './config';

import Homepage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignUpPage from './pages/sign-up-page/sign-up-page.component';
import LoginPage from './pages/login-page/login-page.component';
import NotFound from './pages/not-found/not-found.component';

import './App.css';

class App extends React.Component {
  getCurrentUser = async () => {
    const { setCurrentUser } = this.props;
    try {
      const response = await httpClient.get(`${config.baseUrl}/@me`);
      setCurrentUser(response.data);
    } catch(error) {
      console.log('Not Authenticated');
    }
  }
  
  currentUserExists = (comp) => {
    const { currentUser } = this.props;
    return currentUser ? (<div>{comp}</div>) : (<Redirect to='/login' />)
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header/>
        <Switch>
          <Route 
            exact path='/' 
            render={() => 
              this.currentUserExists(<Homepage />)
            }
          />
          <Route
            exact path='/signup'
            render={() =>
              currentUser ?
              (<Redirect to='/' />) :
              (<SignUpPage />)
            }
          />
          <Route
            exact path='/login'
            render={() =>
              currentUser ?
              (<Redirect to='/' />) :
              ( <LoginPage />)
            }
          />
          <Route component={NotFound} />
        </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
