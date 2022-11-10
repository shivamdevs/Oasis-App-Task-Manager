import { Link } from 'react-router-dom';
import css from './../../styles/whatsnew.module.css';

function Whatsnew(props) {
    props.setTitle('Welcome');
    return (
        <div className=''>
            {/* <div className={css.title}>Welcome to <span>Task Manager</span>!</div> */}
            <div className={css.columns}>
                <div className={css.row1}>
                    <div className={css.title}>Task <span>Manager</span>!</div>
                    <div className={css.card}>
                        <div className={css.head}>Jump to</div>
                        <p>
                            <Link to="/workspaces" className='linker'>Workspaces</Link>
                            <Link to="/profile" className='linker'>Profile</Link>
                            <Link to="/settings" className='linker'>Settings</Link>
                        </p>
                    </div>
                </div>
                <div className={css.row2}>
                    <div className={css.title}>Whats <span>new here</span>!</div>
                    <div className={css.card}>
                        <div className={css.head}>Version: <span>1.0.0</span></div>
                        <div>
                            <ul>
                                <li><p>Manage all your tasks in one place.</p></li>
                                <li><p>Perfect for Client management and Office scheduler.</p></li>
                                <li><p>Keep your tasks organised by managing separate Workspaces.</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Whatsnew;