import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as profileAction from '../Action/DashboardAction'
import Inputbox from "../Common/inputbox"
import Label from "../Common/label"
import ButtonCus from "../Common/button"
import "./style/dashboard.scss"
import Header from "../Common/header"
import SubHeader from "../Common/subHeader"
import UserTable from "./Components/userListTable"
//import userimage from "../Image/user.jpg"

import { Container, Col, Row, Tabs, Tab, Button } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';

function Profile(props) {
    
  const [state,setState] = useState({
    failure:"",
    userName:"",
    email:"",
    mobile:"",
    gender:"Male",
    pincode:"",
    name:""
  })

  const onChange=(e)=>{
    setState({
        ...state,
        [e.target.id]:e.target.value
      })
  }
  const onSubmit=(e)=>{
    props.addUser(state)
  }
  useEffect(() => {
    const {
        match: { params }
    } = props;
    if(params.id){
        props.getUserDetails(params.id)   
        setState({
            ...state,
            userId:params.id
        })
    } 
  }, []);

  

    return (
          <>
          <Header {...props} />
          <SubHeader  {...props} />
              <div className="bgDesign">
                
              </div>
          <div className="">

          <Container fluid>
                <Col xs={12} sm={12} md={12} lg={12} className={"adjustRow disFlex"}>
                    <Col xs={12} sm={6} md={6} lg={6} className={"adjustRow"}>
                        <h4>
                            {/* props.userDetails ? "Edit user" : "Add User" */}
                            Add User
                        </h4>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className={"adjustRow textAlignRight"}>
                        <a onClick={()=>props.history.push("/ViewUser")} href="#" >
                            View users
                        </a>
                    </Col>
                </Col>
                <Row>
                    <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                        <div className="form-group">
                            <label>Name</label>
                            <span className={"mty"}>&nbsp;*</span>
                            <Inputbox type="text" id="name" 
                                value={state.name} onChange={onChange} 
                                className="form-control" placeholder="Name" 
                                error={state.failure.name || ""}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                        <div className="form-group">
                            <label>User Name</label>
                            <span className={"mty"}>&nbsp;*</span>
                            <Inputbox type="text" id="userName" 
                                value={state.userName} onChange={onChange} 
                                className="form-control" placeholder="User name" 
                                error={state.failure.userName || ""}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                        <div className="form-group">
                            <label>Email</label>
                            <span className={"mty"}>&nbsp;*</span>
                            <Inputbox type="text" id="email" 
                                value={state.email} onChange={onChange} 
                                className="form-control" placeholder="Email" 
                                error={state.failure.email || ""}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                        <div className="form-group">
                            <label>Mobile</label>
                            <span className={"mty"}>&nbsp;*</span>
                            <Inputbox type="text" id="mobile" 
                                value={state.mobile} onChange={onChange} 
                                className="form-control" placeholder="Mobile" 
                                error={state.failure.mobile || ""}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                        <div className="form-group">
                            <label>Gender</label>
                            <span className={"mty"}>&nbsp;*</span>
                            <select id="gender" value={state.gender} onChange={onChange} 
                                className={"form-control "+(state.failure.gender ? "error" : "")} >
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Other"}>Other</option>
                            </select>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                        <div className="form-group">
                            <label>Pincode</label>
                            <Inputbox type="text" id="pincode" 
                                value={state.pincode} onChange={onChange} 
                                className="form-control" placeholder="Pincode" 
                                error={state.failure.pincode || ""}
                            />
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                        <ButtonCus  loading={state.loading}  primary onClick={onSubmit} 
                                className={"AddProBtn"} text={"Submit"}
                                />
                    </Col>
                </Row>
          </Container>
          </div>
          </>
        
    );
  }
  

const mapStateToProps = (state /*, ownProps*/) => {
    console.log(state)
  return {
    userDetails: state.dashboardReducer.userDetails ? state.dashboardReducer.userDetails : "",
  }
}

const mapDispatchToProps =(dispatch)=> { 
    return bindActionCreators(
        Object.assign({}, profileAction),
        dispatch
    )
 }

export default connect(
  mapStateToProps ,
  mapDispatchToProps 
)(Profile)

