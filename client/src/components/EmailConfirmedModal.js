import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import Modal from 'react-bootstrap/Modal';
import { useLocation, useHistory } from 'react-router-dom';
import { CONFIRM_EMAIL } from "../utils/mutations";

const EmailConfirmedModal = () => {

  const [confirmResponse, setConfirmResponse] = useState();
  const [showConfirm, setShowConfirm] = useState(false);

  const [confirmEmail, { error }] = useMutation(CONFIRM_EMAIL);

  const hist = useHistory();

  const redirectToHome = () => {
    setShowConfirm(false);
    hist.replace("/");
  }

  useEffect(() => {
    if (confirmResponse) {
      setShowConfirm(true);
    }
  }, [confirmResponse]);

  // This if determines whether this runs at all
  // If these params don't exist there's no reason to anything else
  const loc = useLocation();
  const par = new URLSearchParams(loc.search);
  if (
    par.has('user') &&
    par.has('code')
  ) {
    const confirmData = {
      username: decodeURIComponent(par.get('user')),
      code: decodeURIComponent(par.get('code'))
    }
    if (!confirmResponse) {
      try {
        confirmEmail({
          variables: { ...confirmData },
        })
          .then(({ data }) => {
            setConfirmResponse(data.confirmEmail);
          });
      } catch (err) {
        console.error(error);
      }
    }

    return (
      <>
        <Modal
          size='lg'
          show={showConfirm}
          onHide={() => redirectToHome()}
          aria-labelledby='email-confirmation-modal'>
          <div role="dialog" aria-modal="true" aria-labelledby="email-confirmation-modal" className="fade modal show" tabIndex="-1"
            style={{ display: 'block' }}>
            <div role="document" className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>{confirmResponse?.success ? "Success" : "Failure"}</h2>
                  <button type="button" className="close" onClick={() => redirectToHome()}><span aria-hidden="true">×</span><span
                    className="sr-only">Close</span>
                  </button>
                </div>

                <div className="modal-body">
                  <h5>
                    {confirmResponse?.success ? ("Your email has been confirmed. You may now log in.")
                      :
                      (
                        "Your token was not accepted"
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
