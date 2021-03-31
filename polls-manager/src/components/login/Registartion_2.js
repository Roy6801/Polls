<div>
<form onSubmit={this.handleSubmit}>
          {/* <div class="text-center mt-2" align="center" style={{marginLeft:"50px"}}><br></br>
              <h4>Enter your details:</h4>
              </div> */}
          <br />
          <br />
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.userNameError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            <label>
              <b>
                User Name : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
              </b>{" "}
            </label>
            <input
              style={{ borderRadius: "90px" }}
              type="text"
              className="form-control"
              id="userName"
              placeholder="Enter User Name"
              value={this.state.userName}
              onChange={(event) =>
                this.setState({ userName: event.target.value })
              }
            />
          </div>
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.firstNameError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            <label>
              <b>
                First Name : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
              </b>{" "}
            </label>
            <input
              style={{ borderRadius: "90px" }}
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter First Name"
              value={this.state.firstName}
              onChange={(event) =>
                this.setState({ firstName: event.target.value })
              }
            />
          </div>
          <br />
          {/* <div className="alert-danger"style={{marginLeft:"550px",marginRight:"600px"}}>{this.state.lastNameError}</div> */}
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            {/* <div className="alert-danger">{this.state.lastNameError}</div><br/><br/> */}
            <label>
              <b>
                Last Name : &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                &nbsp;
              </b>
            </label>
            <input
              style={{ borderRadius: "60px" }}
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter Last Name"
              value={this.state.lastName}
              onChange={(event) =>
                this.setState({ lastName: event.target.value })
              }
            />
          </div>
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.passwordError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            {/* <div className="alert-danger">{this.state.passwordError}</div><br/><br/> */}
            <label>
              <b>
                Password : &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </b>{" "}
            </label>
            <input
              style={{ borderRadius: "60px" }}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your Password"
              value={this.state.password}
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </div>
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.confirmPasswordError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            {/* <div className="alert-danger">{this.state.confirmPasswordError}</div><br/><br/> */}
            <label>
              <b> Confirm Password : &nbsp; </b>{" "}
            </label>
            <input
              style={{ borderRadius: "40px" }}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your Password"
              value={this.state.confirmPassword}
              onChange={(event) =>
                this.setState({ confirmPassword: event.target.value })
              }
            />
          </div>
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.emailError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            {/* <div className="alert-danger">{this.state.emailError}</div> */}
            <label>
              <b>
                Email : &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </b>
            </label>
            <input
              style={{ borderRadius: "60px" }}
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your Email Id"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </div>
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.mobileNoError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            {/* <div className="alert-danger">{this.state.mobileNoError}</div><br/><br/> */}
            <label>
              <b>
                Mobile No : &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
              </b>{" "}
            </label>
            <input
              style={{ borderRadius: "60px" }}
              type="text"
              className="form-control"
              id="mobileNo"
              placeholder="Enter your mobile No"
              value={this.state.mobileNo}
              onChange={(event) =>
                this.setState({ mobileNo: event.target.value })
              }
            />
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginLeft: "560px" }}
          >
            <b>Save</b>
          </button>
        </form>
      </div>