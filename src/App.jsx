import Header from './components/Header';
import Layout from './components/Layout';
import Main from './components/Main';
import Root from './components/Root';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <Layout>
            <Sidebar />
            <Root>
                <Header></Header>
                <Main></Main>
            </Root>
        </Layout>
    );
}

export default App;
