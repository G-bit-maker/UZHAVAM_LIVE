import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as profileAction from '../Action/DashboardAction'
import InputBox from "../Common/inputbox"
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
    uname:"",
    pass:"",
    tab:0
  })

  const onChange=(e)=>{
    setState({
        ...state,
        [e.target.id]:e.target.value
      })
  }
  useEffect(() => {
    props.getUserList()
  }, []);

  
  const tabChange=(e)=>{
        console.log(e)
    setState({
        ...state,
        tab:e
        })
    }

    const userList = [1,2,3]

    return (
          <>
          <Header {...props} />
          <SubHeader  {...props} />
              <div className="bgDesign">
                
              </div>
          <div className="">

          <Container fluid>
            <Row className={""}>
                <Col xs={12} sm={3} md={3} lg={12} className={" "}>
                <Row>
              <Col xs={12} sm={3} md={3} lg={12} className={"p20 userList"}>
                <Row>
                  {props.userList && props.userList.length != 0 ? <UserTable {...props} list={props.userList} /> : 
                  <h3 className="m10">No user found..</h3>}
                </Row>
                </Col>
                
              </Row>
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
    userList: state.dashboardReducer.userList ? state.dashboardReducer.userList : []
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

