import { useState, useEffect } from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import Main from './components/Main';
import Root from './components/Root';
import Sidebar from './components/Sidebar';
import Connect from './components/Connect';
import PopModel from './components/PopModel';

import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';



function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Element />}></Route>
                    <Route path="/accounts" element={<Connect />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

function Element(props) {
    const navigate = useNavigate();
    const [sidebar, setSideBar] = useState(true);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/accounts");
        }

        if (error) {
            console.log(error);
        }
    }, [error, loading, navigate, user]);
    return (
        <>
            <Toaster position={user ? 'bottom-right' : 'bottom-center'} />
            {user && <Layout>
                <Sidebar loading={loading} hidden={sidebar} setSideBar={setSideBar} />
                <Root>
                    <Header sidebar={sidebar} setSideBar={setSideBar} />
                    <Main></Main>
                </Root>
                <PopModel />
            </Layout>}
        </>
    );
}
