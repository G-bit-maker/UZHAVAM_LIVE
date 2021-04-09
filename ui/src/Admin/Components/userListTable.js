import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as DashboardAction from '../../Action/DashboardAction'
import Pagination from '@material-ui/lab/Pagination';
import {Edit,DeleteForever} from '@material-ui/icons';
import "../style/products.scss"

import { Container, Col, Row, Tabs, Tab, Table } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';

function ViewProduct(props) {
    
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
    //props.getProductList()
  }, []);

  const handleChange = (event, value) => {
    console.log( value)
  };


  const userRemove=(id)=>{
    setState({
      ...state,
      removeAlert:"User remove request initiated..."
    })
    props.userRemoveAct(id)
    .then((res)=>{
          setState({
            ...state,
            removeAlert:"User removed successfully."
          })
          setTimeout(()=>(
            setState({
              ...state,
              removeAlert:""
            })
          ), 5000)
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th style={{width:"6%"}}>#</th>
                    </tr>
                </thead>
                <tbody>
                {props.list.map((data,i)=>{
                    return <tr key={i}>
                              <td>{data.userName || ""}</td>
                              <td>{data.email || ""}</td>
                              <td>{data.mobile || ""}</td>
                              <td>{data.gender || ""}</td>
                              <td>{data.address1 + (data.address2 && data.address1 ? ", " : "")+ data.address2}</td>
                              <td>Pending</td>
                              <td>
                                  &nbsp;
                                <Edit fontSize="small"
                                  onClick={()=>props.history.push("/EditUser/"+data._id)} 
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
                <Col xs={12} sm={12} md={12} lg={12} className={" adjustRow"}>
                    <Pagination className={"floatRight"} count={10} onChange={handleChange} />
                </Col>
            </Col>

            {state.removeAlert ? 
              <div className={"CustomAlert"}>
                  {state.removeAlert} 
                  <span onClick={()=>setState({...state,removeAlert:""})}>&times;</span>
              </div>
            :""  
            }
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

