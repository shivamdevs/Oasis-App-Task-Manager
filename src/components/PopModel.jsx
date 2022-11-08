import css from './../styles/popmodel.module.css';

// import { useState } from'react';


function Popmodel(props) {
    return (
        <div className={css.model}></div>
    );
}

function openModel(model) {
    return new Promise((resolve, reject) => {

    });
}

export default Popmodel;
export {openModel};