import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as UserAction from '../../Action/UserAction'
import "../style/checkout.scss"
import Inputbox from "../../Common/inputbox"
import Buttons from "../../Common/button"
import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';
import { TableRow } from '@material-ui/core';

function Profile(props) {
    
  const [state,setState] = useState({
    subtotal:0,
    grandtotal:0
  })

  useEffect(() => {
      let subtotal = 0
      let grandtotal = 0
      let cgst = 18;
      let sgst = 18;
    if(props.cartProductList.length != 0){
        props.cartProductList.map((data,i)=>{
            subtotal += data.count * data.mrp
        })
    }
    grandtotal = subtotal + cgst + sgst
    setState({
        ...state,
        subtotal,
        grandtotal
    })
  }, [props.cartProductList]);

  const onSubmit=()=>{
      console.log("onSubmit")
    if(props.submitText === "PLACE ORDER"){
        let id = props.addressList.findIndex(x=>x.selected===true)
        console.log(props.addressList[id]._id)
        console.log(id)
        props.placeOrder(props.addressList[id]._id)
        .then((res)=>{
            alert("ORDER PLACED")
        })
    }else{
        props.history.push("/Checkout")
    }
  }

    return (
            <Col xs={12} sm={8} md={9} lg={12} className={" totalCon"}>
                <Row className={"priceRow"}>
                    <Col xs={6} sm={8} md={9} lg={7} className={" textAlignRight"}>
                        <h6>
                            CART SUMMARY
                        </h6>
                    </Col>
                    <Col xs={6} sm={8} md={9} lg={5} className={" textAlignRight"}>
                        <h6>
                            2 ITEMS
                        </h6>
                    </Col>
                </Row>
                <div className={"padding"}>
                <Row className={"margin0"}>
                    <Col xs={6} sm={8} md={9} lg={7} className={" textAlignRight"}>
                        <h6>
                            SUBTOTAL
                        </h6>
                    </Col>
                    <Col xs={6} sm={8} md={9} lg={5} className={" textAlignRight"}>
                        <h6>
                        &#x20B9;{state.subtotal}
                        </h6>
                    </Col>
                </Row>
                <Row className={"margin0"}>
                    <Col xs={6} sm={8} md={9} lg={7} className={" textAlignRight"}>
                        <h6>
                            CGST
                        </h6>
                    </Col>
                    <Col xs={6} sm={8} md={9} lg={5} className={" textAlignRight"}>
                        <h6>
                        &#x20B9;18.00
                        </h6>
                    </Col>
                </Row>
                <Row className={"priceRow"}>
                    <Col xs={6} sm={8} md={9} lg={7} className={" textAlignRight"}>
                        <h6>
                            SGST
                        </h6>
                    </Col>
                    <Col xs={6} sm={8} md={9} lg={5} className={" textAlignRight"}>
                        <h6>
                        &#x20B9;18.00
                        </h6>
                    </Col>
                </Row>

                </div>
                    <Row className={"priceRow padding mhide"}>
                        <Col xs={12} sm={8} md={9} lg={7} className={" textAlignRight"}>
                            <h4>
                                GRAND TOTAL
                            </h4>
                        </Col>
                        <Col xs={12} sm={8} md={9} lg={5} className={" textAlignRight"}>
                            <h4>
                            &#x20B9;{state.grandtotal}
                            </h4>
                        </Col>
                    </Row>
                    <Row className={"mhide"}>
                        <Col xs={12} sm={12} md={12} lg={12} className={" textAlignRight"}>
                            <br/>
                            <Buttons  primary  onClick={onSubmit}
                                className={""} text={props.submitText}
                            />
                        </Col>
                    </Row>
                    <div className={"mshow dummyHeight"}></div>
                    <Col xs={12}  className={"  mshow mobileTotal"}>
                        {/* <Row className={"priceRow padding"}>
                            <Col xs={6}  className={" textAlignRight"}>
                                <h4>
                                    GRAND TOTAL
                                </h4>
                            </Col>
                            <Col xs={6} >
                                <br/>
                                <Buttons  primary 
                                    className={"width100"} text={props.submitText}
                                />
                            </Col>
                        </Row> */}
                        <Row className={"TotalBtn"}>
                            <Col xs={6}>
                                    <h6>
                                        GRAND TOTAL
                                    </h6>
                                </Col>
                                <Col xs={6}   className={" textAlignRight"}>
                                    <h6>
                                    &#x20B9;{state.grandtotal}
                                    </h6>
                                </Col>
                        </Row>
                        <Row>
                        <Buttons  primary onClick={onSubmit}
                                    className={"mobileTotalBtn"} text={props.submitText}
                                />
                        </Row>
                        
                    </Col>
            </Col>
    );
  }
  

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    cartProductList: state.userReducer.cartProductList ? state.userReducer.cartProductList : [],
    addressList: state.userReducer.addressList ? state.userReducer.addressList : [],
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

