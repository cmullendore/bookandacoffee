// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import Modal from 'react-bootstrap/Modal';

// import { loginUser } from '../utils/API';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';

const LoginModal = ({showLogin, setShowLogin}) => {

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  // const SignupModal = ({showSignup, setShowSignup}) => {

  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
      const { data } = await loginUser({
        variables: { ...userFormData }
      });

      if (error) {
        throw new Error('Something went wrong!');
      }

      const { token, user } = data.loginUser;
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      // username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
    {/* This is needed for the validation functionality above */}



    <Modal
      size='lg'
      show={showLogin}
      onHide={() => setShowLogin(false)}
      aria-labelledby='login-modal'>
      {/* tab container to do login component */}

      <div role="dialog" aria-modal="true" aria-labelledby="login-modal" className="fade modal show" tabIndex="-1"
        style={{ display: 'block' }}>
        <div role="document" className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
                <h2>Login</h2>
              <button type="button" className="close" onClick={() => setShowLogin(false)}><span aria-hidden="true">×</span><span
              className="sr-only">Close</span>
              </button>
            </div>
            
            <div className="modal-body">



            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Your Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>A Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
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

export default LoginModal;
