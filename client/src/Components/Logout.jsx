import React from "react";
import {Redirect} from 'react-router-dom';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    };
  }

  componentDidMount() {
    this.props.logout();
    this.setState({ loggedIn: false }, () => {
      setTimeout(() => this.props.history.push("/"), 2000);
    });
  }

  render() {
    const splashStyle = {
      maxWidth: "300",
      fontSize: "2em",
      fontWeight: "lighter",
      margin: "4em auto",
      textAlign: "center"
    };

    return (
      <div style={splashStyle}>
        You are now logged out. Y'all come back now!
        <div style={{fontSize: '16px', marginTop: '2.5em'}}>
          <i className="fa fa-refresh fa-spin fa-3x fa-fw" style={{fontSize: '20px'}}></i>
          Redirecting...
        </div>
      </div>
    );
  }
}
