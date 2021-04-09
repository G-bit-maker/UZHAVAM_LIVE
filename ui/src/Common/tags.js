import React, { useState } from 'react';
import "./common.scss"

function Label(props) {
    return <label onClick={props.onActive ? props.onActive : null} className={props.onClose ? "tagCloseclass " : props.active ? "tagActive tagClass " : "tagClass " }>
                {props.text}
                {props.onClose ? <a onClick={props.onClose} className={"tagClose"}></a> : ''}
                
            </label>
}

export default Label