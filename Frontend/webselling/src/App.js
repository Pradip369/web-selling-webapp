import React, { Fragment, useEffect, useReducer, useState } from 'react'
import './App.css';
import './Components/comon.css';
import Home from './Components/Home';
import Error from './Components/Error';
import NavBar from './Components/NavBar';
import { reducer, initialState, authContext } from './ContextApi/contextManage'
import { Switch, Route } from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from './Components/Login';
import Register from './Components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { HomeRoute, SecureRoute } from './PrivateRoute';
import { auth_check } from './Components/ApiAction/SendApiRequest';
import MyProfile from './Components/MyProfile';
import ManageWeb from './Components/ManageWeb';
import WebDetail from './Components/WebDetail';

axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [verifyAuth, setVerifyAuth] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!state.auth.isAuthenticated) {
        auth_check(dispatch, setVerifyAuth)
        console.log("auth calllll")
      }
    }
    check();
    //eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      {verifyAuth
        &&
        <authContext.Provider value={{ state, dispatch }}>
          <div >
            <NavBar isAuthenticated={state.auth.isAuthenticated} />
            <ToastContainer />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/web_detail/:web_id" component={WebDetail} />
              {/* <SecureRoute auth={state.auth.isAuthenticated} path="/web_detail/:web_id" component={WebDetail} /> */}
              <HomeRoute path="/register" auth={state.auth.isAuthenticated} component={Register} />
              <HomeRoute path="/login" auth={state.auth.isAuthenticated} component={Login} />
              <SecureRoute path="/my_profile" auth={state.auth.isAuthenticated} component={MyProfile} />
              <SecureRoute path="/manage_website" auth={state.auth.isAuthenticated} component={ManageWeb} />
              <Route component={Error} />
            </Switch>
          </div>
        </authContext.Provider>
      }
    </Fragment>
  )
}

export default App;