import css from './../styles/popmodel.module.css';

import { createRoot } from 'react-dom/client';

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
                        type: "close",
                        code: "Popup closed",
                    });
                    close();
                } else {
                    trigger();
                }
            }, {once: true});
        };
        const close = () => {
            popup.unmount();
            root.removeChild(pop);
        };
        trigger();

        popup.render(<>
            <div className={css.wrapper}>
                {model === 'workspace' && <Workspace />}
            </div>
        </>);
    });
}

export default Popmodel;
export {openModel};


function Workspace(props) {
    return (
        <></>
    );
}