import css from './../styles/header.module.css';
import { HiChevronDoubleRight } from 'react-icons/hi';

function Header(props) {
    const toggleBar = () => {
        props.setSideBar(stat => !stat);
    };
    return (
        <div className={css.header}>
            <div className={css.wrapper}>
                {!props.sidebar && <div className={css.sidebar}>
                    <button type="button" className={css.button} onClick={toggleBar}><HiChevronDoubleRight /></button>
                    <div className={css.symbol}>
                        <img className={css.logo} src="/logo192.png" alt="" />
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Header;
