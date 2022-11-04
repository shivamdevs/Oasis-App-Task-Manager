import { useEffect, useState } from 'react';
import css from './../styles/sidebar.module.css';

import { HiChevronDoubleLeft } from 'react-icons/fa';

function Sidebar(props) {
    const [render, setRender] = useState(false);
    useEffect(() => {
        setRender(true);
    },[]);
    return (
        <div className={css.sidebar}>
            {render && <div className={css.wrapper}>
                <div className={css.header}>
                    <div className={css.symbol}>
                        <img className={css.logo} src="/logo192.png" alt="" />
                        <span className={css.text}>Task Manager</span>
                    </div>
                    <button type="button"><HiChevronDoubleLeft /></button>
                </div>
            </div>}
        </div>
    );
}

export default Sidebar;
