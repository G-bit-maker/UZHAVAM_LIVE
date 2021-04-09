import React, { useState } from 'react';
import "./common.scss"
import "font-awesome/css/font-awesome.min.css";

function Buttons(props) {
    return <button disabled={props.loading?true:false}
                onClick={()=>props.onClick()} 
                className={ (props.className || "") +
                            (props.primary?" primaryBtn ":" SecondryBtn ")
                            //(props.loading? "btnDisable ": "" ) 
                           }
            >
                {props.loading?<i className="fa fa-spinner fa-spin loadingPad" />:""}
                <span className={props.loading?"loadingPadText":""}>
                    { props.text}
                </span>
            </button>
}

export default Buttons