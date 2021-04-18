import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as UserAction from '../Action/UserAction'
import "./style/dashboard.scss"
import Header from "../Common/header"
import Button from "../Common/button"
import SubHeader from "../Common/subHeader"

import Tags from "../Common/tags"

import ProductContainer from "./Components/ProductContainer"

import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { FormatListBulletedRounded } from '@material-ui/icons';
import AddressList from './Components/AddressList';
import session from "../session"

function Profile(props) {
    const userType = session.getCookie("UserType")
    const [state,setState] = useState({
      failure:"",
      userName:"",
      gender:"Male",
      pincode:"",
      mobile:"",
      email:"",
      name:"",
    })
       
  useEffect(() => {
    const {
        match: { params }
    } = props;
    props.getProfileDetail(params.id === "MyProfile" ? "" : params.id || "")
    setState({
        ...state,
        userId:params.id === "MyProfile" ? "" : params.id || ""
    })
  }, []);
  /* useEffect(() => {
    setState({
        ...state,
        //_id:props.profileDetails._id ? props.profileDetails._id :"",
        userName:props.profileDetails.userName ? props.profileDetails.userName :"",
        gender:props.profileDetails.gender ? props.profileDetails.gender :"",
        pincode:props.profileDetails.pincode ? props.profileDetails.pincode :"",
        mobile:props.profileDetails.mobile ? props.profileDetails.mobile :"",
        email:props.profileDetails.email ? props.profileDetails.email :"",
        name:props.profileDetails.name ? props.profileDetails.name :"",
    })
  }, [props.profileDetails]); */

  const onChange=(e)=>{
    let id = e.target.id
    const re = /^[0-9\b]+$/;
    if((id === "pincode" && e.target.value.length > 6) || (id === "mobile" && e.target.value.length > 10)){
      return false
    }
    if(id === "mobile" || (id === "pincode" && e.target.value && e.target.value.length < 7)){
        if(re.test(e.target.value) || e.target.value==="" ){
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

 const onProfileEdit=()=>{
     setState({
         ...state,
        profileEdit:true,
        userName:props.profileDetails.userName ? props.profileDetails.userName :"",
        gender:props.profileDetails.gender ? props.profileDetails.gender :"",
        pincode:props.profileDetails.pincode ? props.profileDetails.pincode :"",
        mobile:props.profileDetails.mobile ? props.profileDetails.mobile :"",
        email:props.profileDetails.email ? props.profileDetails.email :"",
        name:props.profileDetails.name ? props.profileDetails.name :"",
     })
 }
 const onProfileSave=()=>{
    setState({
       ...state,
       profileEditLoading:true
    })
     props.onProfileDetailsSave({
        userId:state.userId ? state.userId :"",
        userName:state.userName ? state.userName :"",
        gender:state.gender ? state.gender :"",
        pincode:state.pincode ? state.pincode :"",
        mobile:state.mobile ? state.mobile :"",
        email:state.email ? state.email :"",
        name:state.name ? state.name :"",
     })
     .then((res)=>{
         setState({
            ...state,
            profileEdit:false,
            profileEditLoading:false
         })
     })
 }

    return (
        <>
      <Header {...props} />{console.log(state)}
      {userType === "Admin" ?<SubHeader {...props} /> : ""}
      <br/>
      <br/>

      <Container /* fluid */>
        <Row className={""}>
            {props.profileDetails ?
            <Col xs={12} sm={4} md={4} lg={4} className={" "}>
                {
                    state.profileEdit ? 
                     
                            <div>

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" id="name" onChange={onChange} 
                                    className={"form-control"+(state.failure.name ?" error ":"")} 
                                    placeholder="Enter full name" 
                                    value={state.name}
                                />
                                {state.failure.name ? 
                                <label className={"labelError"}>
                                    {state.failure.name}
                                </label> : 
                                ""}
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" id="email" onChange={onChange} 
                                    className={"form-control"+(state.failure.email ?" error ":"")} 
                                    placeholder="Enter email" 
                                    value={state.email}
                                />
                                {state.failure.email ? 
                                <label className={"labelError"}>
                                    {state.failure.email}
                                </label> : 
                                ""}
                            </div>

                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" id="userName" onChange={onChange} 
                                    className={"form-control"+(state.failure.userName ?" error ":"")} 
                                    placeholder="Enter user name" 
                                    value={state.userName}
                                />
                                {state.failure.userName ? 
                                <label className={"labelError"}>
                                    {state.failure.userName}
                                </label> : 
                                ""}
                            </div>

                            <div className="form-group">
                                <label>Mobile</label>
                                <input type="text" id="mobile" onChange={onChange} 
                                    value={state.mobile}
                                    className={"form-control"+(state.failure.mobile ?" error ":"")} 
                                    placeholder="Enter mobile number"
                                />
                                {state.failure.mobile ? 
                                <label className={"labelError"}>
                                    {state.failure.mobile}
                                </label> : 
                                ""}
                            </div>

                            <div className="form-group">
                                <label>Gender</label>
                                <select id="gender" value={state.gender} onChange={onChange} className="form-control">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Pincode</label>
                                <input type="text" id="pincode" onChange={onChange} 
                                value={state.pincode}
                                className={"form-control"+(state.failure.pincode ?" error ":"")}  
                                placeholder="Pincode" />
                                {state.failure.pincode ? 
                                    <label className={"labelError"}>
                                    {state.failure.pincode}
                                    </label> : 
                                ""}
                            </div>
                            <br/>
                            <Button loading={state.profileEditLoading} primary text="Save" onClick={onProfileSave}  className={"width100 mb5px"} />
                            <Button loading={false} text="Cancel" onClick={()=>setState({...state,profileEdit:false})}  className={"width100 "} />
                                
                        </div> : 
                         
                        <div>
                        {props.profileDetails.name ? 
                        <div className="form-group">
                            <label>Name</label>
                            <h6>{props.profileDetails.name}</h6>
                        </div>: ""}
                        {props.profileDetails.email ? 
                        <div className="form-group">
                            <label>Email</label>
                            <h6>{props.profileDetails.email}</h6>
                        </div>: ""}
                        {props.profileDetails.userName ?
                        <div className="form-group">
                            <label>User Name</label>
                            <h6>{props.profileDetails.userName}</h6>
                        </div> : ""}
                        {props.profileDetails.mobile ?
                        <div className="form-group">
                            <label>Mobile</label>
                            <h6>{props.profileDetails.mobile}</h6>
                        </div> : ""}
                        {props.profileDetails.gender ?
                        <div className="form-group">
                            <label>Gender</label>
                            <h6>{props.profileDetails.gender}</h6>
                        </div> : ""}
                        {props.profileDetails.pincode ?
                        <div className="form-group">
                            <label>Pincode</label>
                            <h6>{props.profileDetails.pincode}</h6>
                        </div> : ""}
                        <br/>
                        <Button loading={false} primary text="Edit" onClick={onProfileEdit}  className={"width100 mb5px"} />
                            
                    </div>
                }
            </Col> : 
            <Col xs={12} sm={4} md={4} lg={4} className={" "}>
                <h3>No profile found</h3>
            </Col>
            }
            <Col xs={12} sm={6} md={6} lg={8} className={" "}>
              <AddressList select={false} />
            </Col>
        </Row>
      </Container>
      </>
    );
  }
  

const mapStateToProps = (state /*, ownProps*/) => {
    console.log(state)
  return {
    profileDetails: state.userReducer.profileDetails ? state.userReducer.profileDetails : "",
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

