import './index.css';
import Auth from './auth';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './Pages/Dashboard';
import SignIn from './Autherization/SignIn';
import reportWebVitals from './reportWebVitals';
import AppProvider from './Autherization/AppProvider';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (Auth.isAuthenticated()) {
        const state = localStorage.getItem("state");
        if (state) {
          return <Component {...props} />;
        }
        return <Redirect to={{ pathname: `/` }} />;
      } else {
        return <Redirect to={{ pathname: `/` }} />;
      }
    }}
  />
);

const NoneAuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (Auth.isAuthenticated()) {
        return <Redirect to={{ pathname: `/app` }} />;
      }
      return <Component {...props} />;
    }}
  />
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Switch>
        <NoneAuthRoute exact path="/" component={SignIn} />
        <AuthRoute exact path="/app" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
