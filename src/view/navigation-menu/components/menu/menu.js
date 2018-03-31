import React, { Component } from 'react';
import { connect } from 'react-redux';

//helper components
import MenuList from './component/menu-list/MenuList';

const Menu = props => {
    return (
        <div className="sidebar-sticky">
           <MenuList url={props.url} menuList={props.menuList} />
        </div>
    )
}

const mapStateToProps = state => ({
    menuList : state.userLoginInfo.navigationMenu
});

export default connect(mapStateToProps)(Menu);