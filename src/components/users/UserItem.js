import React from 'react';
import PropTypes from 'prop-types'; 

// function UserItem(props){ -->old way
// const UserItem = props => {
const UserItem = ({user: {login, avatar_url, html_url}}) => {
    //const {login, avatar_url, html_url} = props.user; // destructor -> pull stuff out of obj
  return (
    <div className="card text-center">
    <img src={avatar_url} alt="" className="round-img"
    style={{width: '60px'}} />
    <h3>{login}</h3>
    <div>
    <a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
    </div>
    </div>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired, // ptor + tab
}

  export default UserItem