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
import session from "../session"

function OrderDetails(props) {
  const userType = session.getCookie("UserType")
    
  const [state,setState] = useState({
    uname:"",
    pass:"",
    tab:0,
    productCategory:"All"
  })


  useEffect(() => {
    const {
        match: { params }
    } = props;
    props.getOrderById(params.id,userType)
    .then((data)=>{
      setState({
        details:data
      })
    })
  }, []);

    return (
        <>
      <Header {...props} />
      <br/>

      <Container  /* fluid */ >
        <Row className={""}>
            <Col xs={12} sm={12} md={12} lg={12} className={" "}>
            <Col xs={12} sm={12} md={12} lg={12} className={" "}>
            <Row className={""}>
              <Col xs={12} sm={12} md={12} lg={8} className={"adjustRow "}>
                <h2>
                    ORDER ID # 5TRG45TTW4SERT45345 
                </h2>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} className={"textAlignRight "}>
                    <h3>14 October 2020 </h3> 
              </Col>
              </Row>
            </Col>
            </Col>
            <br/>
            <br/>
            <br/>
            <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                    <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                    <Row className={"orderCon conPad"}>
                                        <Col xs={4} sm={12} md={12} lg={12} className={"rowFlex borderBottom mb15px"}>
                                            <Col xs={4} sm={12} md={12} lg={6} className={" "}>
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
                                            <Col xs={4} sm={12} md={12} lg={6} className={" textAlignRight"}>
                                                <ButtonCus text={"ORDER AGAIN"}/>
                                            </Col>
                                        </Col>
                                        <Col sm={12} md={12} lg={6} className={"pl25px"}>
                                            <h3>Total: &#x20B9;699.99 </h3> 
                                            <h6>PENDING</h6> 
                                            <h6><a href="#">Cancel order </a></h6>
                                        </Col>
                                        <Col sm={12} md={12} lg={2} className={" "}>
                                            <h6>Delivery address</h6> 
                                            <address>
                                                <div>Candidate name,</div>
                                                <div>42/a street street,</div>
                                                <div>chennai,</div>
                                                <div>Tamilnadu 611105</div>
                                            </address>
                                        </Col> 
                                        <Col sm={12} md={12} lg={2} className={" "}>
                                            <h6>Billing address</h6> 
                                            <address>
                                                <div>Candidate name,</div>
                                                <div>42/a street street,</div>
                                                <div>chennai,</div>
                                                <div>Tamilnadu 611105</div>
                                            </address>
                                        </Col> 
                                        
                                </Row>
                        
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
)(OrderDetails)

