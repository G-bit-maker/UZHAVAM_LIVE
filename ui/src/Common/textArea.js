import React, { useState } from 'react';
import "./common.scss"

function Textarea(props) {
    return <>
            <textarea 
                rows={props.rows||""}
                type={props.type || ""}
                id={props.id || ""}
                onChange={e=>props.onChange(e)} 
                className={(props.error?"error ": "" )+" inputBox "+(props.className || "")} 
                value={props.value}
                placeholder={props.placeholder}
            />
            {props.error ? <label className={"labelError"}>{props.error}</label>:""}
            </>
}

export default Textarea