import css from './../styles/layout.module.css';

function Layout(props) {
    return (
        <div className={css.layout}>
            {props.children}
        </div>
    );
}

export default Layout;
