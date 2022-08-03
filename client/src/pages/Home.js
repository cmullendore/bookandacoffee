import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Form, Alert, Button } from 'react-bootstrap';

import { useMutation } from "@apollo/react-hooks";

// import { loginUser } from '../utils/API';
import { LOGIN_USER } from "../utils/mutations";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

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
        <Container>
          <h1>Viewing Home</h1>
        </Container>
      </Jumbotron>



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
