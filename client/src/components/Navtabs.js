import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import ReviewForm from './ReviewForm';
import Auth from '../utils/auth';

// const Navtabs = ({ currentPage, handlePageChange }) => {
//   // set modal display state
//   const [showModal, setShowModal] = React.useState(false);

//   return (
//     <>
//       <Navbar bg='dark' variant='dark' expand='lg'>
//         <Container fluid>
//           <Navbar.Brand>
//             Google Books Search
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls='navbar' />
//           <Navbar.Collapse id='navbar'>
//             <Nav className='ml-auto'>
//               {/* if user is logged in show saved books and logout */}
//               {/* Temprarily removed for testing *Auth.loggedIn() ? (  */}
//               <>
//                 <Nav>
//                   <a
//                     href="#searchbooks"
//                     onClick={() => handlePageChange('SearchBooks')}
//                     // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
//                     className={currentPage === 'SearchBooks' ? 'nav-link active' : 'nav-link'}
//                   >
//                     Search Books
//                   </a>
//                 </Nav>
//                 <Nav>
//                   <a
//                     href="#savedbooks"
//                     onClick={() => handlePageChange('SavedBooks')}
//                     // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
//                     className={currentPage === 'SavedBooks' ? 'nav-link active' : 'nav-link'}
//                   >
//                     Saved Books
//                   </a>
//                 </Nav>
//                 <Nav>
//                   <a
//                     href="#readbooks"
//                     onClick={() => handlePageChange('ReadBooks')}
//                     // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
//                     className={currentPage === 'ReadBooks' ? 'nav-link active' : 'nav-link'}
//                   >
//                     Read Books
//                   </a>
//                 </Nav>
//                 <Nav>
//                   <a
//                     href="#profile"
//                     onClick={() => handlePageChange('Profile')}
//                     // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
//                     className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}
//                   >
//                     Profile
//                   </a>
//                 </Nav>
//                 <Nav>
//                   <a
//                     href="#"
//                     onClick={Auth.logout}
//                     // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
//                     className={'nav-link'}
//                   >
//                     Logout
//                   </a>
//                 </Nav>
//               </>
//               {/*) : ( */}
//               <Nav onClick={() => setShowModal(true)} ><a href="#" className={'nav-link'}>Login/Sign Up</a></Nav>
//               {/* }) */}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       {/* set modal data up */}
//       <Modal
//         size='lg'
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         aria-labelledby='signup-modal'>
//         {/* tab container to do either signup or login component */}



//         <div role="dialog" aria-modal="true" aria-labelledby="signup-modal" className="fade modal show" tabIndex="-1"
//           style={{ display: 'block' }}>
//           <div role="document" className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <div className="modal-title h4" id="signup-modal">
//                   <div className="nav nav-pills" role="tablist">
//                     <div className="nav-item"><a href="#" role="tab" data-rb-event-key="login" aria-selected="true"
//                       className="nav-link active" onClick={() => setShowLogin(true)}>Login</a></div>
//                     <div className="nav-item"><a href="#" role="tab" data-rb-event-key="signup" tabIndex="-1"
//                       aria-selected="false" className="nav-link" onClick={() => setShowSignup(true)}>Sign Up</a></div>
//                   </div>
//                 </div><button type="button" className="close"><span aria-hidden="true">×</span><span
//                   className="sr-only">Close</span></button>
//               </div>
//               <div className="modal-body">
//                 <div className="tab-content">
//                   <div id="login" role="tabpanel" aria-hidden="false" className="fade tab-pane active show">
//                     <LoginForm />
//                   </div>
//                   <div id="signup" role="tabpanel" aria-hidden="true" className="fade tab-pane">
//                     <form noValidate="" className="">
//                       <div className="form-group"><label className="form-label" htmlFor="username">Username</label><input
//                         placeholder="Your username" name="username" required="" type="text"
//                         className="form-control" defaultValue="" />
//                         <div className="invalid-feedback">Username is required!</div>
//                       </div>
//                       <div className="form-group"><label className="form-label" htmlFor="email">Email</label><input
//                         placeholder="Your email address" name="email" required="" type="email"
//                         className="form-control" defaultValue="" />
//                         <div className="invalid-feedback">Email is required!</div>
//                       </div>
//                       <div className="form-group"><label className="form-label" htmlFor="password">Password</label><input
//                         placeholder="Your password" name="password" required="" type="password"
//                         className="form-control" defaultValue="" />
//                         <div className="invalid-feedback">Password is required!</div>
//                       </div><button disabled="" type="submit" className="btn btn-success">Submit</button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//       </Modal>
//     </>
//   );
// };

// export default Navtabs;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
// import SignUpForm from './SignupForm';
// import LoginForm from './LoginForm';

// import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Google Books Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                Search For Books
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    See Your Books
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;

