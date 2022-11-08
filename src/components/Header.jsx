import css from './../styles/header.module.css';
import { HiChevronDoubleRight } from 'react-icons/hi';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';

function Header(props) {
    const toggleBar = () => {
        props.setSideBar(stat => !stat);
    };
    const [focused, setFocus] = useState(false);
    return (
        <div className={css.header}>
            <div className={css.wrapper}>
                {!props.sidebar && <div className={css.sidebar}>
                    <Tippy content="Show Sidebar"><button type="button" className={css.button} onClick={toggleBar}><HiChevronDoubleRight /></button></Tippy>
                </div>}
                <Link to="/" className={css.symbol}>
                    <img className={css.logo} src="/logo192.png" alt="" />
                </Link>
            </div>
            <div className={css.searchbar}>
                <div className={`${css.searcharea} ${focused ? css.focused : ''}`}>
                    <label htmlFor="search-inside-workspace"><BiSearch /></label>
                    <input
                        id="search-inside-workspace"
                        type="search"
                        autoComplete='search'
                        placeholder='Search Tasks'
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
