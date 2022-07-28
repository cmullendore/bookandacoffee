import React, { useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";

import { ADD_REVIEW } from "../utils/mutations";


const ReviewForm = ({book, showReview, setShowReview}) => {

    /* this is only for testing and should be removed */

  const [addReview, { error }] = useMutation(ADD_REVIEW);

  // set initial form state
  const [reviewData, setReviewData] = useState({
    title: "",
    content: ""
  });
  
  // set state for alert
  const [notificationText, setNotificationText] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData({ ...reviewData, [name]: value });
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
      const { data } = await addReview({
        variables: { ...[book, reviewData] },
      });
      setNotificationText('Your review was saved successfully');
    } catch (err) {
      setNotificationText("There was an issue saving your review.");
    }
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}



      <Modal
        size='lg'
        show={showReview}
        onHide={() => setShowReview(false)}
        aria-labelledby='review-modal'>
        {/* tab container to do either signup or login component */}

        <div role="dialog" aria-modal="true" aria-labelledby="signup-modal" className="fade modal show" tabIndex="-1"
          style={{ display: 'block' }}>
          <div role="document" className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div className="col-3">
                  <img className={book.image} />
                </div>
                <div className="col">
                  <div className="row"><h3>{book.title}</h3></div>
                  <div className="row"><p>{book.description}</p></div>
                </div>
                <button type="button" className="close" onClick={() => setShowReview(false)}><span aria-hidden="true">×</span><span
                className="sr-only">Close</span>
                </button>
              </div>
              
              <div className="modal-body">


      <Form onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setNotificationText('')}
          show={(notificationText != '')}
          variant="success"
        >
          {notificationText}
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Provide a title for your review"
            name="title"
            onChange={handleInputChange}
            value={reviewData.title}
            required
          />
          <Form.Control.Feedback type="invalid">
            A title is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="content">Review Content</Form.Label>
          <Form.Control
            type="text"
            placeholder="Write your review here"
            name="content"
            onChange={handleInputChange}
            value={reviewData.content}
            required
          />
          <Form.Control.Feedback type="invalid">
            A review is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              reviewData.title &&
              reviewData.content
            )
          }
          type="submit"
          variant="success"
        >
          Submit Your Review
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

export default ReviewForm;
