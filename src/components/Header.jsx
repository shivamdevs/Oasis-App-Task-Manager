import css from './../styles/header.module.css';

function Header(props) {
    return (
        <div className={css.header}>
            Header
            {props.children}
        </div>
    );
}

export default Header;
