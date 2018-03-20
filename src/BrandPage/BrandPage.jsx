import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class BrandPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <p>Hi {user.firstName}!</p>
                <p>Manage Brand</p>
                <table>
                    <thead>
                        <tr>
                            <th>Brand Id</th>
                            <th>Brand Name</th>
                            <th>Brand Name Arabic</th>
                            <th>Date Added</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <th>Reebook</th>
                            <th>kladsf</th>
                            <th>2018-03-19 04:30:00 AM</th>
                            <th>Active</th>
                            <th>Edit</th>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <Link to="/login">Logout</Link>
                    <Link to="/">Home</Link>
                    <Link to="/brand">Brand</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedBrandPage = connect(mapStateToProps)(BrandPage);
export { connectedBrandPage as BrandPage };