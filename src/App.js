import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component{
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // Life Cycle Method
  async componentDidMount(){
    // this.state.loading = true;  This is not the way we do in React
    this.setState({loading: true});

    // Load data from api when the app loads.
    const res = await axios
      .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data, loading: false});
  }

  // Search User: text comes from Search.js with props
  searchUsers = async text => {
    this.setState({loading: true});

    const res = await axios
      .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data.items, loading: false});
  }

  // Get single Github user
  getUser = async (username) => {
    console.log('get hereeeeeeeeeeeeee'+username);
    this.setState({loading: true});
    const res = await axios
      .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({user: res.data, loading: false});
  }

  // Clear users from state
  clearUsers = () => this.setState({users: [], loading: false});

  // Set alert
  setAlert = (msg, type) => {
    //this.setState({alert: {msg: msg, type: type}});
    this.setState({alert : {msg,type}});
    setTimeout(()=> this.setState({alert:null}), 3000);
  };


  render() {
    // destruct users & loading from this.state
    // wherever has this.state.users -> just type users
    const {users, user, loading, alert} = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar title=" Github Finder" icon="fa fa-github"/>
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                 <Fragment>
                   <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={users.length > 0 ? true:false}
                    setAlert={this.setAlert}/>
                  <Users 
                    loading={loading} 
                    users={users} />
                 </Fragment>
              )} 
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} 
                  getUser={this.getUser} 
                  user={user} 
                  loading={loading}/>
                 )
            }/> 
            </Switch>
          </div>
        </div>
      </Router>
    
    );
  }
}

export default App;