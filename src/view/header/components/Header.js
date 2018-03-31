import React from 'react';
import { connect } from 'react-redux';
import '../header.css';

const Header = props => (
    <div className="title-border px-3 py-2">
      <h1>{props.screenTitle}</h1>
      {/* <div>
          <span className="glyphicon glyphicon-search">searchicon</span>
          <span className="glyphicon glyphicons-bell">notificationicon</span>
      </div> */}
    </div>
  ) 

  const mapStateToProps = state => ({
    screenTitle: state.header.headerTitle
  })

export default connect(
  mapStateToProps
)(Header);