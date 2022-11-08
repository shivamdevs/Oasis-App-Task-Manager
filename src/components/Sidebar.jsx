// import { useEffect, useState } from 'react';
import css from './../styles/sidebar.module.css';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUserData, getWorkspaces, logout } from "./../firebase";

import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { openModel } from './PopModel';
import { isMobile } from 'react-device-detect';

function Sidebar(props) {
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [name, setName] = useState("");
    const [profile, setProfile] = useState("/assets/images/149071.png");
    const [workspace, setWorkspace] = useState({
        wsid: "waiting",
        name: "Loading Workspace...",
        desc: "Loading your workspaces",
        icon: "/assets/images/442323.svg",
    });

    const fetchUserProfile = async () => {
        const data = await getUserData(user);
        if (data) {
            setName(data.name);
            setProfile(data.profile);
        } else {
            toast.error("Failed to fetch user data.");
        }
    };
    const fetchWorkspace = async () => {
        const data = await getWorkspaces(user);
        if (data === null) {
            toast.error("Failed to fetch workspaces.");
        } else if (data.length) {
            let flag = false;
            for (let item of data) {
                if (item.active && item.active === true) {
                    flag = true;
                    setWorkspace({
                        wsid: item.wsid,
                        name: item.name,
                        icon: item.icon,
                        desc: "Switch to another workspace",
                    });
                    break;
                }
            }
            if (!flag) {
                setWorkspace({
                    wsid: "switch",
                    name: "Select a workspace",
                    icon: "/assets/images/694824.svg",
                    desc: "Switch to a workspace",
                });
            }
        } else {
            setWorkspace({
                wsid: "new",
                name: "Create workspace",
                icon: "/assets/images/694823.svg",
                desc: "Create a new workspace",
            });
        }
    };
    useEffect(() => {
        fetchUserProfile();
        fetchWorkspace();
    });

    const toggleBar = () => {
        props.setSideBar(stat => !stat);
    };
    const workspaceClick = async () => {
        /*const pop = */await openModel("new-workspace");
    };
    const signout = () => {
        navigate("/");
        logout();
    };


    return (
        <>{props.hidden && <div className={`${css.sidebar} ${isMobile ? css.mobile : ''}`}>
            {!props.loading && <div className={css.wrapper}>
                <div className={css.header}>
                    <Link to="/" className={css.symbol}>
                        <img className={css.logo} src="/logo192.png" alt="" />
                        <span className={css.text}>Task Manager</span>
                    </Link>
                    <Tippy content="Hide Sidebar" placement='right'><button type="button" className={css.button} onClick={toggleBar}><HiChevronDoubleLeft /></button></Tippy>
                </div>
                <Tippy content={workspace?.desc}>
                    <div className={css.space}>
                        <button onClick={workspaceClick} className={css.switch}>
                            <div className={css.spaceicon}>
                                <img src={workspace?.icon || "/assets/images/694823.svg"} alt="" />
                            </div>
                            <div className={css.spacename}>{workspace?.name}</div>
                        <kbd className={css.keyboard}>Ctrl + C</kbd>
                        </button>
                    </div>
                </Tippy>
                <div className={css.searchbox}>
                    <button type="button" className={css.search}>
                        <BiSearch />
                        <span className={css.text}>Search Workspace</span>
                        <kbd className={css.keyboard}>Ctrl + K</kbd>
                    </button>
                </div>
                <div className={css.body}>
                    <Workspace workspace={workspace} />
                </div>
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
                    <Tippy content="Logout" placement='right'><button type="button" className={css.logout} onClick={signout}><AiOutlinePoweroff /></button></Tippy>
                </div>}
            </div>}
        </div>}</>
    );
}

export default Sidebar;

function Workspace(props) {
    const space = props.workspace;
    return (<>
        {space.wsid === 'new' && <><p className={css.Wc}>Create a new Workspace first.</p><p className={css.Wcm}>Workspace helps in keeping your lists separate from each other.</p></>}
        {space.wsid === 'switch' && <><p className={css.Wc}>Switch to a Workspace first.</p><p className={css.Wcm}>Workspace helps in keeping your lists separate from each other.</p></>}
        {space.wsid === 'waiting' && <><p className={css.Wc}>Loading workspace data...</p><p className={css.Wcm}>Workspace helps in keeping your lists separate from each other.</p></>}
    </>);
}