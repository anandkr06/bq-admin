import React, { Component } from 'react';
import { connect } from 'react-redux';

class Alert extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('alert', this.props);
        let alertSpan = <span id="noAlert"></span>;
        if (this.props.alertConfigData && this.props.showAlert) {
            if (this.props.alertConfigData.messageType === 'Success') {
                alertSpan = <div style={{'opacity': 1 }} className="alert alert-success ">
                    <strong>Success!</strong> {this.props.alertConfigData.content}
                </div>
            } else if (this.props.alertConfigData.messageType === 'Error') {
                alertSpan = <div style={{'opacity': 1 }} className="alert alert-danger ">
                    <strong>Error!</strong> {this.props.alertConfigData.content}
                </div>
            }
        }
        return (
            alertSpan
        );
    }
}

const mapStateToProps = state => ({
    showAlert: state.alertState.isAlertVisible,
    alertConfigData: state.alertState.alertData
});

export default connect(
    mapStateToProps,
    null
)(Alert);
