import React from 'react';
import PropTypes from 'prop-types'; // impt + tab

// const Navbar = ({props}) => {
const Navbar = ({icon, title}) => {
  return (
    <nav className="navbar bg-success">
      <h1>
        <i className={icon} />
        {title}
      </h1>
    </nav>
  );
}

Navbar.defaultProps = {
  title: ' Gibhub Finder',
  icon: 'fa fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar