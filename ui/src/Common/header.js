
import {Navbar, Nav, Container, Col, Row, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import React, { useState,useEffect } from 'react';
import session from "../session"
import * as UserAction from '../Action/UserAction'
import { ShoppingCartOutlined } from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';

import CartList from "./cartListContainer"

function Header(props) {
    
  const [state,setState] = useState({
    userType:session.getCookie("UserType")
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

  const logoutAction=()=>{
    session.delteCookies()
    props.history.push("/Login")
  }

/* For popover */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("sss")
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
    return (
        <>
         <Navbar  fixed="top"  collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand onClick={()=>props.history.push("/User/Dashboard")} href="#">Uzhalavam</Navbar.Brand>
                
                {state.userType != "Admin" ? <div className={"mshow"}>
                      <Nav.Link className={"MobileCart"} eventKey={1} onClick={handleClick} variant="contained" aria-describedby={id}>
                                    
                                <Badge className={"badge "} badgeContent={props.cartList.length} >
                                    <ShoppingCartOutlined />
                                </Badge>
                            </Nav.Link>
                        <Popover
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                            >
                              <CartList {...props} />
                            </Popover>
                </div> :""}
                
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                {/* <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                <Nav>
                  {state.userType === "Admin" ? <Nav.Link href="#deets">Last seen: 21-02-2021</Nav.Link> : ""}
                  {state.userType != "Admin" ? 
                        <div className={"mhide"} >
                          <Nav.Link eventKey={1} onClick={handleClick} variant="contained" aria-describedby={id}>
                              
                              <Badge className={"badge "} badgeContent={props.cartList.length} >
                                  <ShoppingCartOutlined />
                              </Badge>
                                {/* <span>{props.cartList.length || ""}</span> */}
                          </Nav.Link>
                                  
                            <Popover
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                            >
                              <CartList {...props} />
                            </Popover>

                        </div>
                      : ""}
                  <Nav.Link eventKey={2} onClick={()=>props.history.push("/Orders")}>
                    Orders
                </Nav.Link>
                  <Nav.Link eventKey={2} onClick={logoutAction}>
                    Logout
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <div style={{height:"55px"}}>

            </div>
         </>
    );
  }
  
  //export default Header
 const mapStateToProps = (state) => {
  return {
    cartList: state.userReducer.cartList ? state.userReducer.cartList : [],
    at: state.userReducer.at ? state.userReducer.at : "",
  }
}

const mapDispatchToProps =(dispatch)=> { 
    return bindActionCreators(
        Object.assign({}, UserAction),
        dispatch
    )
 }

export default connect(
  mapStateToProps ,
  mapDispatchToProps 
)(Header) 

