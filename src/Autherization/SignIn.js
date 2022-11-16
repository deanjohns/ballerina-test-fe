import '../App.css';
import Auth from '../auth';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";

const SignIn = ({ history }) => {

    const { state, signIn } = useAuthContext();

    useEffect(() => {

        if (state.isAuthenticated) {
            localStorage.setItem("state", JSON.stringify(state));
            Auth.login(() => {
                history.push("/app")
            });
        }
    });

    return (
        <div className="signin-main">
            <div className="signin-button-main">
                <button className="signin-button" onClick={() => signIn()}>Sign In</button>
            </div>
        </div>
    )
}

export default withRouter(SignIn);