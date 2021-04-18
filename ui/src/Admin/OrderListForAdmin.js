import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as UserAction from '../Action/UserAction'
//import "./style/checkout.scss"
import Header from "../Common/header"
import SubHeader from "../Common/subHeader"
import ModalComp from "../Common/modal"
import { Container, Col, Row, Tabs,Table, Tab } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';

function OrderListForAdmin(props) {
    
  const [state,setState] = useState({
    uname:"",
    pass:"",
    tab:0,
    productCategory:"All"
  })


  useEffect(() => {
    props.getOrderList("Admin")
  }, []);

  const getTotal=(arr,type)=>{
    let Total = 0
    arr.map(data=>{
      console.log(data.selling_price , data.count,data.weight)
      Total += (type == "amount" ? (data.selling_price * data.count) : type == "qty" ? parseInt(data.count) : parseInt(data.weight))
    })
    console.log(Total)
    return Total
  }

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
      <SubHeader  {...props} />
      <br/>

      <Container   fluid  >
            <Col xs={12} sm={12} md={12} lg={12} className={" adjustRow"}>
                <h4>
                    View Orders
                </h4>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} className={"listContainer adjustRow"}>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>User Name</th>
                        <th>Mobile</th>
                        <th>Total Qty</th>
                        <th>Total weight</th>
                        <th>Total Amount</th>
                        <th>Delivery</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                  {props.orderList && props.orderList.length != 0 ? props.orderList.map((data,i)=>{
                    return <tr key={i}>
                                <td><a href={"#"} onClick={()=>props.history.push("/OrderDetail/"+data._id.orderId)}>{data._id.orderId.toUpperCase() || ""}</a></td>
                                <td><a href={"#"} onClick={()=>props.history.push("/Profile/"+data._id.user._id)}>{data._id.user.userName || ""}</a></td>
                                <td>{data._id.user.mobile || ""}</td>
                                <td>{getTotal(data.products,"qty")}</td>
                                <td>{getTotal(data.products,"weight")}</td>
                                <td>&#x20B9;{getTotal(data.products,"amount")}</td>
                                <td>{data._id.address.pincode || ""}</td>
                                {data._id.orderStatus == "Accept" ? 
                                  <td>
                                    <a href={"#"} onClick={()=>onAction("Deliver",data._id.orderId)}>Deliver</a>
                                  </td> : data._id.orderStatus == "Deliver" ? 
                                  <td>
                                    <a>Delivered</a>
                                  </td> : data._id.orderStatus == "Cancel" ? 
                                  <td>
                                    <a>Canceled</a>
                                  </td> :
                                  <td>
                                    <a href={"#"} onClick={()=>onAction("Accept",data._id.orderId)}>Accept</a>/
                                    <a href={"#"} onClick={()=>onAction("Cancel",data._id.orderId)}>Cancel</a>
                                  </td>
                                }
                                
                            </tr>
                  }) : <tr><td colspan="100%"> <div className="textAlignCenter">No data available.</div></td></tr> }
                </tbody>
            </Table>
            </Col>


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
    orderList: state.userReducer.orderList ? state.userReducer.orderList : [],
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
)(OrderListForAdmin)

