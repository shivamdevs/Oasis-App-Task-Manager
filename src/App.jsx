import { useState, useEffect } from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import Main from './components/Main';
import Root from './components/Root';
import Sidebar from './components/Sidebar';
import Connect from './components/Connect';

function App() {
    const [authorised, setAuthorised] = useState(true);
    const [sidebar, setSideBar] = useState(true);
    useEffect(()=>{
        const auth = window.localStorage.getItem("pocketbase_auth");
        if (auth !== null) {
            setAuthorised(auth);
        } else {
            setAuthorised(false);
        }
    }, []);
    return (
        <>
            {authorised && <Layout>
            {sidebar && <Sidebar setSideBar={setSideBar} setAuthorised={setAuthorised} />}
            <Root>
                <Header sidebar={sidebar} setSideBar={setSideBar} />
                <Main></Main>
            </Root>
        </Layout>}
        {!authorised && <Connect setAuthorised={setAuthorised} />}
        </>
    );
}

export default App;
