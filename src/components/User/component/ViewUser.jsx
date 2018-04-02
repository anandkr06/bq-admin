import React, { Component } from 'react';
import { reduxForm, Field} from 'redux-form';
import axios from 'axios';
import { viewAllUsersAction } from '../../../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {DropdownList} from 'react-widgets';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';

//import form utilities
import Alert from '../../../utilities/alert/Alert';
import Loader from '../../../utilities/loader/Loader';

class ViewUser extends Component{
    constructor(props){
        super(props);
        props.viewAllUsersAction();
        this.refactorDataModal = this.refactorDataModal.bind(this);
    }

    refactorDataModal(){
        for(let i=0 ; i < this.props.allUserList.length ; i++){
            this.props.allUserList[i].status = (this.props.allUserList[i].status) ? "Active" : "Inactive";
        }
    }

    render(){
        (typeof this.props.allUserList !== "undefined") ? this.refactorDataModal() : '';
        return(
            <div>
            <Alert/>
            <ReactTable
                data={this.props.allUserList}
                columns={this.props.columns}
                getTrProps={(state, rowInfo, column, instance) => {
                    return {
                    onClick: e =>
                        {
                            this.props.url.history.push({
                            pathname: '/home/system/UserInfo',
                            state: {
                                data : rowInfo.original
                            }
                        })
                        
                        }
                    };
                }}
                defaultPageSize = {10}
                className="-striped -highlight"
                noDataText="No Record Found!"
                showPaginationTop
                filterable
                defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
                
            />
            <Loader/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        viewAllUsersAction
}, dispatch)
}

const mapStateToProps = (state) => {
  return {
        allUserList : state.allUserList.allUserList,
        columns : state.viewUserColumns.viewUserColumns
  };
}

ViewUser = connect(mapStateToProps, mapDispatchToProps)(ViewUser);


export default ViewUser;