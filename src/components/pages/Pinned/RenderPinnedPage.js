import React from 'react';
import './Pinned.css';
import Logo from './Logo.svg';

// import PropTypes from 'prop-types';

function RenderPinnedPage(props) {
  return (
    <div className="page">
      <img className="crLogo" src={Logo} alt="Logo" />
      <div className="crTitle">Create Trip: </div>
      <form>
        <label>
          Search:
          <input type="text" name="Search" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default RenderPinnedPage;
