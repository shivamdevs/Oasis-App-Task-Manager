import css from './../styles/root.module.css';

function Root(props) {
    return (
        <div className={css.root}>
            {props.children}
        </div>
    );
}

export default Root;
