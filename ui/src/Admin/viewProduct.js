import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as DashboardAction from '../Action/DashboardAction'
import InputBox from "../Common/inputbox"
import Label from "../Common/label"
import Button from "../Common/button"
import "./style/products.scss"
import Product from "./products"
import UserList from "./userList"
import Header from "../Common/header"
import SubHeader from "../Common/subHeader"
import {Edit,DeleteForever} from '@material-ui/icons';

import { Container, Col, Row, Tabs, Tab, Table } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';

function ViewProduct(props) {
    
  const [state,setState] = useState({
    uname:"",
    pass:"",
    tab:0,
    removeAlert:""
  })

  const onChange=(e)=>{
    setState({
        ...state,
        [e.target.id]:e.target.value
      })
  }
  useEffect(() => {
    props.getProductList()
  }, []);

  const productRemove=(id)=>{
      setState({
        ...state,
        removeAlert:"Product remove request initiated..."
      })
      props.productRemove(id)
      .then((res)=>{
            setState({
              ...state,
              removeAlert:"Product removed successfully."
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
      <Header {...props} />
      <SubHeader  {...props} />
         

      <Container fluid>
            <Col xs={12} sm={12} md={12} lg={12} className={" adjustRow"}>
                <h4>
                    View Products
                </h4>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} className={"listContainer adjustRow"}>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Product Category</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Available Qty</th>
                    <th>Max Sale Qty</th>
                    <th>Mrp</th>
                    <th>Sgst %</th>
                    <th>Cgst %</th>
                    <th style={{width:"6%"}}>#</th>
                    </tr>
                </thead>
                <tbody>
                  {props.productList && props.productList.length != 0 ? props.productList.map((data,i)=>{
                    return <tr key={i}>
                              <td>{data.category || ""}</td>
                              <td>{data.productName || ""}</td>
                              <td>{data.brand || ""}</td>
                              <td>{data.avail_quantity || ""}</td>
                              <td>{data.max_sale_quantity || ""}</td>
                              <td>&#x20B9;{data.mrp || ""}</td>
                              <td>{data.sgst || ""}</td>
                              <td>{data.cgst || ""}</td>
                              <td>
                                  &nbsp;
                                <Edit fontSize="small"
                                  onClick={()=>props.history.push("/EditProduct/"+data._id)} 
                                  />
                                <div className={"floatRight"}>
                                  <DeleteForever fontSize="small"
                                    onClick={()=>productRemove(data._id)} 
                                />
                                &nbsp;
                                </div>
                                
                              </td>
                            </tr>
                  }) : <tr><td colspan="100%"> <div className="textAlignCenter">No data available. click <a onClick={()=>props.history.push("/AddProduct")} href="#">here</a> to add </div></td></tr> }
                </tbody>
            </Table>
            </Col>
            {state.removeAlert ? 
              <div className={"CustomAlert"}>
                  {state.removeAlert} 
                  <span onClick={()=>setState({...state,removeAlert:""})}>&times;</span>
              </div>
            :""  
            }
      </Container>
      </>
    );
  }
  

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    productList: state.dashboardReducer.productList ? state.dashboardReducer.productList : [],
    at: state.dashboardReducer.at ? state.dashboardReducer.at : "",
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

