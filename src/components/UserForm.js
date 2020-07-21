import React, { useState } from "react";
import DatePicker from "react-datepicker";
import * as educationXml from "../education";

import "react-datepicker/dist/react-datepicker.css";

class UsersForm extends React.Component {
  constructor(props) {
    super(props);

    let educationData = [];
    const xml2js = require("xml2js");
    xml2js.parseString(educationXml.EDUCATION_DATA, function (err, result) {
      result.ciselnik.veta.forEach((element) => {
        educationData.push(element.TXT[0]);
      });
    });

    this.state = {
      user: {
        name: {
          value: "",
        },
        dateOfBirth: {
          value: new Date(),
        },
        sex: {
          value: "",
        },
        education: {
          value: "",
        },
        hobbies: {
          value: "",
        },
        email: {
          value: "",
        },
      },
      users: [],
      errors: [],
      education: educationData,
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeDate(name, value) {
    this.setState({
      user: {
        ...this.state.user,
        [name]: {
          ...this.state.user[name],
          value,
        },
      },
    });
  }
  

  handleChange(event) {
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      user: {
        ...this.state.user,
        [name]: {
          ...this.state.user[name],
          value,
        },
      },
    });
  }

  handleValidation() {
    let fields = this.state.user;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"].value) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if (typeof fields["name"].value !== "undefined") {
      if (!fields["name"].value.match(/^[a-zA-ZÀ-ž]+(\s)[a-zA-ZÀ-ž]+?$/)) {
        formIsValid = false;
        errors["name"] = "Only letters";
      }
    }

    if (!fields["dateOfBirth"].value) {
      formIsValid = false;
      errors["dateOfBirth"] = "Cannot be empty";
    }

    if (!fields["sex"].value) {
      formIsValid = false;
      errors["sex"] = "Cannot be empty";
    }
    //Email
    if (!fields["email"].value) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].value.lastIndexOf("@");
      let lastDotPos = fields["email"].value.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].value.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].value.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.errors);
    if (this.handleValidation()) {
      this.state.users.push(this.state.user);
    }
  }

  componentDidMount() {
    /*  this.setState({ isLoading: true });
   fetch("http://stistko.uiv.cz/katalog/textdata/C10837BADV.xml", {
      mode: "no-cors",
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .then((data) => this.setState({ education: data, isLoading: false }));
      */
    let self = this;
  }

  render() {
    const { education, isLoading } = this.state;
    /* if (isLoading) {
      return <p>Loading ...</p>;
    }*/

    return (
      <div>
        <div>
          <ol>
            {this.state.users.map((user, i) => (
              <li key={i}>{user.name.value}</li>
            ))}
          </ol>
        </div>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td> Jméno a Příjemní:</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={this.state.user.name.value}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>emailová adresa:</td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={this.state.user.email.value}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>datum narození:</td>
                <td>
                  <div>
                  <DatePicker
                    name="dateOfBirth"
                    selected={this.state.user.dateOfBirth.value}
                    onChange={this.handleChangeDate.bind(this, 'dateOfBirth')}
                    popperPlacement="top-end"
                    popperModifiers={{
                      offset: {
                        enabled: true,
                        offset: '5px, 10px'
                      },
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false, 
                        boundariesElement: 'viewport'
                      }
                    }}
                  />
                  </div>
                </td>
              </tr>
              <tr>
                <td>pohlaví:</td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="man"
                      onChange={this.handleChange}
                    />
                    žena
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="woman"
                      onChange={this.handleChange}
                    />
                    muž
                  </label>
                </td>
              </tr>
              <tr>
                <td>maximálně dosažené vzdělání:</td>
                <td>
                  <select
                    value={this.state.user.education.value}
                    onChange={this.handleChange}
                  >
                    {this.state.education.map((list) => (
                      <option key={list} value={list}>
                        {list}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>zájmy:</td>
                <td>
                  <textarea
                    name="hobbies"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default UsersForm;
