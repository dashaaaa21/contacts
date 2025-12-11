import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from 'react';

import ContactList from "./pages/ContactList/ContactList"
import NewContact from "./pages/NewContact/NewContact"
import UpdateContact from "./pages/UpdateContact/UpdateContact"
import NotFound from "./pages/NotFound/NotFound"
import Header from './components/Header/Header';
import EditButton from "./components/EditButton/EditButton.jsx";

function App() {
    const [stor, setStor] = useState(
        [
            {
                avatar: "97",
                email: "dasha@fmail.com",
                favorite: false,
                firstName: "Daria",
                gender: "female",
                id: "0ade6e5f-07ef-4e72-85de-b940aabea656",
                lastName: "Tkachenko",
                phone: "0680423116",
                status: "family",
            }
        ]
    )

    const handleNewContact = (newContact) => {
        setStor(prevStor => [...prevStor, newContact])
    }

    const handleDeleteContact = (contactId) => {
        setStor(prevStor => prevStor.filter(contact => contact.id !== contactId))
    }

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<ContactList stor={stor} onDeleteContact={handleDeleteContact}/>}/>
                <Route path="/new-contact" element={<NewContact onNewContact={handleNewContact}/>}/>
                <Route path="/update-contact" element={<UpdateContact/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}

export default App