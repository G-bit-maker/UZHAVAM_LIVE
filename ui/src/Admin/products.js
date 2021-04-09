import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as DashboardAction from '../Action/DashboardAction'
import InputBox from "../Common/inputbox"
import Label from "../Common/label"
import ButtonCus from "../Common/button"
import "./style/dashboard.scss"
import userimage from "../Image/product1.jpg"

import { Container, Col, Row, Tabs, Tab, Button } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';

function Profile(props) {
    
  const [state,setState] = useState({
    productName: "",
    productType: "",
    quantity: "",
    rate: "",
    tab:0
  })

  const onChange=(e)=>{
      let id = e.target.id
      const re = /^[0-9\b]+$/;
      if(id === "rate" || id === "quantity"){
          if(re.test(e.target.value) || e.target.value===""){
               setState({
                    ...state,
                    [e.target.id]:e.target.value 
                })
          }
      }else{
          setState({
              ...state,
              [e.target.id]:e.target.value
            })
      }
  }
  useEffect(() => {
    props.getProductlist()
  }, []);

  
  const tabChange=(e)=>{
        console.log(e)
    setState({
        ...state,
        tab:e
        })
    }

const ProductAddEdit=()=>{
    let obj = {
        productName:state.productName,
        productType:state.productType,
        quantity:state.quantity,
        rate:state.rate
    }
    console.log(obj)
    props.addProduct(obj)
    .then(data=>{
        if(data.success){
            setState({
                ...state,
                productName: "",
                productType: "",
                quantity: "",
                rate: "",
            })
        }        
    })
}

    return (
        <Row>
         <Col xs={12} sm={3} md={3} lg={4} className={"p20 "}>
              <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" id="productName" value={state.productName} onChange={onChange} className="form-control" placeholder="Enter product name" />
              </div>

              <div className="form-group">
                <label>Type</label>
                  <input type="text" id="productType" value={state.productType} onChange={onChange} className="form-control" placeholder="Enter type" />
              </div>

              <div className="form-group">
                  <label>Rate</label>
                  <input type="text" id="rate" value={state.rate} onChange={onChange} className="form-control" placeholder="Enter rate" />
              </div>

              <div className="form-group">
                  <label>Quantity</label>
                  <input type="text" id="quantity" value={state.quantity} onChange={onChange} className="form-control" placeholder="Enter quantity" />
              </div>

              <div className="form-group">
                  <label>Image</label>
                  <input type="file" id="proImage" onChange={onChange} className="form-control" placeholder="Enter product name" />
              </div>
            <Button 
                onClick={ProductAddEdit}
                 className={"floatRight"}
                  variant="outline-dark">
                      Add
            </Button>
         </Col>
         <Col xs={12} sm={3} md={3} lg={8} className={"p20 "}>
         <Row>
         {props.productData ? props.productData.map(data=>{
               return <Col xs={12} sm={3} md={3} lg={12} className={"p20 productcon"}>
                            <div className={"ShadowBox "}>
                                <Row>
                                    <Col xs={12} sm={3} md={3} lg={3} className={""}>
                                            <div className="Imagecon">
                                                <img src={userimage} />
                                            </div>
                                    </Col>
                                    <Col xs={12} sm={3} md={3} lg={9} className={"adjustRow"}>
                                            <div className="p20 ">
                                                <div>
                                                    <span className="proName">
                                                        Product name
                                                    </span>
                                                <span className={"floatRight procreated"}>
                                                    30-01-2020
                                                </span>
                                                </div>
                                                <div className="">
                                                <span>
                                                    Type
                                                </span>
                                                </div>
                                                <div className="">
                                                <span className="proRate">
                                                    Rs 10
                                                </span>
                                                <span>
                                                    {" - "}
                                                </span>
                                                <span>
                                                    13 qty
                                                </span>
                                                </div>
                                                <div>
                                                <span className={"proDec"}>
                                                    This is the description This is the description This is the description This is the description 
                                                </span>
                                                </div>
                                            </div>
                                            
                                    </Col>
                                </Row>
                            </div>
                        </Col>
         }):""}
         </Row>
         </Col>
         
      </Row>
    );
  }
  

const mapStateToProps = (state /*, ownProps*/) => {
    console.log(state)
  return {
    counter: state.counter
  }
}

const mapDispatchToProps =(dispatch)=> { 
    return bindActionCreators(
        Object.assign({}, DashboardAction),
        dispatch
    )
 }

export default connect(
  mapStateToProps ,
  mapDispatchToProps 
)(Profile)

