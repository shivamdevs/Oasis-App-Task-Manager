// import { useEffect, useState } from 'react';
import css from './../styles/sidebar.module.css';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUserData, getWorkspaces, logout } from "./../firebase";

import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useCallback, useEffect, useState } from 'react';
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

    const fetchUserProfile = useCallback(async () => {
        const data = await getUserData(user);
        if (data) {
            setName(data.name);
            setProfile(data.profile);
        } else {
            toast.error("Failed to fetch user data.");
            // signout();
        }
        return false;
    }, [user]);
    const fetchWorkspace = useCallback(async () => {
        const data = await getWorkspaces(user);
        let space = window.localStorage ? window.localStorage.getItem("--tm-space-id") : null;
        console.log(data);
        if (data === null) {
            toast.error("Failed to fetch workspaces.");
            // signout();
        } else if (data.length) {
            let flag = false;
            if (!space) {
                space = data[0].wsid;
                if (window.localStorage) window.localStorage.setItem("--tm-space-id", space);
            }
            for (let item of data) {
                if (item.wsid === space) {
                    flag = true;
                    setWorkspace({
                        wsid: item.wsid,
                        name: item.name,
                        icon: "/assets/images/694824.svg",
                        desc: "Switch to another workspace",
                    });
                    break;
                }
            }
            if (!flag) {
                if (window.localStorage) window.localStorage.setItem("--tm-space-id", "");
                setWorkspace({
                    wsid: "switch",
                    name: "Select a workspace",
                    icon: "/assets/images/694824.svg",
                    desc: "Switch to a workspace",
                });
            }
        } else {
            if (window.localStorage) window.localStorage.setItem("--tm-space-id", "");
            setWorkspace({
                wsid: "new",
                name: "Create workspace",
                icon: "/assets/images/694823.svg",
                desc: "Create a new workspace",
            });
        }
        return false;
    }, [user]);
    useEffect(() => {
        fetchUserProfile();
        fetchWorkspace();
    }, [fetchUserProfile, fetchWorkspace]);

    const toggleBar = () => {
        props.setSideBar(stat => !stat);
    };
    const searchClick = async () => {
        if (workspace.wsid === "loading") return toast.error("Still loading workspace.");
        openModel("search-workspace").then((data) => {
            navigate(data.path);
        }).catch(err => {
            console.log(err);
        });
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
                        <Link to="/workspaces" className={css.switch}>
                            <div className={css.spaceicon}>
                                <img src={workspace?.icon || "/assets/images/694823.svg"} alt="" />
                            </div>
                            <div className={css.spacename}>{workspace?.name}</div>
                        </Link>
                    </div>
                </Tippy>
                <div className={css.searchbox}>
                    <button onClick={searchClick} className={css.search}>
                        <BiSearch />
                        <span className={css.text}>Search Workspace</span>
                    </button>
                </div>
                <div className={css.body}>
                    <Workspace workspace={workspace} />
                </div>
                <div className={css.footer}>
                    {name && <Link to="/profile" className={css.profile}>
                        <div className={css.picture}>
                            <img src={profile} alt="" />
                        </div>
                        <div className={css.profileData}>
                            <Tippy content={name}>
                                <div className={css.profileName}>{name || <span>&nbsp;</span>}</div>
                            </Tippy>
                            <div className={css.profileNext}><span>View profile</span> <HiChevronDoubleRight /></div>
                        </div>
                    </Link>}
                    <Tippy content="Logout" placement='right'><button type="button" className={css.logout} onClick={signout}><AiOutlinePoweroff /></button></Tippy>
                </div>
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