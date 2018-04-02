import React from 'react';
import render from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import './NavigationMenu.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Events } from '../../../redux/actions';

class NavigationMenu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            optionSelected: Object.values(this.props.options)[0]
        };   
        this.options = []; 
        this.hasChild = false; 
    }
  
    componentWillMount(){
        // this.findObjectByLabel(this.props.menuOptions);
    }

    // findObjectByLabel (obj) { 
    //   let repeat = false;
    //   for(let i in obj){
    //     if(typeof (obj)[i] === 'string'){
    //      let heading = obj[i];
    //      this.options.push(<div className={`menu-container ${this.state.optionSelected === heading ? 'active-option' : ''} ${ (this.hasChild) ? 'show-child' : ''}`} key={heading} onClick = {event => this.toggleClass(heading, event)}>
    //      <span className = "options-name">{heading}</span>
    //      </div>);
         
    //     }
    //     else if(typeof (obj)[i] === 'object') {
    //       let heading = Object.keys(obj[i]).toString();
    //       this.options.push(<div className={`menu-container has-child-options ${this.state.optionSelected === heading ? 'active-option' : ''}`} key={heading} onClick = {event => this.toggleClass(heading, event, true)}>
    //       <span className = "options-name">{heading}</span>
    //       </div>);
    //     //this.options[Object.keys(obj[i]).toString()] = Object.keys(obj[i]).toString().concat("-hassubmenu");
    //       obj = Object.values(obj[i])[0];
    //       repeat = true;
    //       this.hasChild = true;
    //       break;
    //     }
    //     else{
    //       console.log("Wrong data modal!!!");
    //     }
    //   }
    //   (repeat) && this.findObjectByLabel(obj);
    // }

    // toggleClass(item, event, isParent) {
    //     event.preventDefault();
    //     this.setState({ optionSelected: item });
    //     let cols = document.getElementsByClassName('show-child');
    //     if(isParent){
    //       for(let i=0; i<cols.length; i++) {
    //         cols[i].style.display = (cols[i].style.display ===  'block') ? 'none' : 'block';
    //       }
    //     } 
    //     // else{
    //     //   for(let i=0; i<cols.length; i++) {
    //     //     cols[i].style.display =  'none';
    //     //   }
    //     // }
    // };
  
    render() {
      this.options.splice(0, this.options.length);
      this.hasChild = false;
      this.findObjectByLabel(this.props.options);
      // const items = Object.keys(options).map((item, i) => (
      //   (typeof options[item] === 'string') ? 
      //   <div className={`menu-container ${this.state.optionSelected === options[item] ? 'active-option' : ''}`} key={options[item]} onClick = {event => this.toggleClass(options[item], event)}>
      //     <span className = "options-name">{options[item].toString()}</span>
      //   </div> : (<div className={`menu-container ${this.state.optionSelected === Object.keys(options[item]).toString() ? 'active-option' : ''}`} key={Object.keys(options[item]).toString()} onClick = {event => this.toggleClass(Object.keys(options[item]).toString(), event)}>
      //     <span className = "options-name">{Object.keys(options[item]).toString()}</span>
      //   </div>, options = Object.values(options[item])[0] )
      // ));
  
      return (
        <div className = "nav-menu-container">
          {this.options}
          {/* <CSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {items}
          </CSSTransitionGroup> */}
        </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
      options: state.options
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserOption: Events.CREATE_USER_NAVIGATION_MENU }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);