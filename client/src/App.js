import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

//Provider is a react component which holds our state
//It holds all of our data and wraps around everything
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import AddProducts from "./components/add-products/AddProducts";

import "./App.css";

//Check for token
if (localStorage.jwtToken) {
  // Set Auth token header auth
  setAuthToken(localStorage.jwtToken);

  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {

  //   //Logout User
  //   store.dispatch(logoutUser());
  //   //TODO: Clear Current Profile

  //   //Redirect to login
  //   window.location.href = "/login";
  // }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            {/* <div className="container"> */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/products" component={Dashboard} />
            <Route exact path="/products/add" component={AddProducts} />
            {/* </div> */}
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
