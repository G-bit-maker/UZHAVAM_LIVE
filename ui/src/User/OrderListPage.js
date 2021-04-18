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


  useEffect(() => {
    props.getOrderList("User")
  }, []);

  const getTotal=(arr,type)=>{
    let Total = 0
    arr.map(data=>{
      console.log(data.selling_price , data.count,data.weight)
      Total += (type == "amount" ? (data.selling_price * data.count) : type == "qty" ? parseInt(data.count) : parseInt(data.weight))
    })
    console.log(Total)
    return Total
  }

    return (
        <>
      <Header {...props} />
      <br/>

      <Container  /* fluid */ >
        <Row className={""}>
            <Col xs={12} sm={12} md={12} lg={12} className={" "}>
              <Col xs={12} sm={12} md={12} lg={12} className={"adjustRow "}>
                <h2>
                  Your orders ({props.orderList.length || 0})
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
                        { props.orderList ? props.orderList.map((data,i)=>( 
                                 <Row className={"orderCon conPad"}>
                                        <Col xs={4} sm={12} md={12} lg={6} className={" "}>
                                            <Col xs={4} sm={12} md={12} lg={12} className={" "}>
                                                <Row>
                                                    <Col xs={4} sm={12} md={12} lg={7} className={"orderName "}>
                                                        <h4>Total Amount &#x20B9;{getTotal(data.products,"amount")}</h4> 
                                                        <h6>Total qty {getTotal(data.products,"qty")}</h6> 
                                                        <h6>Total weight {getTotal(data.products,"weight")}</h6> 
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Col>
                                        <Col sm={12} md={12} lg={6} className={"textAlignRight borderLeft"}>
                                            <h6><a href="#" onClick={()=>props.history.push("/OrderDetail/"+data._id.orderId)}>ORDER ID # {data._id.orderId.toUpperCase()}</a></h6> 
                                            <h6>14 October 2020 </h6>
                                            <h6>{data._id.orderStatus === "Pending" ? "PENDING" : data._id.orderStatus.toUpperCase()+"ED" }</h6> 
                                            { data._id.orderStatus === "Pending" ? <h6><a href="#">Cancel order </a></h6> : ""}
                                            
                                        </Col>
                                        
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
    orderList: state.userReducer.orderList ? state.userReducer.orderList : [],
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

