// src/components/Edit.js
import React, { useState } from 'react';
import { db } from './firebase_config';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function Edit() {
    const location = useLocation();
    const { docId, docData } = location.state;
    const [editContactName, setEditContactName] = useState(docData.contactName);
    const [editContactNumber, setEditContactNumber] = useState(docData.contactNumber);
    const [editContactEmail, setContactEmail] = useState(docData.contactEmail);
    const navigate = useNavigate();

    function editName(event) {
        setEditContactName(event.target.value);
    }

    function editNumber(event) {
        setEditContactNumber(event.target.value);
    }

    function editEmail(event) {
        setContactEmail(event.target.value);
    }

    const saveTheData = () => {
        db.collection("contact-collections").doc(docId).update({
            contactName: editContactName,
            contactNumber: editContactNumber,
            contactEmail: editContactEmail,
        })
        .then(() => {
            navigate('/home');
        })
        .catch((error) => {
            console.log("error on update", error);
        });
    };

    return (
        <div className="edit-container">
            <h1>Edit Contact</h1>
            <input 
                type="text" 
                className="edit-input"
                value={editContactName}
                onChange={editName}
            />
            <input 
                type="text" 
                className="edit-input"
                value={editContactNumber}
                onChange={editNumber}
            />
            <input 
                type="text" 
                className="edit-input"
                value={editContactEmail}
                onChange={editEmail}
            />
            <button className="edit-button" onClick={saveTheData}>Save</button>
        </div>
    );
}

export default Edit;
