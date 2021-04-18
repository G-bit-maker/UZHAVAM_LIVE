import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as loginAction from '../Action/loginAction'
import "./style/login.scss"
import Button from "../Common/button"

import { Container, Col, Row } from 'react-bootstrap';

import React, { useState } from 'react';

function SignUP(props) {
      const [state,setState] = useState({
        failure:"",
        userName:"",
        gender:"",
        pincode:"",
        mobile:"",
        name:"",
        email:""
      })
      
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

    const signup=()=>{
      setState({
        ...state,
        loading:true,
        failure:""
      })
      props.signUp(state)
      .then((res)=>{
        setState({
          ...state,
          loading:false,
          failure:res.failure || ""
        })
      })
    }
    return (
      <div className="Loginfullpage">
      <Container>
        <Row>
          <Col className={"textAlignCenter"}>
          <Col lg={5} className={"ShadowBox p10 mt80 mb30px login"}>
              <div>
                  <h3 className={"textAlignCenter"}>Sign up</h3>

                  <div className="form-group">
                      <label>Name</label>
                      <input type="text" id="name" onChange={onChange} 
                          className={"form-control"+(state.failure.name ?" error ":"")} 
                          placeholder="Enter full name" 
                      />
                      {state.failure.email ? 
                        <label className={"labelError"}>
                          {state.failure.email}
                        </label> : 
                      ""}
                  </div>

                  <div className="form-group">
                      <label>Email</label>
                      <input type="email" id="email" onChange={onChange} 
                          className={"form-control"+(state.failure.email ?" error ":"")} 
                          placeholder="Enter email" 
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
                      <select id="gender" onChange={onChange} className="form-control">
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

                  <Button primary loading={state.loading}
                     onClick={signup}
                     className={"btn btn-dark btn-lg btn-block "} 
                     text={"SignUp"} 
                  />
                  {/* <button type="submit" className="btn btn-dark btn-lg btn-block"
                        onClick={signup} >
                          SignUp
                    </button> */}
                    <br/>
                  <p className="forgot-password mb15px">
                      Already have an <a  onClick={()=>props.history.push("/login")} href="#">Account?</a>
                  </p>
                      
                  </div>
          </Col>
          </Col>
        </Row>
         
      </Container>
      </div>
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
        Object.assign({}, loginAction),
        dispatch
    )
 }

export default connect(
  mapStateToProps ,
  mapDispatchToProps 
)(SignUP)

