import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Form, Alert, Button } from 'react-bootstrap';

import { useMutation } from "@apollo/react-hooks";

// import { loginUser } from '../utils/API';
import { LOGIN_USER } from "../utils/mutations";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import ReviewList from '../components/DisplayReview';

const Home = () => {
  

  const [userLoginData, setUserLoginData] = useState({ email: "", password: "" });
  const [userSignupData, setUserSignupData] = useState({ username: "", email: "", password: "" });

  const [login, { loginError }] = useMutation(LOGIN_USER);
  const [addUser, { addUserError }] = useMutation(ADD_USER);
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setUserSignupData({ ...userSignupData, [name]: value });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const { data } = await login({
        variables: { ...userLoginData },
      });
      Auth.login(data.login.token);
    } catch (err) {
      setShowAlert(true);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userSignupData },
      });
      Auth.login(data.addUser.token);
    } catch (err) {
      setShowAlert(true);
    }

    setUserSignupData({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container fluid>
          <h1>Viewing Home</h1>
        </Container>
      </Jumbotron>

      <Container>
        <ReviewList/>
      </Container>


      <Form noValidate validated={validated} onSubmit={handleLoginSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleLoginChange}
            value={userLoginData.email}
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
            onChange={handleLoginChange}
            value={userLoginData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userLoginData.email && userLoginData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>


      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleSignupSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleSignupChange}
            value={userSignupData.username}
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
            onChange={handleSignupChange}
            value={userSignupData.email}
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
            onChange={handleSignupChange}
            value={userSignupData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userSignupData.username &&
              userSignupData.email &&
              userSignupData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>


    </>



  );
};
/*
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};
*/

export default Home;
