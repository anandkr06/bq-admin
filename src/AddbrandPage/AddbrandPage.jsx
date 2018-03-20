import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { brandActions, userActions } from '../actions';

class AddbrandPage extends React.Component {
   
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            brandname: '',
            description: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { brandname, description } = this.state;
        const { dispatch } = this.props;
        if (brandname && description) {
            dispatch(brandActions.addbrand(brandname, description));
        }
    }
    componentDidMount() {
       let abc =  this.props.dispatch(brandActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(brandActions.deletebrand(id));
    }

    render() {
        const { loggingIn } = this.props;
        const { brandname, description, submitted } = this.state;
        //const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                
                <h2>Add new brand</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !brandname ? ' has-error' : '')}>
                        <label htmlFor="brandname">Brand name</label>
                        <input type="text" className="form-control" name="brandname" value={brandname} onChange={this.handleChange} />
                        {submitted && !brandname &&
                            <div className="help-block">brandname is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !description ? ' has-error' : '')}>
                        <label htmlFor="description">description</label>
                        <input type="text" className="form-control" name="description" value={description} onChange={this.handleChange} />
                        {submitted && !description &&
                            <div className="help-block">description is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Submit</button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
                <p>
                    <Link to="/login">Logout</Link>
                    <Link to="/addbrand">Add brand</Link>
                    <Link to="/brand">Brand</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { brands, authentication } = state;
    const { brand } = authentication;
    return {
        brand,
        brands
    };
}

const connectedAddbrandPage = connect(mapStateToProps)(AddbrandPage);
export { connectedAddbrandPage as AddbrandPage };