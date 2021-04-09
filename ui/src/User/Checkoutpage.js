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
import AddressList from './Components/AddressList';
import GrandTotal from './Components/GrandTotal';

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
    props.getCartDetails()
  }, []);
  const tagActive =(data)=>{
    console.log(data)
  }
  let temmpdata =[1,2,3,4,4]
    return (
        <>
      <Header {...props} />
      <br/>

      <Container  fluid >
        <Row className={""}>
            <Col xs={12} sm={12} md={12} lg={12} className={" "}>
              <Col xs={12} sm={12} md={12} lg={12} className={"adjustRow "}>
                <h2>
                  Check out
                </h2>
              </Col>
            </Col>
            <br/>
            <br/>
            <br/>
            <Col xs={12} sm={8} md={8} lg={8} className={" "}>
                    <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                        <h4>Where would you like us to deliver?</h4>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                        <AddressList />
                    </Col>
            </Col>
            {/* <Col xs={12} sm={8} md={9} lg={4} className={" mhide"}>
                <h5 className={""}>YOUR CART ({props.cartProductList.length})</h5> 
                    {props.cartProductList ? props.cartProductList.map((data,i)=>(
                            <Row className={"listCon conPad"}>
                                    <Col xs={12} sm={12} md={12} lg={4} className={" "}>
                                        <img width="100%" src={userimage} />
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={5} className={" "}>
                                        <h5>{data.productName}</h5> 
                                        <h6>Qty:{data.count}</h6>sku:{data.SKU}
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={2} className={" textAlignRight"}>
                                        <h6>&#x20B9;{data.count * data.mrp}</h6>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={1} className={" textAlignRight"}>
                                         X
                                    </Col>
                            </Row>
                    )):
                        <Col xs={12} sm={12} md={12} lg={2} className={" textAlignRight"}>
                            <br/>
                            <br/>
                            <h6>Your cart is empty</h6>
                        </Col>
                    }
            </Col> */}
            <Col xs={12} sm={8} md={4} lg={4} className={" "}>
                <GrandTotal 
                    {...props}
                    submitText={"PLACE ORDER"}
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

