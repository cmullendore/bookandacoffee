import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Modal from 'react-bootstrap/Modal';
import { useLocation, Redirect } from 'react-router-dom';
import { CONFIRM_EMAIL } from "../utils/mutations";

const EmailConfirmedModal = () => {

  const loc = useLocation();
  console.log(loc);
  const par = new URLSearchParams(loc.search);

  // This if determines whether this runs at all
  // If these params don't exist there's no reason to anything else
  if (
    par.has('username') &&
    par['username'] &&
    par.has('code') &&
    par['code']
  ) {

    const [showModal, setShowModal] = useState(false);

    const [confirmEmail, { error }] = useMutation(CONFIRM_EMAIL);

    try {
      const { data } = await confirmEmail({
        variables: {
          ...{
            username: "username",
            code: "code"
          }
        },
      });
    } catch (err) {
      console.error(error);
    }

    return (
      <>
        <Modal
          size='lg'
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby='email-confirmation-modal'>
          <div role="dialog" aria-modal="true" aria-labelledby="email-confirmation-modal" className="fade modal show" tabIndex="-1"
            style={{ display: 'block' }}>
            <div role="document" className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>{data.success ? "Success" : "Failure"}</h2>
                  <button type="button" className="close" onClick={() => setShowModal(false)}><span aria-hidden="true">×</span><span
                    className="sr-only">Close</span>
                  </button>
                </div>

                <div className="modal-body">
                  <h5>
                    {data.success ? ("Your email has been confirmed. You may now log in.")
                      :
                      (
                        `Your token was not accepted<br />${data.message}`
                      )
                    }

                  </h5>
                </div>
              </div>

            </div>
          </div>
        </Modal>


      </>
    );
  }
  else {
    return (<></>);
  }
};

export default EmailConfirmedModal;
