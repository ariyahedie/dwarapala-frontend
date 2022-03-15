import { useEffect, useState } from 'react';
import axios from "axios";
import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';

import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignUpAndSignIn from './pages/sign-up-and-sign-in/sign-up-and-sign-in.component';

import './App.css';

function App() {
  // const [description, setDescription] = useState('');
  // const [editDescription, setEditDescription] = useState('');
  // const [eventsList, setEventsList] = useState([]);
  // const [eventId, setEventId] = useState(null);

  // const fetchEvents = async () => {
  //   const data = await axios.get(`${baseUrl}/event`);
  //   const { events } = data.data
  //   setEventsList(events);
  //   console.log('DATA: ', data);
  // }

  // const handleChange = (event, field) => {
  //   if (field === 'edit') {
  //     setEditDescription(event.target.value);
  //   }
  //   else {
  //     setDescription(event.target.value);
  //   }
  // };

  // const handleDelete = async id => {
  //   try {
  //     await axios.delete(`${baseUrl}/event/${id}`);
  //     const updatedList = eventsList.filter(event => event.id !== id)
  //     setEventsList(updatedList);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // const toggleEdit = event => {
  //   setEventId(event.id);
  //   setEditDescription(event.description);
  // };

  // const handleSubmit = async event => {
  //   event.preventDefault();
  //   try {
  //     if (editDescription) {
  //       const data = await axios.put(`${baseUrl}/event/${eventId}`, {description: editDescription});
  //       const updatedEvent = data.data.event;
  //       const updatedList = eventsList.map(event => {
  //         if (event.id === eventId) {
  //           return event = updatedEvent;
  //         }
  //         return event;
  //       });
  //       setEventsList(updatedList);
  //     } else {
  //       const data = await axios.post(`${baseUrl}/event`, {description});
  //       setEventsList([...eventsList, data.data]);
  //     }
  //     setDescription('');
  //     setEditDescription('');
  //     setEventId(null);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchEvents();
  // }, [])

  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signup' component={SignUpAndSignIn} />
        {/* <Route path='/shop' component={HatsPage} /> */}
        {/* <Route
          exact
          path='/signIn'
          render={() =>
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
            )
          }
        /> */}
      </Switch>
    </div>
  );
}

export default App;
