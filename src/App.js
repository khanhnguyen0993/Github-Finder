import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import './App.css';

class App extends Component{
  state = {
    users: [],
    loading: false
  }

  // Life Cycle Method
  async componentDidMount(){
    // this.state.loading = true;  This is not the way we do in React
    this.setState({loading: true});

    // Load data from api when the app loads.
    const res = await axios
      .get('https://api.github.com/users');

    this.setState({users: res.data, loading: false});
  }

  render() {

    return (
      <div className="App">
        <Navbar title=" Github Finder" icon="fa fa-github"/>
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users}/>
        </div>
      </div>
    
      /// return Reach.createElement('div, {className: 'App'},
      // React.createElement('h1', null, 'Hello from React'))
      // showName ? name : null == showName && name   : only show the name if showName is true
      // {loading ? <h4>Loading ... </h4> : <h1>Hello {showName && name.toUpperCase()}</h1>}
    );
  }
}

export default App;
