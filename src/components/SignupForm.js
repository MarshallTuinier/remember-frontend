import React, { Component } from "react";
import { navigate } from "gatsby";
import { registerUser, loginUser } from "../utils/auth";
import GetUserInfo from "./GetUserInfo";
import GetUserType from "./GetUserType";
import PoseTransition from "../utils/PoseTransition";

export default class SignupForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    zip: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  };

  handleFirstNameChange = event => {
    this.setState({
      firstName: event.target.value,
    });
  };

  handleLastNameChange = event => {
    this.setState({
      lastName: event.target.value,
    });
  };

  handleZipChange = event => {
    this.setState({
      zip: event.target.value,
    });
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value,
    });
  };

  handleConfirmPasswordChange = event => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  handleUserTypeChange = type => {
    this.setState({
      userType: type,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const user = await registerUser(this.state);
    if (user) {
      loginUser(this.state);
      setTimeout(() => {
        navigate("/app/dashboard");
      }, 1000);
    } else {
      navigate("/error");
    }
  };

  render() {
    return (
      <div className="inner">
        {!this.state.userType && (
          <PoseTransition>
            <GetUserType handleUserTypeChange={this.handleUserTypeChange} />
          </PoseTransition>
        )}
        {this.state.userType === "dying" && (
          <PoseTransition>
            <h2 className="center">
              We understand this is a difficult time for you. Please enter some
              information about yourself so we can better assist you.
            </h2>
          </PoseTransition>
        )}
        {this.state.userType === "bereived" && (
          <PoseTransition>
            <h2 className="center">
              We are so sorry for your loss. Please enter some information about
              yourself so we can better assist you.
            </h2>
          </PoseTransition>
        )}
        {this.state.userType && (
          <PoseTransition>
            <GetUserInfo
              handleFirstNameChange={this.handleFirstNameChange}
              handleLastNameChange={this.handleLastNameChange}
              handleZipChange={this.handleZipChange}
              handlePasswordChange={this.handlePasswordChange}
              handleConfirmPasswordChange={this.handleConfirmPasswordChange}
              handleSubmit={this.handleSubmit}
              handleEmailChange={this.handleEmailChange}
              {...this.state}
            />
          </PoseTransition>
        )}
      </div>
    );
  }
}
