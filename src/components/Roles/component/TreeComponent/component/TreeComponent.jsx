import React, { Component } from 'react';
import '../style/TreeComponent.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectedCheckedValueAction } from '../action/tree-actions';

import { saveSelectedScopes,saveSelectedResources } from '../../../action/role-action';


class TreeComponent extends Component{
    constructor(props){
        super(props);
        this.modal = [];
        this.options = []; 
        this.isInitiallySelected = false;
        this.data = this.props.data;
        this.response = this.props.responseFormat;
        this.saveSelectedOptions = this.saveSelectedOptions.bind(this);
        this.prepareDataModal = this.prepareDataModal.bind(this);
        this.selectAllChildOptions = this.selectAllChildOptions.bind(this);
        this.selectParentOption = this.selectParentOption.bind(this);
        this.prepareResponse = this.prepareResponse.bind(this);        
        this.prepareList = this.prepareList.bind(this);
        this.prepareDataModal(this.data, this.props.parentLabel, this.props.childLabel, this.props.parentId, this.props.childId);
        this.prepareList(this.modal);
        this.checkPreSelection = this.checkPreSelection.bind(this);
    }
    componentDidMount(){
      if(this.props.preSelectedData){
        let allParentOptions = document.getElementsByClassName(`${this.props.responseKey}parent-option-checkbox`);
        for(let i = 0; i < allParentOptions.length; i++){
          let parent = document.getElementsByClassName(`${allParentOptions[i].getAttribute("id")}-container`);
          let child = parent[0].querySelectorAll('.child-option-checkbox');
          this.prepareResponse(child, allParentOptions[i]);
        }
      } 
    }

        prepareList(obj){
          for(let i in obj){
              let label = obj[i].label;
              let id = obj[i].id;
              this.options.push(<div className = {`${label.split(" ").join("-")}-container`}><span className = {(obj)[i].children.length === 0 ? 'hide' : 'show expander-right' } onClick = {event => this.toggleChildMenu(`${label.split(" ").join("-")}-container`, event)}></span>
              <input className={`${this.props.responseKey}parent-option-checkbox parent-option`} type="checkbox" defaultChecked = {obj[i].isInitiallySelected} id = {label.split(" ").join("-")} value={`${label}-${id}`} key = {label} 
                />
              <span onClick = {event => this.selectAllChildOptions(`${label.split(" ").join("-")}-container`, event)}>{label}</span>{(obj)[i].children.length !== 0 ? <NestedOptions labels = {obj[i].children} selectParentOption = {event => this.selectParentOption(`${label.split(" ").join("-")}-container`, event)}/> : ''}
              </div>);
          }
        };

        toggleChildMenu(item, event) {
            event.preventDefault();
            let parent = document.getElementsByClassName(item);
            let child = parent[0].querySelector('.child-option');
            if(child === null)
              {
                return;
              }
            child.style.display = (child.style.display ===  'block') ? 'none' : 'block';
      };

      selectAllChildOptions(item, event){
            event.preventDefault();
            let parent = document.getElementsByClassName(item);
            let parentOption = document.querySelector(`#${item.split("-")[0]}`);
            let child = parent[0].querySelectorAll('.child-option-checkbox');
            parentOption.checked = (parentOption.checked) ? false : true;
            for(let i = 0; i < child.length ; i++){
                child[i].checked = (parentOption.checked);   
            }
            if(parent[0].querySelector('.child-option') !==null){
              parent[0].querySelector('.child-option').style.display = (parentOption.checked) ?  'block' : 'none';
              // if(parent[0].querySelector('.child-option').style.display === 'none'){
              //   parent[0].querySelector('.expander-right').classList.add('expander-bottom');
              //   parent[0].querySelector('.expander-right').classList.remove('expander-right');
              // }else{
              //   parent[0].querySelector('.expander-bottom').classList.add('expander-right')
              //   parent[0].querySelector('.expander-bottom').remove('expander-bottom');
              // }
            } 
            this.prepareResponse(child, parentOption);
      }

      // toggleArrowIcon(){

      // }

