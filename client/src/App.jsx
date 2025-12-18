import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from 'react-redux';
import store from './store.js';

import ContactList from "./pages/ContactList/ContactList";
import NewContact from "./pages/NewContact/NewContact";
import UpdateContact from "./pages/UpdateContact/UpdateContact";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Welcome from "./pages/Welcome/Welcome";
import Header from './components/Header/Header';

function AppContent() {
    const auth = useSelector(state => state.auth);

    const routes = auth.user ? (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/new-contact" element={<NewContact />} />
                <Route path="/update-contact/:id" element={<UpdateContact />} />
                <Route path="/login" element={<ContactList />} />
                <Route path="/register" element={<ContactList />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    ) : (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<Welcome />} />
        </Routes>
    );

    return <Router>{routes}</Router>;
}

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

export default App;