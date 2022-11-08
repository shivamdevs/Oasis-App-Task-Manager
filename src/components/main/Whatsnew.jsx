import css from './../../styles/whatsnew.module.css';

function Whatsnew(props) {
    return (
        <div className=''>
            <div className={css.title}>Welcome to <span>Task Manager</span>!</div>
            <div className={css.card}>
                <div className={css.head}>Version: <span>1.0.0</span></div>
            </div>
        </div>
    );
}
export default Whatsnew;