import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap';
import * as UserAction from '../../Action/UserAction'
import Inputbox from "../../Common/inputbox"

import { useState,useEffect } from 'react';
import "../style/checkout.scss"
import ModalComp from '../../Common/modal';
import { propTypes } from 'react-bootstrap/esm/Image';
import session from "../../session"


function AddressList(props) {

    const userType = session.getCookie("UserType")

  const data=props.data
  const [state,setState] = useState({
    addNew:false,
    editStatus:false,

    name:"",
    flatno:"",
    street:"",
    landmark:"",
    city:"",
    state:"",
    pincode:"",
    mobile:"",
    isGst:false,
    gst:"",
    addressId:"",
    failure:"",
    addressList:""
  })

  const addNewModal=(flag,i)=>{
    //let i = j != "" || j != undefined ? j : "" 
    console.log(flag,i)
    console.log(props.addressList[i])
    let empty = {
      name: i !== "" ? props.addressList[i].name : "",
      flatno: i !== "" ? props.addressList[i].flatno : "",
      street: i !== "" ? props.addressList[i].street : "",
      city: i !== "" ? props.addressList[i].city : "",
      landmark: i !== "" ? props.addressList[i].landmark : "",
      state: i !== "" ? props.addressList[i].state : "",
      pincode: i !== "" ? props.addressList[i].pincode : "",
      mobile: i !== "" ? props.addressList[i].mobile : "",
      isGst: i !== "" && props.addressList[i].gst? true : false,
      gst: i !== "" ? props.addressList[i].gst : "",
      addressId: i !== "" ? props.addressList[i]._id : "",
      failure:""
    }
    console.log(empty)
    let data = flag ? empty : state
      data.failure = ""
      data.addNew = flag
      data.isGst = data.gst ? true : false
   console.log(data)
    setState({
       ...data,
       editStatus:props.addressList[i] ? true : false
    })
  }

  
  const onChange=(e)=>{
    console.log(state)
    if(e.target.validity.valid){
        setState({
              ...state,
              [e.target.id]:e.target.value
          })
          
      }
}
 const gstOnChange=(e)=>{
    setState({
        ...state,
        isGst:e.target.checked,
        gst:e.target.checked ? state.gst : ""
      })
} 


  useEffect(()=>{
    props.getAddressList()
  },[])


  const saveAddress=()=>{
    console.log(state)
    props.addressSave(state)
    .then((data)=>(
      setState({
        ...state,
        addNew:data.failure ? true : false,
        failure:data.failure || ""
      })
    ))
  }

  const onSelect=(ind)=>{
        let addressList = props.addressList
        addressList.map((data,i)=>{
            if(i === ind){
                console.log(i,ind)
                addressList[i].selected =true
            }else{
                addressList[i].selected =false
            }
        })
        props.addressSelect(addressList)
  }

  return (
    <>
            <Row className={"AddressList"}>
                  {props.addressList ? props.addressList.map((data,i)=>(
                    <Col xs={12} sm={12} md={12} lg={4} className={"p10 "} onClick={()=>onSelect(i)}>
                        <div className={"con "}>
                            <div>{data.name},</div>
                            <div>{data.flatno}{data.street},</div>
                            <div>{data.city},</div>
                            <div>{data.state} {data.pincode}</div>
                            <div>{data.landmark}</div>
                            <div>+91 {data.mobile}</div>
                            {data.gst ? <div>GST: {data.gst}</div> : ""}
                            {userType === "User" ?<div className={"floatRight edit"} onClick={()=>addNewModal(true,i)}>Edit</div> : ""}
                            
                            {props.select ?
                            <div className={"floatRight select"} >
                                <input type={"checkbox"} checked={data.selected} onClick={()=>onSelect(i)} />
                            </div> :""}
                        </div>
                    </Col>
                  )):""}
                    {userType === "User" ?
                    <Col xs={12} sm={12} md={12} lg={4} className={"p10 "}>
                        <div className={"con "} onClick={()=>addNewModal(true,"")}>
                            <div className={"plus mhide textAlignCenter"}>+</div>
                            <div className={"textAlignCenter"}>Add new Address</div>
                        </div>
                    </Col> : ""}
            </Row>
            <ModalComp
                title={state.editStatus ? "Edit" : "Add new"}
                closeText={"Close"}
                close={()=>addNewModal(false,"")}
                submitText={"Save"}
                submit={saveAddress}
                component={
                  <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                          <div className="form-group">
                              <label>Name</label>
                              <span className={"mty"}>&nbsp;*</span>
                              <Inputbox type="text" id="name" 
                                  value={state.name} onChange={onChange} 
                                  className="form-control" placeholder="Your full name" 
                                  error={state.failure.name || ""}
                              />
                          </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className={" "}>
                          <div className="form-group">
                              <label>House/Flat no.</label>
                              <span className={"mty"}>&nbsp;*</span>
                              <Inputbox type="text" id="flatno" 
                                  value={state.flatno} onChange={onChange} 
                                  className="form-control" placeholder="House/Flat no." 
                                  error={state.failure.flatno || ""}
                              />
                          </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className={" "}>
                          <div className="form-group">
                              <label>Street/Village</label>
                              <span className={"mty"}>&nbsp;*</span>
                              <Inputbox type="text" id="street" 
                                  value={state.street} onChange={onChange} 
                                  className="form-control" placeholder="Street/Village" 
                                  error={state.failure.street || ""}
                              />
                          </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className={" "}>
                          <div className="form-group">
                              <label>City</label>
                              <span className={"mty"}>&nbsp;*</span>
                              <Inputbox type="text" id="city" 
                                  value={state.city} onChange={onChange} 
                                  className="form-control" placeholder="City" 
                                  error={state.failure.city || ""}
                              />
                          </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className={" "}>
                          <div className="form-group">
                              <label>State</label>
                              <span className={"mty"}>&nbsp;*</span>
                              <Inputbox type="text" id="state" 
                                  value={state.state} onChange={onChange} 
                                  className="form-control" placeholder="State" 
                                  error={state.failure.state || ""}
                              />
                          </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className={" "}>
                          <div className="form-group">
                              <label>Pincode</label>
                              <span className={"mty"}>&nbsp;*</span>
                              <Inputbox type="text" id="pincode" 
                                  value={state.pincode} onChange={onChange} 
                                  className="form-control" placeholder="Pincode" 
                                  error={state.failure.pincode || ""}
                                  onlyNumber
                              />
                          </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className={" "}>
                          <div className="form-group">
                              <label>Landmark</label>
                              <Inputbox type="text" id="landmark" 
                                  value={state.landmark} onChange={onChange} 
                                  className="form-control" placeholder="landmark" 
                                  error={state.failure.landmark || ""}
                              />
                          </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className={" "}>
                          <div className="form-group">
                              <label>Mobile</label>
                              <Inputbox type="text" id="mobile" 
                                  value={state.mobile} onChange={onChange} 
                                  className="form-control" placeholder="Mobile" 
                                  error={state.failure.mobile || ""}
                                  onlyNumber
                              />
                          </div>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className={" "}>
                          <div className="form-group">
                              <label>GST require</label>&nbsp;&nbsp;&nbsp;&nbsp;
                              
                                  <label class="switch">
                                      <input onChange={gstOnChange}  
                                          checked={state.isGst}
                                          type="checkbox"  
                                      />
                                      <span class="slider round"></span>
                                  </label>
                                  
                              <Inputbox type="text" id="gst" 
                                  disabled={!state.isGst}
                                  value={state.gst} onChange={onChange} 
                                  className="form-control" placeholder="GST Number" 
                                  error={state.failure.gst || ""}
                                  onlyNumber
                              />
                              
                          </div>
                      </Col>
                  </Row>
                  
                  /* <AddAddress data={state.dataOnChange} dataOnChange={dataOnChange}/> */
                }
                show={state.addNew}
            />
        </>
  );
}


const mapStateToProps = (state /*, ownProps*/) => {
  return {
    addressList: state.userReducer.addressList ? state.userReducer.addressList : [],
    at: state.userReducer.at ? state.userReducer.at : "",
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
)(AddressList)