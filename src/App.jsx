import { useState, useEffect } from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import Main from './components/Main';
import Root from './components/Root';
import Sidebar from './components/Sidebar';
import Connect from './components/Connect';

// import { auth, signInWithGoogle, logInWithEmailAndPassword } from './firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
    const [authorised, setAuthorised] = useState(true);
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [user, loading, error] = useAuthState(auth);
    // useEffect(() => {
    // if (loading) {
    //     return;
    // }
    // if (!user) setAuthorised(false);
    // }, [user, loading]);
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
