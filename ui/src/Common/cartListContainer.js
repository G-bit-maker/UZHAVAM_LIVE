
import {Navbar, Nav, Container, Col, Row, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import React, { useState,useEffect } from 'react';
import session from "../session"
import * as UserAction from '../Action/UserAction'
import { ShoppingCartOutlined } from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';

import CloseIcon from '@material-ui/icons/Close';
import userimage from "../Image/product1.jpg"
import "./common.scss"

function Header(props) {
    
  const [state,setState] = useState({
    userType:session.getCookie("UserType"),
    subtotal:0
  })

  const onChange=(e)=>{
    setState({
        ...state,
        [e.target.id]:e.target.value
      })
  }

  useEffect(() => {
    props.getCartDetails()
  }, []);

  
  useEffect(() => {
        let subtotal = 0
      if(props.cartProductList.length != 0){
          props.cartProductList.map((data,i)=>{
              subtotal += data.count * data.mrp
          })
      }
      setState({
          ...state,
          subtotal
      })
    }, [props.cartProductList]);
  
    return (
        <>
            <div className={"cartListCon"}>
                <div className={"CartList"}>
                    {props.cartProductList && props.cartProductList.length != 0 ? 
                        props.cartProductList.map((data,i)=>(
                            <Col xs={12} sm={12} md={12} lg={12} className={"CartList2"}>
                            <Row>
                                <Col xs={3} sm={3} md={3} lg={3} className={"cartImgCon"} /* style={{height:"60px",position:"relative"}} */>
                                    <img className={"cartImg"} src={data.main_img || userimage}/>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={7} className={"adjustRow"}>
                                    <div className={"proName"}>{data.productName}</div>
                                    <div className={"price"}>&#x20B9;{data.mrp} x {data.count}</div>
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={2} className={"close adjustRow"}>
                                    <CloseIcon onClick={()=>props.cartUpdate(data._id,"0")} />
                                </Col>
                            </Row>
                        </Col>
                        )) :""
                    }
                        
                </div>
                <div className={"cartfooter"} onClick={()=>props.history.push("/Cart")}>
                &nbsp;Go to cart
                    <span className={"total"}>&#x20B9;{state.subtotal}</span>
                </div>
            </div>
         </>
    );
  }
  
  //export default Header
 const mapStateToProps = (state) => {
  return {
    cartProductList: state.userReducer.cartProductList ? state.userReducer.cartProductList : [],
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

