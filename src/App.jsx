import { useState, useEffect } from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import Main from './components/Main';
import Root from './components/Root';
import Sidebar from './components/Sidebar';
import Connect from './components/Connect';

import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from 'react-hot-toast';



function App() {
    const [sidebar, setSideBar] = useState(true);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) {
            // Loading
        }
        if (error) {
            console.log(error);
        }
    }, [error, loading, user]);
    return (
        <>
            <Toaster position={user ? 'bottom-right' : 'bottom-center'} />
            {user && <Layout>
            <Sidebar loading={loading} hidden={sidebar} setSideBar={setSideBar} />
            <Root>
                <Header sidebar={sidebar} setSideBar={setSideBar} />
                <Main></Main>
            </Root>
        </Layout>}
        {!loading && !user && <Connect />}
        </>
    );
}

export default App;
