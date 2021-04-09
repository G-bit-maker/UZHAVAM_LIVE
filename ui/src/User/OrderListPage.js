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

  let temp =[1,2,3,4]
    return (
        <>
      <Header {...props} />
      <br/>

      <Container  /* fluid */ >
        <Row className={""}>
            <Col xs={12} sm={12} md={12} lg={12} className={" "}>
              <Col xs={12} sm={12} md={12} lg={12} className={"adjustRow "}>
                <h2>
                  Your orders ({props.cartProductList.length || 0})
                </h2>
              </Col>
            </Col>
            <br/>
            <br/>
            <br/>
            <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                    <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                        {/* <Row className={"listCon mhide"}>
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
                        </Row> */}
                        { temp ? temp.map((data,i)=>( 
                                 <Row className={"orderCon conPad"}>
                                        <Col xs={4} sm={12} md={12} lg={6} className={" "}>
                                            <Col xs={4} sm={12} md={12} lg={12} className={" "}>
                                                <Row>
                                                    <Col xs={4} sm={12} md={12} lg={2} className={"orderImg "}>
                                                        <img width="100%" src={userimage} />
                                                    </Col>
                                                    <Col xs={4} sm={12} md={12} lg={7} className={"orderName "}>
                                                        <h5>{"Product Name"}</h5> 
                                                        <h6>2 x &#x20B9;195.00</h6> 
                                                    </Col>
                                                    <Col xs={4} sm={12} md={12} lg={3} className={" textAlignRight"}>
                                                        <br />
                                                        <h6>&#x20B9;390.00</h6> 
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={4} sm={12} md={12} lg={2} className={"orderImg "}>
                                                        <img width="100%" src={userimage} />
                                                    </Col>
                                                    <Col xs={4} sm={12} md={12} lg={7} className={"orderName "}>
                                                        <h5>{"Product Name"}</h5> 
                                                        <h6>2 x &#x20B9;195.00</h6> 
                                                    </Col>
                                                    <Col xs={4} sm={12} md={12} lg={3} className={" textAlignRight"}>
                                                        <br />
                                                        <h6>&#x20B9;390.00</h6> 
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Col>
                                        <Col sm={12} md={12} lg={6} className={"textAlignRight borderLeft"}>
                                            <h6><a href="#" onClick={()=>props.history.push("/OrderDetail")}>ORDER ID # 5TRG45TTW4SERT45345</a></h6> 
                                            <h6>14 October 2020 </h6> 
                                            <h6>Total: &#x20B9;699.99 </h6> 
                                            <h6>PENDING</h6> 
                                            <h6><a href="#">Cancel order </a></h6>
                                        </Col>
                                        {/* <Col sm={12} md={12} lg={2} className={"textAlignRight "}>
                                            <h6>To</h6> 
                                            <address>
                                                <div>Candidate name,</div>
                                                <div>42/a street street,</div>
                                                <div>chennai,</div>
                                                <div>Tamilnadu 611105</div>
                                            </address>
                                        </Col> */}
                                        
                                </Row>
                         )):
                        <Col xs={12} sm={12} md={12} lg={2} className={" textAlignRight"}>
                            <br/>
                            <br/>
                            <h6>No data found</h6>
                        </Col> }
                        
                    </Col>
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

