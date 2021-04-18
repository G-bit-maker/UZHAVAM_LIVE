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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
//import CheckSharpIcon from '@material-ui/icons/CheckSharp';

function Thankyou(props) {
    
    const {
        match: { params }
    } = props;
    
  const [state,setState] = useState({
    orderId:params.id,
  })


  useEffect(() => {
     /*  setState({
        orderId:params.id
      }) */
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
              <Col xs={12} sm={12} md={12} lg={12} className={"thankyouCon mhide"}>
                            
                            <CheckCircleOutlineIcon fontSize="inherit" />
                            {/* <CheckSharpIcon fontSize="inherit" /> */}
                            
                            <h1>
                                Order Successfully Placed
                            </h1>
                            <h6 className={"dec"}>
                                Thank you for order. Our sales team will contact you soon.
                            </h6>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} className={"thankyouCon mthankcon mshow"}>
                            
                            <CheckCircleOutlineIcon fontSize="inherit" />
                            <h5>
                                Order Successfully Placed
                            </h5>
                            <h6 className={"dec"}>
                                Thank you for order. Our sales team will contact you soon.
                            </h6>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} className={"textAlignCenter "}>
                {/* <h6> */}
                    <a href={"#"} onClick={()=>props.history.push("/OrderDetail/"+state.orderId)}>
                    ORDER ID # {state.orderId.toUpperCase()}
                    </a>
                {/* </h6> */}
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
)(Thankyou)

