import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as DashboardAction from '../../Action/DashboardAction'
import Pagination from '@material-ui/lab/Pagination';
import {Edit,DeleteForever} from '@material-ui/icons';
import "../style/products.scss"
import ModalComp from "../../Common/modal"

import { Container, Col, Row, Tabs, Tab, Table } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';

function ViewProduct(props) {
    
  const [state,setState] = useState({
    confirmationModal:false,
    modalLoading:false,
  })

  const onChange=(e)=>{
    setState({
        ...state,
        [e.target.id]:e.target.value
      })
  }
  useEffect(() => {
    //props.getProductList()
  }, []);



  const userRemove=(id)=>{
      setState({
        ...state,
        selectedId:id,
        modalContent:"Do you really want to remove this user?",
        confirmationModal:true
      })
    }
  const userRemoveConfirmation=()=>{
    setState({
      ...state,
      modalLoading:true
    })
    props.userRemoveAct(state.selectedId)
    .then((res)=>{
          setState({
            ...state,
            modalLoading:false,
            confirmationModal:false
          })
        })
    }

    return (
        <>
        <Col xs={12} sm={12} md={12} lg={12} className={" adjustRow"}>
                <h4>
                    Manage Users
                </h4>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} className={"listContainer adjustRow"}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Gender</th>
                    <th>Pincode</th>
                    <th style={{width:"6%"}}>#</th>
                    </tr>
                </thead>
                <tbody>
                {props.list.map((data,i)=>{
                    return <tr key={i}>
                              <td>{data.userName || ""}</td>
                              <td>{data.email || ""}</td>
                              <td>{data.name || ""}</td>
                              <td>{data.mobile || ""}</td>
                              <td>{data.gender || ""}</td>
                              <td>{data.pincode || ""}</td>
                              <td>
                                  &nbsp;
                                <Edit fontSize="small"
                                  onClick={()=>props.history.push("/Profile/"+data._id)}
                                  />
                                <div className={"floatRight"}>
                                  <DeleteForever fontSize="small"
                                    onClick={()=>userRemove(data._id)} 
                                />
                                &nbsp;
                                </div>
                                
                              </td>
                            </tr>
                }) }
                </tbody>
            </Table>
               {/*  <Col xs={12} sm={12} md={12} lg={12} className={" adjustRow"}>
                    <Pagination className={"floatRight"} count={10} onChange={handleChange} />
                </Col> */}
            </Col>
                
            <ModalComp
                size={"sm"}
                title={"Are you sure?"}
                closeText={"No"}
                close={()=>setState({...state,confirmationModal:false})}
                submitText={"Yes"}
                submitLoading={state.modalLoading}
                submit={userRemoveConfirmation}
                component={
                  <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                          {state.modalContent}
                      </Col>
                  </Row>
                }
                show={state.confirmationModal}
            />
            {/* state.removeAlert ? 
              <div className={"CustomAlert"}>
                  {state.removeAlert} 
                  <span onClick={()=>setState({...state,removeAlert:""})}>&times;</span>
              </div>
            :""  
             */}
      </>
    );
  }
  

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    productList: state.dashboardReducer.productList ? state.dashboardReducer.productList : []
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
)(ViewProduct)