      prepareResponse(child, parentOption){
        let doesRecordExist = true;
        let currentStore = null;
        let parentKey = this.props.parentId;
        let childKey = this.props.childId;
        let parentLabel = this.props.parentLabel;
        let childLabel = this.props.childLabel;
        let responseKey = this.props.responseKey;
        for(let i = 0; i < this.response[responseKey].length ; i++){
          if(this.response[responseKey][i][parentKey] === parseInt(parentOption.value.split("-")[1])){
            if(!parentOption.checked){
              this.response[responseKey].splice(i,1);
              console.log(this.response);
              this.saveSelectedOptions();
              return;
            } 
            else{
              doesRecordExist = true;
              currentStore = this.response[responseKey][i];
              currentStore.children.splice(0, currentStore.children.length);
              for(let i = 0; i < child.length; i++){

                (child[i].checked)
                ? currentStore.children.push({[childKey] : parseInt(child[i].value.split("-")[1]), [childLabel] : child[i].value.split("-")[0]}) : '';
            
              }
              console.log(this.response);
              this.saveSelectedOptions();
              return;
            }
          }
          else{
            doesRecordExist = false;
          }
        }
        if(!doesRecordExist || this.response[responseKey].length === 0){
              
             if(parentOption.checked){
                 this.response[responseKey].push({ [parentKey] : parseInt(parentOption.value.split("-")[1]), [parentLabel] : parentOption.value.split("-")[0],"children":[]})
              }
              else{
                return;
              } ;
        }
        currentStore = this.response[responseKey][this.response[responseKey].length - 1];
        currentStore.children.splice(0, currentStore.children.length);
        for(let i = 0; i < child.length; i++){

          (child[i].checked)
           ? currentStore.children.push({[childKey] : parseInt(child[i].value.split("-")[1]), [childLabel] : child[i].value.split("-")[0]}) : '';
       
        }
        console.log(this.response);
        this.saveSelectedOptions();
      }

      saveSelectedOptions(){
        this.props.saveSelectedScopes(this.response.store);
        this.props.saveSelectedResources(this.response.privilege);
        this.props.selectedCheckedValueAction(this.response);
      }

      selectParentOption(item, event){
            event.preventDefault();
            let parent = document.getElementsByClassName(item);
            let parentOption = document.querySelector(`#${item.split("-")[0]}`);
            var child = parent[0].querySelectorAll('.child-option-checkbox');
            for(let i = 0; i < child.length ; i++){
               if(child[i].checked){
                  parentOption.checked = true;
                  break;
               }else{
                  parentOption.checked = false;
               }
               
            }
            this.prepareResponse(child, parentOption);
      }

    prepareDataModal(data, keyName, nestedKeyName, parentId, childId){
            for(let val in data){
                this.isInitiallySelected = false;
                if(keyName !== null && data[val].children.length === 0){
                  this.props.preSelectedData && this.checkPreSelection(data[val][parentId],parentId, this.props.preSelectedData);
                  this.modal.push({"label" : data[val][keyName], "id" : data[val][parentId], "isInitiallySelected" : this.isInitiallySelected});
                  this.modal[this.modal.length - 1]["children"] = [];
                }
                else if(data[val].children && data[val].children.length > 0){ 
                  this.props.preSelectedData && this.checkPreSelection(data[val][parentId],parentId, this.props.preSelectedData);
                  this.modal.push({"label" : data[val][keyName], "id" : data[val][parentId], "isInitiallySelected" : this.isInitiallySelected});
                  this.modal[this.modal.length - 1]["children"] = [];
                  this.prepareDataModal(data[val].children, null , nestedKeyName, parentId, childId);
                }
                else{
                  this.props.preSelectedData && this.checkPreSelection(data[val][childId],childId, this.props.preSelectedData);
                  this.modal[this.modal.length - 1]["children"].push({"label" : data[val][nestedKeyName], "id" : data[val][childId], "isInitiallySelected" : this.isInitiallySelected});
                }
            }
    }

    checkPreSelection(currentId, currentIdKeyName, initialSelection){
        for(let val in initialSelection){
            if(initialSelection[val][currentIdKeyName] === currentId){
              this.isInitiallySelected = true;
              return;
            }
            else if((typeof initialSelection[val].children !== "undefined" && initialSelection[val].children.length > 0))
            {
              this.checkPreSelection(currentId, currentIdKeyName, initialSelection[val].children)
            } 
        }
    }

    render(){
        return (
          <div>
                   {this.options}
            </div>
            
        )
    }
    
}

class NestedOptions extends Component{
  constructor(props){
    super(props);
    this.childOptions = [];
    this.checkChildOption = this.checkChildOption.bind(this);
  }

  checkChildOption(item, event){
    let option = document.querySelector(`#${item}`);
    option.checked = (option.checked) ? false : true;
    this.props.selectParentOption(event);
  }

  renderChildMenu(obj){
    for(let i in obj){
      let label = obj[i].label;
      let id = obj[i].id;
      this.childOptions.push(
      <div>
        <input className = "child-option-checkbox" type="checkbox" defaultChecked = {obj[i].isInitiallySelected}  id = {label.split(" ").join("-")} value={`${label}-${id}`} key = {label}/>
        <span onClick = {event => this.checkChildOption(label.split(" ").join("-"), event)}>{label}</span>
    </div>
    );
    }
  }
  render(){
    this.childOptions = [];
    this.renderChildMenu(this.props.labels);
    return(
      <div className = "child-option hide">
        {this.childOptions}
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      selectedCheckedValueAction,
      saveSelectedScopes,
      saveSelectedResources
}, dispatch)
}


TreeComponent = connect(null, mapDispatchToProps)(TreeComponent);


export default TreeComponent;