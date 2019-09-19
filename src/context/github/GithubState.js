import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
  CLEAR_USERS,
  FETCH_USERS
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Fetch Users
  const fetchUsers = async () => {
    setLoading();
    const res = await axios
    .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    dispatch({
      type: FETCH_USERS,
      payload: res.data
    });
  };

  // Search User: text comes from Search.js with props
  const searchUsers = async text => {
    setLoading();
    const res = await axios
      .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    dispatch({ 
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }

  // Get single Github user
  const getUser = async username => {
    setLoading();
    const res = await axios
      .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  }

  // Get users repos
  const getUserRepos = async username => {
    setLoading();
    const res = await axios
      .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  }

  // Clear users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS});

  // {
  //   setUsers([]);
  //   setLoading(false);
  // }

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING});

  return <GithubContext.Provider 
    value = {{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,

      searchUsers,
      clearUsers,
      getUser,
      getUserRepos,
      fetchUsers
    }}
  >
  {props.children}
  </GithubContext.Provider>

}

export default GithubState;