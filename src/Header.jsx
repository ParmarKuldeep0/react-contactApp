// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase_config';
import './App.css';

function Header() {
    const navigate = useNavigate();
    const [contactData, setContactData] = useState([]);
    const [filteredContactData, setFilteredContactData] = useState([]);

    useEffect(function() {
        const unsubscribe = db.collection("contact-collections")
            .orderBy('contactName', 'asc')
            .onSnapshot((snapshot) => {
                const contacts = snapshot.docs.map((doc) => ({
                    docId: doc.id,
                    docData: doc.data()
                }));
                console.log(contacts);
                setContactData(contacts);
                setFilteredContactData(contacts);
            });
        return () => unsubscribe();
    }, []);

    function search(event) {
        setFilteredContactData(contactData.filter(contact => 
            contact.docData.contactName.toLowerCase().startsWith(event.target.value.toLowerCase()))
        );
    }

    function add() {
        navigate("/add");
    }

    const deleteTheContact = (docId) => {
        db.collection("contact-collections").doc(docId).delete();
    }

    const EditPage = (docId, docData) => {
        navigate("/edit", { state: { docId, docData } });
    }

    return (
        <div className="container">
            <button className="button" onClick={add}>Add</button>
            <input 
                type="text"
                className="search-input"
                placeholder="Search contacts..."
                onChange={search}
            />
            {filteredContactData.length === 0 ? (
                <div>
                    {contactData.map((contact) => (
                        <div key={contact.docId} className="contact-card">
                            <div className="contact-info">
                                <h2>{contact.docData.contactName}</h2>
                                <h3>{contact.docData.contactNumber}</h3>
                                <h4>{contact.docData.contactEmail}</h4>
                            </div>
                            <div className="actions">
                                <button className="button" onClick={() => deleteTheContact(contact.docId)}>Delete</button>
                                <button className="button" onClick={() => EditPage(contact.docId, contact.docData)}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {filteredContactData.map((contact) => (
                        <div key={contact.docId} className="contact-card">
                            <div className="contact-info">
                                <h2>{contact.docData.contactName}</h2>
                                <h3>{contact.docData.contactNumber}</h3>
                                <h4>{contact.docData.contactEmail}</h4>
                            </div>
                            <div className="actions">
                                <button className="button" onClick={() => deleteTheContact(contact.docId)}>Delete</button>
                                <button className="button" onClick={() => EditPage(contact.docId, contact.docData)}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Header;
