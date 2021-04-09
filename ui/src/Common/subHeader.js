
import {Navbar, Nav, Container, Col, Row, Tabs, Tab } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';
import session from "../session"
import { useHistory } from "react-router-dom";

const JsonData = require("./subHeaderData.json")

function Header(props) {
  let history = useHistory();
    
  const [state,setState] = useState({
    uname:"",
    pass:"",
    tab:0
  })

  const onChange=(e)=>{
    setState({
        ...state,
        [e.target.id]:e.target.value
      })
  }
  useEffect(() => {
    //props.getUserDetails({userId:"5fe6338648dbce25f84702b9"})
  }, []);

  
  const tabChange=(e)=>{
        console.log(e)
    setState({
        ...state,
        tab:e
        })
    }

    
  
  const subHeaderIteration = array =>{
    return <ul className="sul">
        {array.map((data,i)=>{
          return (<li className="sli" key={i}>
                    <a onClick={()=>history.push(data.url)}>
                    {data.name}
                    </a>
                    {data.subHeader ? subHeaderIteration(data.subHeader): ""}
                  </li>)
            })}
            </ul>
  }

    return (
        <>
            <div className="subHeaderCon">
               <ul  className="ul">
                 {JsonData[session.getCookie("UserType")].map((data,i)=>{
                   return (<li className="li" key={i}>
                            <a onClick={()=>history.push(data.url)} className={"a"}>
                              {data.name}
                            </a>
                            
                            {data.subHeader ? subHeaderIteration(data.subHeader) : ""}
                          </li>)
                 })}
                 </ul>
              </div>   
         </>
    );
  }
  
  export default Header
