import { useEffect, useState } from 'react';
import css from './../styles/sidebar.module.css';

import { HiChevronDoubleLeft } from 'react-icons/hi';
import Pocketbase from 'pocketbase';

function Sidebar(props) {
    const [render, setRender] = useState(false);
    const client = new Pocketbase("http://127.0.0.1:8090");
    useEffect(() => {
        setRender(true);
    },[]);
    const logout = () => {
        client.authStore.clear();
        props.setAuthorised(false);
    };
    const toggleBar = () => {
        props.setSideBar(stat => !stat);
    };
    return (
        <div className={css.sidebar}>
            {render && <div className={css.wrapper}>
                <div className={css.header}>
                    <div className={css.symbol}>
                        <img className={css.logo} src="/logo192.png" alt="" />
                        <span className={css.text}>Task Manager</span>
                    </div>
                    <button type="button" className={css.button} onClick={toggleBar}><HiChevronDoubleLeft /></button>
                </div>
                <button type="button" onClick={logout}>Logout</button>
            </div>}
        </div>
    );
}

export default Sidebar;
