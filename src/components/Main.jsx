import { Routes, Route } from 'react-router-dom';

import css from './../styles/main.module.css';


import Folder from './main/Folder';
import Folders from './main/Folders';
import Whatsnew from './main/Whatsnew';
import Workspace from './main/Workspace';
import Workspaces from './main/Workspaces';

function Main(props) {
    const setTitle = (...titles) => {
        document.title = titles.length ? titles.join(" • ") + " • Task Manager" : "Task Manager";
    };
    return (
        <div className={css.main}>
            <Routes>
                <Route path="/" element={<Whatsnew setTitle={setTitle} />} />
                <Route path="/workspaces" element={<Workspaces setTitle={setTitle} />} />
                <Route path="/:wsid" element={<Workspace setTitle={setTitle} />} />
                <Route path="/:wsid/folders" element={<Folders setTitle={setTitle} />} />
                <Route path="/:wsid/:fdid" element={<Folder setTitle={setTitle} />} />
            </Routes>
        </div>
    );
}

export default Main;