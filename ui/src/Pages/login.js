import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as loginAction from '../Action/loginAction'
import "./style/login.scss"
import Button from "../Common/button"

import { Container, Col, Row } from 'react-bootstrap';

import React, { useState } from 'react';

function App(props) {

  const [state,setState] = useState({
    uname:"",
    pass:"",
    loading:false,
    failure:""
  })

  const onChange=(e)=>{
    setState({
        ...state,
        [e.target.id]:e.target.value
      })
  }

  const login=()=>{
    setState({
      ...state,
      loading:true,
      failure:""
    })
    props.login({userName:state.uname,password:state.pass})
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
          <Col lg={5} className={"ShadowBox p10 mt80 login"}>
              <div>
              <h3 className={"textAlignCenter"}>Log in</h3>

              <div className="form-group">
                  <label>Email</label>
                  <input type="email" id="uname" onChange={onChange} 
                    className={"form-control"+(state.failure.emailFailure ?" error ":"")} 
                    placeholder="Enter email" />
                    {state.failure.emailFailure ? 
                      <label className={"labelError"}>
                        {state.failure.emailFailure}
                      </label> : 
                    ""}
              </div>

              <div className="form-group">
                  <label>Password</label>
                  <input type="password" id="pass" onChange={onChange} 
                    className={"form-control"+(state.failure.passFailure ?" error ":"")} 
                    placeholder="Enter password" />
                    {state.failure.passFailure ? 
                      <label className={"labelError"}>
                        {state.failure.passFailure}
                      </label> : 
                    ""}
              </div>

              <div className="form-group">
                  <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" />
                      <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                  </div>
              </div>
              <Button primary loading={state.loading}
                     onClick={login}
                     className={"btn btn-dark btn-lg btn-block "} 
                     text={"Login"} 
                  />
              {/* <button type="submit" className="btn btn-dark btn-lg btn-block"
                    onClick={()=>props.login({userName:state.uname,password:state.pass})} >
                      Login
                </button> */}
                <br/>
              <p className="forgot-password text-right">
                  <a onClick={()=>props.history.push("/signUp")} href="#">Sign up</a>
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
)(App)

