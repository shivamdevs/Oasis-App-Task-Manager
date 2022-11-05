import { useState } from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import Main from './components/Main';
import Root from './components/Root';
import Sidebar from './components/Sidebar';
import Connect from './components/Connect';

function App() {
    const [authorised, setAuthorised] = useState(true);
    return (
        <>
            {authorised && <Layout>
            <Sidebar />
            <Root>
                <Header></Header>
                <Main></Main>
            </Root>
        </Layout>}
        {!authorised && <Connect />}
        </>
    );
}

export default App;
