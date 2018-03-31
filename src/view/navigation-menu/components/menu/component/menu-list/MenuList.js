import React, { Component } from 'react';
import {withRouter, Switch, Route, Link } from 'react-router-dom';
import './menu-list.css';

class PreviledgeMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.data = props.menuList;
        this.prepareList = this.prepareList.bind(this);
        this.options = []; 
    }

        prepareList(obj){
          for(let i in obj){
              let heading = obj[i].privilNme;
              this.options.push(<li className="nav-item has-child-options" key={obj[i].privilId} onClick = {event => this.toggleChildMenu(heading, event)}>
              <Link to = {`${this.props.url}${obj[i].refUrl}`} className = "nav-link menu-text">{heading} </Link> {(obj)[i].children.length !== 0 ? <NestedList rooturl = {this.props.url} list = {obj[i].children} heading = {(obj)[i].privilNme} subheading = {(obj)[i].sub_heading}/> : ''}
              </li>);
          }
        };

        toggleChildMenu(item, event) {
          event.preventDefault();
          let allChilds = document.getElementsByClassName("hide-child-option");
          for (let i = 0; i < allChilds.length ; i++){
            allChilds[i].style.display = 'none';
          }
          let cols = document.getElementsByClassName(item);
          if(cols.length > 0){
            cols[0].style.display = (cols[0].style.display ===  'block') ? 'none' : 'block';
          }
      };

    render(){
        this.options.splice(0, this.options.length);
        this.prepareList(this.data);
        return (            
                <ul className = "nav flex-column">
                    {this.options}
                </ul>
        )
    }
    
}

class NestedList extends Component{
  constructor(props){
    super(props);
    this.count = 0;
    this.childOptions = [];
    this.hideChildMenu = this.hideChildMenu.bind(this);
  }

  hideChildMenu(item, event) {
    event.stopPropagation();
    let allChilds = document.getElementsByClassName(item);
    for (let i = 0; i < allChilds.length ; i++){
      allChilds[i].style.display = 'none';
    }
  };

  renderChildMenu(obj){
    for(let i in obj){
      let heading = obj[i].privilNme;
      this.childOptions.push(<li className="menu-container has-child-options" onClick = {event => this.hideChildMenu(this.props.heading, event)}  key={obj[i].privilId}>
      <Link to = {`${this.props.rooturl}${obj[i].refUrl}`} className = "menu-text" >{heading}</Link>
      </li>);
    }
  }
  render(){
    this.childOptions = [];
    this.renderChildMenu(this.props.list);
    return(
      <div className = {`hide-child-option col-2 pt-3 ${this.props.heading}`}>
        <h3>{this.props.heading}<span>x</span></h3>
        <p>{this.props.subheading}</p>
        <ul className="has-child">{this.childOptions}</ul>
      </div>
    )
  }
}

export default PreviledgeMenu;
