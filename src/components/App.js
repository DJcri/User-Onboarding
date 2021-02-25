import React, { useState, useEffect } from "react";
import Form from "./Form";
import * as yup from "yup";
import formSchema from "../validation/formSchema";
import axios from "axios";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  acceptTerms: false,
};

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [users, setUsers] = useState([]);

  const displayUsers = () => {
    return users.map((user) => {
      return (
        <div key={user.id} className="user">
          <div>ID: {user.id}</div>
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
          <div>Password: {user.password}</div>
          <div>
            Terms of Service Accepted: {user.acceptTerms ? "True" : "False"}
          </div>
        </div>
      );
    });
  };

  const change = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
    setFormValues({ ...formValues, [name]: value });
  };

  const submit = (newUser) => {
    axios
      .post(`https://reqres.in/api/users`, newUser)
      .then((res) => {
        setUsers([...users, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="App">
      <Form
        disabled={disabled}
        values={formValues}
        change={change}
        submit={submit}
        errors={formErrors}
      />
      {displayUsers()}
    </div>
  );
}

export default App;
