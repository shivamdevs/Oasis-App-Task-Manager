// import { useEffect, useState } from 'react';
import css from './../styles/sidebar.module.css';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';

function Sidebar(props) {
    const [user] = useAuthState(auth);
    const [name, setName] = useState("");
    const [profile, setProfile] = useState("/assets/images/149071.png");
    const toggleBar = () => {
        props.setSideBar(stat => !stat);
    };
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            setProfile(data.profile);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchUserName();
    });
    return (
        <>{props.hidden && <div className={css.sidebar}>
            {!props.loading && <div className={css.wrapper}>
                <div className={css.header}>
                    <div className={css.symbol}>
                        <img className={css.logo} src="/logo192.png" alt="" />
                        <span className={css.text}>Task Manager</span>
                    </div>
                    <Tippy content="Hide Sidebar" placement='right'><button type="button" className={css.button} onClick={toggleBar}><HiChevronDoubleLeft /></button></Tippy>
                </div>
                <div className={css.body}></div>
                {name && <div className={css.footer}>
                    <div className={css.profile}>
                        <div className={css.picture}>
                            <img src={profile} alt="" />
                        </div>
                        <Tippy content={name}>
                            <div className={css.profileData}>
                                <div className={css.profileName}>{name || <span>&nbsp;</span>}</div>
                                <div className={css.profileNext}><span>View profile</span> <HiChevronDoubleRight /></div>
                            </div>
                        </Tippy>
                    </div>
                    <Tippy content="Logout" placement='right'><button type="button" className={css.logout} onClick={logout}><AiOutlinePoweroff /></button></Tippy>
                </div>}
            </div>}
        </div>}</>
    );
}

export default Sidebar;
