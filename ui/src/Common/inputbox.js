import React, { useState } from 'react';
import "./common.scss"

function InputBox(props) {
    return <>
            <input 
                 pattern={props.onlyNumber ? "[0-9]*" : ".*"}
                disabled={props.disabled}
                type={props.type || ""}
                id={props.id || ""}
                onChange={e=>props.onChange(e)} 
                className={(props.error?"error ": "" )+" inputBox "+(props.className || "")} 
                value={props.value}
                //defaultValue={props.value}
                placeholder={props.placeholder}
            />
            {props.error ? <label className={"labelError"}>{props.error}</label>:""}
            </>
}

export default InputBox