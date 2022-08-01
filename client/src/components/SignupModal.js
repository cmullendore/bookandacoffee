import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import Modal from 'react-bootstrap/Modal';
import { ADD_USER, SEND_EMAIL_CONFIRMATION } from "../utils/mutations";
import url from "url";


const SignupModal = ({showSignup, setShowSignup}) => {

 

  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const [addUser, { addUserError }] = useMutation(ADD_USER);
  const [sendEmailConfirmation, { sendEmailError }] = useMutation(SEND_EMAIL_CONFIRMATION);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      const parsedUrl = url.parse(window.location.href);
      const confirmUrl = `${parsedUrl.protocol}//${parsedUrl.host}?user=${encodeURIComponent(data.addUser.username)}&code=${encodeURIComponent(data.addUser.emailConfirmationCode)}`;
      console.log(data.addUser.emailConfirmationCode);
      console.log(encodeURIComponent(data.addUser.emailConfirmationCode));
      console.log(confirmUrl);

      const sendEmailResponse = await sendEmailConfirmation({
        variables: { ...{email: data.addUser.email, username: data.addUser.username, confirmUrl: confirmUrl} }
      });
      console.log(sendEmailResponse);
      setAlertText("Success! Please follow the instructions in the email you should be receiving shortly to confirm your email address and activate your account. Remember to check junk and spam folders.");
      setShowAlert(true);
    } catch (err) {
      console.error(addUserError);
      setAlertText("Something went wrong with your signup!");
      setShowAlert(true);
    }



    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };


  return (
    <>
    {/* This is needed for the validation functionality above */}



    <Modal
      size='lg'
      show={showSignup}
      onHide={() => setShowSignup(false)}
      aria-labelledby='signup-modal'>
      {/* tab container to do either signup or login component */}

      <div role="dialog" aria-modal="true" aria-labelledby="signup-modal" className="fade modal show" tabIndex="-1"
        style={{ display: 'block' }}>
        <div role="document" className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
                <h2>Signup</h2>
              <button type="button" className="close" onClick={() => setShowSignup(false)}><span aria-hidden="true">×</span><span
              className="sr-only">Close</span>
              </button>
            </div>
            
            <div className="modal-body">





      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          {alertText}
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>







      </div>
            </div>

          </div>
        </div>
      </Modal>


    </>
  );
};

export default SignupModal;
