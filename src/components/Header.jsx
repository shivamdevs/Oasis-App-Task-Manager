import css from './../styles/header.module.css';
import { HiChevronDoubleRight } from 'react-icons/hi';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

function Header(props) {
    const toggleBar = () => {
        props.setSideBar(stat => !stat);
    };
    return (
        <div className={css.header}>
            <div className={css.wrapper}>
                {!props.sidebar && <div className={css.sidebar}>
                    <Tippy content="Show Sidebar"><button type="button" className={css.button} onClick={toggleBar}><HiChevronDoubleRight /></button></Tippy>
                    <Link to="/" className={css.symbol}>
                        <img className={css.logo} src="/logo192.png" alt="" />
                    </Link>
                </div>}
            </div>
        </div>
    );
}

export default Header;
