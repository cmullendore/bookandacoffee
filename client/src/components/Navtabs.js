import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import SignupModal from './SignupModal';
import Auth from '../utils/auth';
import EmailConfirmedModal from './EmailConfirmedModal';

const Navtabs = ({ currentPage, handlePageChange }) => {
  // set modal display state
  //const [showModal, setShowModal] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand>
            <a href="#" onClick={() => handlePageChange('Home')}>Google Books Search </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
              <>
                <Nav>
                  <a
                    href="#searchbooks"
                    onClick={() => handlePageChange('SearchBooks')}
                    // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                    className={currentPage === 'SearchBooks' ? 'nav-link active' : 'nav-link'}
                  >
                    Search Books
                  </a>
                </Nav>
                <Nav>
                  <a
                    href="#savedbooks"
                    onClick={() => handlePageChange('SavedBooks')}
                    // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                    className={currentPage === 'SavedBooks' ? 'nav-link active' : 'nav-link'}
                  >
                    Saved Books
                  </a>
                </Nav>
                <Nav>
                  <a
                    href="#readbooks"
                    onClick={() => handlePageChange('ReadBooks')}
                    // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                    className={currentPage === 'ReadBooks' ? 'nav-link active' : 'nav-link'}
                  >
                    Read Books
                  </a>
                </Nav>
                <Nav>
                  <a
                    href="#profile"
                    onClick={() => handlePageChange('Profile')}
                    // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                    className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}
                  >
                    Profile
                  </a>
                </Nav>
                <Nav>
                  <a
                    href="#"
                    onClick={Auth.logout}
                    // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                    className={'nav-link'}
                  >
                    Logout
                  </a>
                </Nav>
              </>
               ) : (  
                <>
                <Nav>
                  <a
                    href="#"
                    onClick={() => setShowSignup(true)}
                    // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                    className={'nav-link'}
                  >
                    Signup
                  </a>
                </Nav>
                </>
              )
            }

              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SignupModal showSignup={showSignup} setShowSignup={setShowSignup} />
      <EmailConfirmedModal/>
    </>
  );
};

export default Navtabs;
