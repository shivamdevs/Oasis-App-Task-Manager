import css from './../styles/header.module.css';
import { HiChevronDoubleRight } from 'react-icons/hi';
import Tippy from '@tippyjs/react';

function Header(props) {
    const toggleBar = () => {
        props.setSideBar(stat => !stat);
    };
    return (
        <div className={css.header}>
            <div className={css.wrapper}>
                {!props.sidebar && <div className={css.sidebar}>
                    <Tippy content="Show Sidebar"><button type="button" className={css.button} onClick={toggleBar}><HiChevronDoubleRight /></button></Tippy>
                    <div className={css.symbol}>
                        <img className={css.logo} src="/logo192.png" alt="" />
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Header;
