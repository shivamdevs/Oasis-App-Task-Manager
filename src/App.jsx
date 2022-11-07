import { useState, useEffect } from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import Main from './components/Main';
import Root from './components/Root';
import Sidebar from './components/Sidebar';
import Connect from './components/Connect';

function App() {
    const [authorised, setAuthorised] = useState(true);
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
            <Sidebar setAuthorised={setAuthorised} />
            <Root>
                <Header></Header>
                <Main></Main>
            </Root>
        </Layout>}
        {!authorised && <Connect setAuthorised={setAuthorised} />}
        </>
    );
}

export default App;
