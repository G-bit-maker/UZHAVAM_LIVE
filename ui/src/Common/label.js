import React, { useState } from 'react';
import "./common.scss"

function Label(props) {
    return <div className={"customLabel "+props.className}>
                <span>
                    {props.text}
                </span>
            </div>
}

export default Label