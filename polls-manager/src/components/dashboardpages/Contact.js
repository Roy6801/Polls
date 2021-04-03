import React, { Component } from "react";
import "../stylesheets/MyStyle.css";

export class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgId: "",
      idErr: "",
    };
  }
  OnSubmit = (event) => {
    event.preventDefault();
    alert("Thank you for your respone we will get back to you shortly!!!! ");
  };

  render() {
    return (
      <div
        style={{
          backgroundImage: `url("https://wallpaperaccess.com/full/3124511.jpg")`,
        }}
      >
        <form>
          <div>
            <p>
              <h2>Contact Us...</h2>
              <br></br>
              <h4>Do you have any questions?</h4> <br></br>
              <h5>
                <i>
                  Please do not hesitate to contact us directly. Our team will
                  come back to you within an hours to help you.
                </i>
              </h5>{" "}
              <br></br>
              <div class="col-md-6">
                <div class="md-form mb-0">
                  <label> Name:</label>
                  <input type="text" class="form-control" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="md-form mb-0">
                  <label for="email" class="">
                    {" "}
                    Email:
                  </label>
                  <input type="Email" class="form-control" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="md-form mb-0">
                  <label for="subject"> Subject:</label>
                  <textarea class="form-control"></textarea>
                </div>
              </div>
              <div align="left">
                <br></br>
                <a class="btn btn-primary" onClick={this.OnSubmit}>
                  Send
                </a>
              </div>
              <div class="status"></div>
              <div>
                <ul class="list-unstyled mb-1">
                  <li>
                    <h4>Address: Pillai College Of Engineering </h4>
                    <h6> New Panvel</h6>
                    <h6>Contact Number:8767635949</h6>
                    <h6>Email:Group22@gmail.com</h6>
                  </li>
                </ul>
              </div>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Contact;
