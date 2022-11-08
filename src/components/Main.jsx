import { Routes, Route } from 'react-router-dom';

import css from './../styles/main.module.css';


import Folder from './main/Folder';
import Folders from './main/Folders';
import Whatsnew from './main/Whatsnew';
import Workspace from './main/Workspace';
import Workspaces from './main/Workspaces';

function Main(props) {
    return (
        <div className={css.main}>
            <Routes>
                <Route path="/" element={<Whatsnew />} />
                <Route path="/workspaces" element={<Workspaces />} />
                <Route path="/:wsid" element={<Workspace />} />
                <Route path="/:wsid/folders" element={<Folders />} />
                <Route path="/:wsid/:fdid" element={<Folder />} />
            </Routes>
        </div>
    );
}

export default Main;