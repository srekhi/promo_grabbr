import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';


class GoogleAuth extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const responseGoogle = (response) => {
            console.log(response);
            if (response.code) {
                this.props.googleLogin(response.code);
            }
        }

        return (
            <GoogleLogin
                clientId={this.props.clientId}
                buttonText='Login'
                responseType='code'
                scope={this.props.scopes}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        );
    }
}

GoogleAuth.propTypes = {
    clientId: PropTypes.string,
    scopes: PropTypes.string,
};

export default withRouter(GoogleAuth);
