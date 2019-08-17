import React, { Component } from "react";
import "./App.scss";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import withPromise from "./helpers/withPromise";
import Spinner from "./components/Spinner/Spinner.jsx";
import Home from "./containers/Home/Home.jsx";
import Auth from "./containers/Auth/Auth.jsx";
import Admin from "./containers/Admin/Admin.jsx";
import Up from "./components/buttons/Up";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faMapMarkerAlt, faPhone, faEnvelope, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faSignInAlt,
  faSignOutAlt,
  faAngleUp,
  faAngleLeft,
  faDownload,
  faExternalLinkAlt,
  faTag,
  faUserCircle,
  faTrashAlt,
  faPlus,
  faMinus,
  faCaretUp,
  faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
// library.add(faMapMarkerAlt, faPhone, faEnvelope, faCheck, faGithub, faLinkedin);
library.add(
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faGithub,
  faLinkedin,
  faSignInAlt,
  faSignOutAlt,
  faAngleUp,
  faAngleLeft,
  faDownload,
  faExternalLinkAlt,
  faTag,
  faUserCircle,
  faTrashAlt,
  faPlus,
  faMinus,
  faCaretUp,
  faCaretDown
);

class App extends Component {
  state = {
    isShown: false
  };

  async componentDidMount() {
    await this.props.getUser();
    this.setState({
      isShown: true
    });
  }

  render() {
    const { isShown } = this.state;
    const { token } = this.props;
    return (
      <div className="App">
        {isShown ? (
          <>
            <Switch>
              <Route path="/" exact component={Home} />
              {/* <Route path="/auth" exact render={() => (!token ? <Auth /> : <Redirect to="/" />)} /> */}
        <Route path="/auth" exact render={() => <Auth />} /> 
              
              {/* <Route path="/admin" render={() => (token ? <Admin /> : <Redirect to="/auth" />)} /> */}
              
              <Route path="/admin" render={() =>  <Admin /> } />
              
              <Redirect to="/" />
            </Switch>
            <Up />
          </>
        ) : (
          <Spinner style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  getUser: () => withPromise(dispatch, actions.getUser)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
