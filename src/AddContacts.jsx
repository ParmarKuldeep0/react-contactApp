// src/components/AddContacts.js
import React, { useState } from 'react';
import { db } from './firebase_config';
import { useNavigate } from 'react-router-dom';
import './App.css';

function AddContacts() {
    const [contactName, setContactName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const navigate = useNavigate();

    function collectContactName(event) {
        setContactName(event.target.value);
    }

    function collectContactNumber(event) {
        setContactNumber(event.target.value);
    }

    function collectContactEmail(event) {
        setContactEmail(event.target.value);
    }

    function saveTheData() {
        db.collection("contact-collections").add({
            contactName,
            contactNumber,
            contactEmail,
        }).then(() => {
            navigate("/home");
        }).catch((error) => {
            console.log("Error adding document: ", error);
        });
    }

    return (
        <div className="add-container">
            <h1>Add Contact</h1>
            <input 
                type="text" 
                className="add-input"
                placeholder="Contact Name"
                onChange={collectContactName} 
                value={contactName}
            />
            <input 
                type="number" 
                className="add-input"
                placeholder="Contact Number"
                onChange={collectContactNumber} 
                value={contactNumber}
            />
            <input 
                type="text" 
                className="add-input"
                placeholder="Contact Email"
                onChange={collectContactEmail} 
                value={contactEmail}
            />
            <button className="add-button" onClick={saveTheData}>Save</button>
        </div>
    );
}

export default AddContacts;
