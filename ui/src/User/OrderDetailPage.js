import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as UserAction from '../Action/UserAction'
import "./style/checkout.scss"
import Header from "../Common/header"
import ModalComp from "../Common/modal"
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
  
  useEffect(() => {
    let subtotal = 0
    let grandtotal = 0
    let cgst = 18;
    let sgst = 18;
  if(props.orderDetails.products.length != 0){
    props.orderDetails.products.map((data,i)=>{
          subtotal += data.count * data.selling_price
      })
  }
  grandtotal = subtotal + cgst + sgst
  setState({
      ...state,
      subtotal,
      grandtotal
  })
}, [props.orderDetails]);


      const onAction=(act,id)=>{
        setState({
          ...state,
          confirmationModal:true,
          modalContent:`Do you want to ${act} the order?`,
          modalAction:act,
          selectedId:id
        })
      }

      const onActionSave=()=>{
        setState({
          ...state,
          modalLoading:true
        })
        props.orderStatusChange({orderId:state.selectedId,status:state.modalAction})
        .then((data)=>{
          props.getOrderById(state.selectedId,userType)
          setState({
            ...state,
            confirmationModal:false,
            modalLoading:false
          })
        })
      }


    return (
        <>
      <Header {...props} />
      <br/>

      <Container  /* fluid */ >
        {props.orderDetails ?
        <Row className={""}>
            <Col xs={12} sm={12} md={12} lg={12} className={" "}>
            <Col xs={12} sm={12} md={12} lg={12} className={" "}>
            <Row className={""}>
              <Col xs={12} sm={12} md={12} lg={8} className={"adjustRow "}>
                <h2>
                    ORDER ID # {props.orderDetails._id.orderId.toUpperCase()}
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
                                              {props.orderDetails.products.map((data=>(
                                                <Row>
                                                    <Col xs={4} sm={12} md={12} lg={2} className={"orderImg "}>
                                                        <img width="100%" src={data.main_img || userimage} />
                                                    </Col>
                                                    <Col xs={4} sm={12} md={12} lg={7} className={"orderName "}>
                                                        <h5>{"Product Name"}</h5> 
                                                        <h6>{data.count} x &#x20B9;{data.selling_price}</h6> 
                                                    </Col>
                                                    <Col xs={4} sm={12} md={12} lg={3} className={" textAlignRight"}>
                                                        <br />
                                                        <h6>&#x20B9;{data.selling_price * data.count}</h6> 
                                                    </Col>
                                                </Row>
                                              )))}
                                                
                                                {/* <Row>
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
                                                </Row> */}
                                            </Col>
                                            {/* <Col xs={4} sm={12} md={12} lg={6} className={" textAlignRight"}>
                                                <ButtonCus text={"ORDER AGAIN"}/>
                                            </Col> */}
                                        </Col>
                                        <Col sm={12} md={12} lg={6} className={"pl25px"}>
                                            <h6>{props.orderDetails._id.user.name || ""}</h6> 
                                            <h6>{props.orderDetails._id.user.mobile || ""}</h6> <br/>
                                            <h6>{props.orderDetails._id.orderStatus.toUpperCase()+(props.orderDetails._id.orderStatus === "pending" ? "" : "ED")}</h6> 
                                            {props.orderDetails._id.orderStatus === "pending" ?<h6><a  onClick={()=>onAction("Cancel",props.orderDetails._id.orderId)} href="#">Cancel order </a></h6> : ""}
                                            <h5>Subtotal: &#x20B9;{state.subtotal}</h5> 
                                            <h6>Cgst: &#x20B9;18</h6> 
                                            <h6>Sgst: &#x20B9;18</h6> 
                                            <h3>Total: &#x20B9;{state.grandtotal} </h3> 
                                        </Col>
                                        <Col sm={12} md={12} lg={2} className={" "}>
                                            <h6>Delivery address</h6> 
                                            <address>
                                                <div>{props.orderDetails._id.address.name},</div>
                                                <div>{props.orderDetails._id.address.flatno}{props.orderDetails._id.address.street},</div>
                                                <div>{props.orderDetails._id.address.city},</div>
                                                <div>{props.orderDetails._id.address.state}{props.orderDetails._id.address.pincode},</div>
                                                <div>{props.orderDetails._id.address.landmark}</div>
                                                <div>{props.orderDetails._id.address.mobile}</div>
                                                <div>GST:{props.orderDetails._id.address.gst}</div>
                                            </address>
                                        </Col> 
                                        <Col sm={12} md={12} lg={2} className={" "}>
                                            <h6>Billing address</h6> 
                                            <address>
                                                <div>{props.orderDetails._id.address.name},</div>
                                                <div>{props.orderDetails._id.address.flatno}{props.orderDetails._id.address.street},</div>
                                                <div>{props.orderDetails._id.address.city},</div>
                                                <div>{props.orderDetails._id.address.state}{props.orderDetails._id.address.pincode},</div>
                                                <div>{props.orderDetails._id.address.landmark}</div>
                                                <div>{props.orderDetails._id.address.mobile}</div>
                                                <div>GST:{props.orderDetails._id.address.gst}</div>
                                            </address>
                                        </Col> 
                                        
                                </Row>
                        
                    </Col>
            </Col>
        </Row> : 
          <h3>No data found</h3>
        }
         
         <ModalComp
                size={"sm"}
                title={"Are you sure?"}
                closeText={"No"}
                close={()=>setState({...state,confirmationModal:false})}
                submitText={"Yes"}
                submitLoading={state.modalLoading}
                submit={onActionSave}
                component={
                  <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                          {state.modalContent}
                      </Col>
                  </Row>
                }
                show={state.confirmationModal}
            />
      </Container>
      </>
    );
  }
  

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    orderDetails: state.userReducer.orderDetails ? state.userReducer.orderDetails : "",
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

