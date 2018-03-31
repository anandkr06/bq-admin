import React, { Component } from 'react';

import Alert from '../../../utilities/alert/Alert';
import Loader from '../../../utilities/loader/Loader';
// import { connect } from 'react-redux';

export default () => (<div><Alert /> <Loader /> <h1></h1> </div>);


// const mapStateToProps = state => ({
//     menuList : state.userLoginInfo.navigationMenu
// })

// export default connect(mapStateToProps)(Menu);