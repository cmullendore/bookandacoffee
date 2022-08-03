import React, { useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";

import { changeBiography, UPDATE_BIO } from "../utils/mutations";

const Settings ({ biography, setShowBio }) => {
    const [changeBiography] = useMutation(UPDATE_BIO);

    const [bioData, setBioData] = useState({
        bio: ""
    });

    const [notificationText, setNotificationText] = useState('');

    const handleBioInputChange = (event) => {
        const { name, value } = event.target;
        setBioData({ ...bioData, [name]: value });
    };

    const handleBioFormSubmit = async (event) => {
        event.preventDefault();
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    try {
        const { data } = await changeBiography({
            variables: { _id: context.user.ID, ...bio },
        });
        setNotificationText("You have successfully updated your profile's biography!");
    }   catch (err) {
        setNotificationText("Your biography has not been saved due to an error.");
    };

    /*return (

        <Modal
            size='med'
            show={showBio}
            onHide={( => setShowBio)}

    )

    }*/
}