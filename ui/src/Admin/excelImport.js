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
import ModalComp from "../Common/modal"

import { Container, Col, Row, Tabs, Tab, Table } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';
import { TableRow } from '@material-ui/core';

import XLSX from "xlsx"
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

function ExcelImport(props) {
    
  const [state,setState] = useState({
    file:"",
    tableData:"",
    failure:""
  })

  const onChange=(e)=>{
    setState({
        file:e.target.files[0]
    })
  }
  useEffect(() => {
    props.getProductList()
  }, []);

  const onSubmit=(id)=>{
    console.log(state.file);
    const reader = new FileReader();
    reader.onload = (evt) => { // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type:'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws/* ,{header:1} */);
        /* Update state */
        console.log(data);
        setState({
            tableData:data
        })
    };
    reader.readAsBinaryString(state.file);
  }
  const onUpload=(id)=>{
      setState({
        ...state,
        upLoading:true
      })    
      state.tableData.map(data=>{
           let data2 = data
          data2.pageType = "Add" 
          props.addProductDetails(data2)
          //.then(res=>{return true})
      })  
      setState({
        ...state,
        upLoading:false,
        tableData:""
      }) 
  }
  
    return (
        <>
      <Header {...props} />
      <SubHeader  {...props} />
         

      <Container fluid>
            <Col xs={12} sm={12} md={12} lg={12} className={" adjustRow"}>
                <h4>
                    Import from excel sheet
                </h4>
                <Row>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <InputBox type="file" id="file"
                            onChange={onChange} className="form-control" placeholder="SKU" 
                            //error={state.failure.file || ""}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={2} className={" mb30px"}>
                    <Button  primary onClick={onSubmit} className={""} text={"Import"} />
                </Col>
                <Col xs={12} sm={6} md={3} lg={2} className={" mb30px"}>
                    <Button loading={state.upLoading}  primary onClick={onUpload} className={""} text={"Upload"} />
                </Col>
                </Row>
            </Col>
            {state.tableData ?
            <Col xs={12} sm={12} md={12} lg={12} className={"priviewTable listContainer adjustRow"}>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Product Category</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>sku</th>
                    <th>Unit for Weight</th>
                    <th>Weight</th>
                    <th>Available Qty</th>
                    <th>Min Sale Qty</th>
                    <th>Max Sale Qty</th>
                    <th>Is in stock</th>
                    <th>Mrp</th>
                    <th>Retail Price</th>
                    <th>Whole sale Price</th>
                    <th>status</th>
                    <th>Tax Class Id</th>
                    <th>Product visible in frontend</th>
                    <th>Retail qty allowed</th>
                    <th>Wholesale qty allowed</th>
                    {/* <th style={{width:"6%"}}>#</th> */}
                    </tr>
                </thead>
                <tbody>
                  {state.tableData && state.tableData.length != 0 ? state.tableData.map((data,i)=>{
                    return <tr key={i}>
                              <td>{data.productCategory || ""}</td>
                              <td>{data.productName || ""}</td>
                              <td>{data.brand || ""}</td>
                              <td>{data.sku || ""}</td>
                              <td>{data.unitWeight || ""}</td>
                              <td>{data.weight || ""}</td>
                              <td>{data.availableSaleQty || ""}</td>
                              <td>{data.minSaleQty || ""}</td>
                              <td>{data.maxSaleQty || ""}</td>
                              <td>{data.IsStock || ""}</td>
                              <td>&#x20B9;{data.mrp || ""}</td>
                              <td>&#x20B9;{data.retailPrice || ""}</td>
                              <td>&#x20B9;{data.wholeSalePrice || ""}</td>
                              <td>{data.status || ""}</td>
                              <td>{data.taxClassId || ""}</td>
                              <td>{data.proVisible || ""}</td>
                              <td>{data.retailQtyAllowed || ""}</td>
                              <td>{data.wholsaleQtyAllowed || ""}</td>
                              {/* <td>
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
                                
                              </td> */}
                            </tr>
                  }) : <tr><td colspan="100%"> <div className="textAlignCenter">No data available </div></td></tr> }
                </tbody>
            </Table>
            </Col>
              : ""}
            {/* <ModalComp
                size={"sm"}
                title={"Are you sure?"}
                closeText={"No"}
                close={()=>setState({...state,confirmationModal:false})}
                submitText={"Yes"}
                submitLoading={state.modalLoading}
                submit={productRemoveConfirmation}
                component={
                  <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={" "}>
                          {state.modalContent}
                      </Col>
                  </Row>
                }
                show={state.confirmationModal}
            /> */}
            {/* state.removeAlert ? 
              <div className={"CustomAlert"}>
                  {state.removeAlert} 
                  <span onClick={()=>setState({...state,removeAlert:""})}>&times;</span>
              </div>
            :""  
             */}
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
)(ExcelImport)

