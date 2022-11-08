import css from './../styles/popmodel.module.css';

import { createRoot } from 'react-dom/client';

import { MdClose } from 'react-icons/md';
import Tippy from '@tippyjs/react';

// import { useState } from'react';

function Popmodel(props) {
    return (
        <div className={css.area} id="pop-model"></div>
    );
}

function openModel(model) {
    const root = document.getElementById("pop-model");
    const pop = document.createElement("div");
    const popup = createRoot(pop);
    pop.className = css.model;
    root.appendChild(pop);
    return new Promise((resolve, reject) => {
        const trigger = () => {
            pop.addEventListener('click', function(e) {
                if (e.target=== this) {
                    reject({
                        type: "model",
                        code: "Popup closed.",
                    });
                    popup.unmount();
                    root.removeChild(pop);
                } else {
                    trigger();
                }
            }, {once: true});
        };
        const close = () => {
            pop.click();
        };

        trigger();

        popup.render(<>
            <div className={css.wrapper}>
                <div className={css.grid}>
                    {model === 'workspace' && <Workspace resolve={resolve} close={close} reject={reject} />}
                </div>
            </div>
        </>);
    });
}

export default Popmodel;
export {openModel};

function Header(props) {
    return (
        <div className={css.header}>
            <div className={css.headerdata}>
                {props.icon && <div className={css.headericon}><img src={props.icon} alt="" /></div>}
                <div className={css.headertext}>{props.text}</div>
            </div>
            <Tippy content={`Close ${props.text}`} placement='left'><button className={css.headerclose} onClick={props.close}><MdClose /></button></Tippy>
        </div>
    );
}

function Workspace(props) {
    return (
        <>
            <Header close={props.close} text="Workspace" icon="/assets/images/694825.svg" />
        </>
    );
}