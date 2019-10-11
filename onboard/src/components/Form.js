import React, { useState, useEffect } from "react";
import { withFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (props.status) {
      setUsers([...users, props.status]);
    }
  }, [props.status]);

  return (
    <div className="user-form">
      <Formik>
        <Form>
          <label htmlFor="username">Username:&nbsp;
            <Field component="input" type="text" name="username" />
            <ErrorMessage name="username" component="div" />
          </label><br />

          <label htmlFor="email">Email:&nbsp;
            <Field component="input" type="text" name="email" />
            <ErrorMessage name="email" component="div" />
          </label><br />

          <label htmlFor="password">Password:&nbsp;
            <Field component="input" type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </label><br />

          <label htmlFor="role">Role:&nbsp;
            <Field component="select" name="role" className="role-select" >
              <option>Please Select</option>
              <option value="Administrator">Administrator</option>
              <option value="Standard User">Standard User</option>
              <option value="Guest User">Guest User</option>
            </Field>
          </label><br />

          <Field
              component="input"
              type="checkbox"
              name="tos"
          />
          <label className="checkbox-container" htmlFor="tos" onClick={() => {
              let checked = document.getElementsByName('tos')[0].checked || false;
              document.getElementsByName('tos')[0].toggleAttribute('checked', !checked);
            }
          }>I agree to the&nbsp;
            <a href="#tos">Terms of Service</a>
          </label><br />

          <label htmlFor="notes">Notes:<br />
            <Field
              component="textarea"
              type="text"
              name="notes"
              placeholder="notes"
            />
          </label><br />

          <button type="submit">Submit!</button>
        </Form>
      </Formik>

      {console.log('users: ', users)}
      {users.map(user => (
        <ul key={user.id}>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
          <li>Role: {user.role}</li>
          <li>TOS: {user.tos}</li>
          <li>Notes: {user.notes}</li>
        </ul>
      ))}

    </div>
  );
};

const myMapPropsToValues = props => {
  console.log('props: ', props);
  const returnObj = {
    username: props.username || "",
    email: props.email || "",
    password: props.password || "",
    role: props.role || "",
    tos: props.tos || false,
    notes: props.notes || "",
  };
  return returnObj;
};

const myHandleSubmit = (values, { setStatus }) => {
  console.log("submit pressed! ... sending...");
  axios
    .post("https://reqres.in/api/users/", values)
    .then(res => {
      console.log(res);
      setStatus(res.data);
    })
    .catch(err => console.log(err));
};

const yupSchema = Yup.object().shape({
  username: Yup.string().required("Please type a username"),
  email: Yup.string().email().required("Please type an email address"),
  password: Yup.string().required("Please type a password"),
  tos: Yup.boolean().oneOf([true], 'Must Accept Terms of Service'),
});

const formikObj = {
  mapPropsToValues: myMapPropsToValues,
  handleSubmit: myHandleSubmit,
  validationSchema: yupSchema
};

const EnhancedOnboardingForm = withFormik(formikObj)(OnboardingForm);

export default EnhancedOnboardingForm;