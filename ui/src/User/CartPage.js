import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as UserAction from '../Action/UserAction'
import "./style/checkout.scss"
import Header from "../Common/header"
import SubHeader from "../Common/subHeader"
import CardMedia from '@material-ui/core/CardMedia';
import {Edit,DeleteForever, RowingTwoTone} from '@material-ui/icons';

import Tags from "../Common/tags"
import ButtonCus from "../Common/button"

import userimage from "../Image/product1.jpg"
import ProductContainer from "./Components/ProductContainer"

import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';
import GrandTotal from './Components/GrandTotal';
import CartProductList from './Components/CartProductList';

function Profile(props) {
    
  const [state,setState] = useState({
    uname:"",
    pass:"",
    tab:0,
    productCategory:"All"
  })

  const onChange=(e)=>{
    setState({
        ...state,
        [e.target.id]:e.target.value
      })
  }
  const selectCategory=(e)=>{
    props.getProductList(e.target.value)
  }


  useEffect(() => {
      console.log(window.innerWidth)
    props.getCartDetails()
  }, []);
  const tagActive =(data)=>{
    console.log(data)
  }
    return (
        <>
      <Header {...props} />
      <br/>

      <Container  fluid >
        <Row className={""}>
            <Col xs={12} sm={12} md={12} lg={12} className={" "}>
              <Col xs={12} sm={12} md={12} lg={12} className={"adjustRow "}>
                <h2>
                  Your cart ({props.cartProductList.length || 0})
                </h2>
              </Col>
            </Col>
            <br/>
            <br/>
            <br/>
            <Col xs={12} sm={8} md={9} lg={8} className={" "}>
                    <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                        <Row className={"listCon mhide"}>
                                <Col xs={12} sm={12} md={12} lg={6} className={" "}>
                                    <h5>Product</h5> 
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={2} className={" textAlignCenter"}>
                                    <h6>Price</h6>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={1} className={" textAlignCenter"}>
                                    <h6>Qty</h6>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={2} className={" textAlignCenter"}>
                                    <h6>Subtotal</h6>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={1} className={" textAlignRight"}>
                                    
                                </Col>
                        </Row>
                        {props.cartProductList ? props.cartProductList.map((data,i)=>(
                               <CartProductList cartUpdate={props.cartUpdate} data={data} />
                        )):
                        <Col xs={12} sm={12} md={12} lg={2} className={" textAlignRight"}>
                            <br/>
                            <br/>
                            <h6>Your cart is empty</h6>
                        </Col>}
                        
                    </Col>
            </Col>
            <Col xs={12} sm={8} md={9} lg={4} className={" "}>
                <GrandTotal
                    {...props}
                    submitText={"PROCEED TO BUY"}
                />
            </Col>
        </Row>
         
      </Container>
      </>
    );
  }
  

const mapStateToProps = (state /*, ownProps*/) => {
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
)(Profile)

