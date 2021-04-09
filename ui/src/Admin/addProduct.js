import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as DashboardAction from '../Action/DashboardAction'
import "./style/products.scss"
import Product from "./products"
import UserList from "./userList"
import Button from "../Common/button"
import Inputbox from "../Common/inputbox"
import TextArea from "../Common/textArea"
import Header from "../Common/header"
import SubHeader from "../Common/subHeader"
import ImageEdit from "./Components/ProImageEdit"

import { Container, Col, Row, Tabs, Tab, Table } from 'react-bootstrap';

import React, { useState,useEffect, useCallback } from 'react';

 import createHistory from "history/createBrowserHistory";
const history = createHistory({
    forceRefresh: true
}); 

function AddProduct(props) {
    
  const [state,setState] = useState({
        product_id:"",
        productName:"",
        brand:"",
        productCategory:"",
        sku:"",
        shortDec:"",
        description:"",
        productFeatures:"",
        ProductSpec:"",
        unitWeight:"",
        weight:"",
        availableSaleQty:"",
        minSaleQty:"",
        maxSaleQty:"",
        IsStock:"No",
        mrp:"",
        sellingPrice:"",
        specialPrice:"",
        discount:"",
        discountAmt:"",
        status:"Active",
        mainImg:"",
        img2:"",
        img3:"",
        img4:"",
        img5:"",
        smallimg:"",
        thumimg:"",
        taxClassId:"",
        cgstp:"",
        igstp:"",
        sgstp:"",
        cgstamt:"",
        igstamt:"",
        sgstamt:"",
        groupid:"",
        metakey:"",
        proVisible:"No",
        country:"INDIA",
        ean:"",
        retailQtyAllowed:"",
        wholsaleQtyAllowed:"",

        loading:false,
        failure:"",
        pageType:"Add"
    })
    const costumLogic=(e)=>{
        let state2 = {...state,[e.target.id]:e.target.value}
        setState({
            ...state,
            [e.target.id]:e.target.value,
            discountAmt:(state2.mrp - state2.specialPrice),
            cgstp:(state2.taxClassId / 2),
            sgstp:(state2.taxClassId / 2),
            cgstamt:(state2.sellingPrice * state2.cgstp),
            sgstamt:(state2.sellingPrice * state2.sgstp)
        })
    }
    const onChange=(e)=>{
        console.log(e.target.validity.valid)
        if(e.target.validity.valid){
            let id = e.target.id

            if(
                id === "mrp" ||
                id === "specialPrice" ||
                id === "taxClassId" ||
                id === "sellingPrice" /* ||
                id === "cgstp" ||
                id === "sgstp"  */
            ){
                costumLogic(e)
            }else{
                setState({
                    ...state,
                    [e.target.id]:e.target.value
                })
            }


            
            
        }
    }
    const imgonChange=(id,val)=>{
        console.log(id,val)
        setState({
            ...state,
            [id]:val
        })
    }
    useEffect(() => {
        props.getCategory()
    }, []);

     useEffect(() => {
        const {
            match: { params }
        } = props;
        props.getProductDetails(params.id)
    }, [props.match]);  

    useEffect( () => {
        console.log(props.productDetails);
        let details = props.productDetails
        //if(props.productDetails){
            setState({
                ...state,
                product_id:details._id || "",
                pageType:details._id ? "Edit":"Add",
                productName:details.productName || "",
                brand:details.brand || "",
                productCategory:details.category || "",
                sku:details.SKU || "",
                shortDec:details.shortdescription || "",
                description:details.description || "",
                productFeatures:details.features || "",
                ProductSpec:details.specs || "",
                unitWeight:details.unit_for_weight || "",
                weight:details.weight || "",
                availableSaleQty:details.avail_quantity || "",
                minSaleQty:details.min_sale_quantity || "",
                maxSaleQty:details.max_sale_quantity || "",
                IsStock:details.stock || "No",
                mrp:details.mrp || "",
                sellingPrice:details.selling_price || "",
                specialPrice:details.special_price || "",
                discount:details.discount || "",
                discountAmt:details.discount_amount || "",
                status:details.status || "Active",
                mainImg:details.main_img || "",
                img2:details.img2 || "",
                img3:details.img3 || "",
                img4:details.img4 || "",
                img5:details.img1 || "",
                smallimg:details.small_img || "",
                thumimg:details.thumbnail_image || "",
                taxClassId:details.tax_class_id || "",
                cgstp:details.cgst || "",
                igstp:details.igst || "",
                sgstp:details.sgst || "",
                cgstamt:details.cgst_amount || "",
                igstamt:details.igst_amount || "",
                sgstamt:details.sgst_amount || "",
                groupid:details.group_id || "",
                metakey:details.meta_keyword || "",
                proVisible:details.product_visible || "No",
                ean:details.ean || "",
                retailQtyAllowed:details.retail_quantity || "",
                wholsaleQtyAllowed:details.wholesale_quantity || "",
            })
        //}
        
    }, [props.productDetails])

  
    const onSubmit=()=>{
        console.log(state)
            setState({
                ...state,
                loading:true
            })
            props.addProductDetails(state)
            .then((res)=>{
                setState({
                    ...state,
                    loading:false,
                    failure:res.failure || ""
                })
            })
    }

    return (
        <>
      <Header {...props} />
      <SubHeader  {...props} />
      <Container fluid>
            <Col xs={12} sm={12} md={12} lg={12} className={"adjustRow disFlex"}>
                <Col xs={12} sm={6} md={6} lg={6} className={"adjustRow"}>
                    <h4>
                        {state.pageType === "Add" ? "Add Products" : "Edit Products"}
                    </h4>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className={"adjustRow textAlignRight"}>
                    <a onClick={()=>props.history.push("/ViewProduct")} href="#" >
                        View Products
                    </a>
                </Col>
            </Col>
            <Row>
                
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="productName" 
                            value={state.productName} onChange={onChange} 
                            className="form-control" placeholder="Name" 
                            error={state.failure.productName || ""}
                        />
                        {/* <input type="text" id="productName" value={state.productName} onChange={onChange} className="form-control" placeholder="Name" /> */}
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Brand</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="brand" value={state.brand} 
                            onChange={onChange} className="form-control" placeholder="Brand" 
                            error={state.failure.brand || ""}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Product Category</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <select id="productCategory" value={state.productCategory} onChange={onChange} 
                            className={"form-control "+(state.failure.category ? "error" : "")} >
                            <option value={""}>Select category</option>
                            {props.categoryList && props.categoryList.length != 0 ? props.categoryList.map(data=>{
                                return <option value={data.category}>{data.category}</option>
                            }) :""}
                        </select>
                        {state.failure.category  ? <label className={"labelError"}>{state.failure.category }</label>:""}
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>SKU</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="sku" value={state.sku} 
                            onChange={onChange} className="form-control" placeholder="SKU" 
                            error={state.failure.SKU || ""}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Product Features</label>
                        <Inputbox type="text" id="productFeatures" value={state.productFeatures} 
                            onChange={onChange} className="form-control"
                            placeholder="Features" 
                            error={state.failure.productFeatures || ""}
                         />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Product Specification</label>
                        <Inputbox type="text" id="ProductSpec" value={state.ProductSpec} 
                            onChange={onChange} className="form-control" 
                            placeholder="Specification" 
                            error={state.failure.ProductSpec || ""}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Unit for weight</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="unitWeight" value={state.unitWeight} 
                            onChange={onChange} className="form-control" 
                            placeholder="Unit for weight" 
                            error={state.failure.unit_for_weight || ""}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Weight</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="weight" value={state.weight} 
                            onChange={onChange} className="form-control" 
                            placeholder="weight" 
                            error={state.failure.weight || ""}
                            onlyNumber
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Available sale Qty</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="availableSaleQty" 
                            value={state.availableSaleQty} onChange={onChange} 
                            className="form-control" placeholder="Available sale qty" 
                            error={state.failure.avail_quantity || ""}
                            onlyNumber
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Min Sale Qty</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="minSaleQty" value={state.minSaleQty} 
                            onChange={onChange} className="form-control" 
                            placeholder="Min sale qty" 
                            error={state.failure.min_sale_quantity || ""}
                            onlyNumber
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Max Sale Qty</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="maxSaleQty" value={state.maxSaleQty} 
                            onChange={onChange} className="form-control" 
                            placeholder="Max sale qty" 
                            error={state.failure.max_sale_quantity || ""}
                            onlyNumber
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Is in Stock</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <select id="IsStock" value={state.IsStock} onChange={onChange} className="form-control" placeholder="Available?" >
                            <option value={"Yes"}>Yes</option>
                            <option value={"No"}>No</option>
                        </select>
                        {/* <input type="text" id="IsStock" onChange={onChange} className="form-control" placeholder="Available?" /> */}
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>MRP</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="mrp" value={state.mrp} 
                            onChange={onChange} className="form-control" placeholder="mrp" 
                            error={state.failure.mrp || ""}
                            onlyNumber
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Retail Price</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="sellingPrice" value={state.sellingPrice} 
                            onChange={onChange} className="form-control" placeholder="Selling price" 
                            error={state.failure.selling_price || ""}
                            onlyNumber
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Wholesale Price</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="specialPrice" value={state.specialPrice} 
                            onChange={onChange} className="form-control" placeholder="Special price" 
                            error={state.failure.special_price || ""}
                            onlyNumber
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Discount %</label>
                        <Inputbox type="text" id="discount" value={state.discount} 
                            onChange={onChange} className="form-control" placeholder="%" 
                            error={state.failure.discount || ""}
                            disabled
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Discount Amount</label>
                        <Inputbox type="text" id="discountAmt" value={state.discountAmt} 
                            onChange={onChange} className="form-control" placeholder="Discount Amount" 
                            error={state.failure.discountAmt || ""}
                            disabled
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Status</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <select id="status" value={state.status} onChange={onChange} className="form-control" >
                            <option value={"Active"}>Active</option>
                            <option value={"Inactive"}>Inactive</option>
                        </select>
                        {/* <Inputbox type="text" id="status" value={state.status} onChange={onChange} 
                            className="form-control" placeholder="Status" 
                            error={state.failure.status || ""}
                        /> */}
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Tax Class Id</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="taxClassId" value={state.taxClassId} 
                            onChange={onChange} className="form-control" placeholder="Tax class id" 
                            error={state.failure.taxClassId || ""}
                            onlyNumber
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Cgst %</label>
                        <Inputbox type="text" id="cgstp" value={state.cgstp} onChange={onChange} 
                            className="form-control" placeholder="%" 
                            error={state.failure.cgstp || ""}
                            disabled
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Igst %</label>
                        <Inputbox type="text" id="igstp" value={state.igstp || 0} onChange={onChange} 
                            className="form-control" placeholder="%" 
                            error={state.failure.igstp || ""}
                            disabled
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Sgst %</label>
                        <Inputbox type="text" id="sgstp" value={state.sgstp} onChange={onChange} 
                            className="form-control" placeholder="%" 
                            error={state.failure.sgstp || ""}
                            disabled
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Cgst Amount</label>
                        <Inputbox type="text" id="cgstamt" value={state.cgstamt} onChange={onChange} 
                            className="form-control" placeholder="cgst amount" 
                            error={state.failure.cgstamt || ""}
                            disabled
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Igst Amount</label>
                        <Inputbox type="text" id="igstamt" value={state.igstamt || 0} onChange={onChange} 
                            className="form-control" placeholder="igst amount" 
                            error={state.failure.igstamt || ""}
                            disabled
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Sgst Amount</label>
                        <Inputbox type="text" id="sgstamt" value={state.sgstamt} onChange={onChange} 
                            className="form-control" placeholder="sgst amount" 
                            error={state.failure.sgstamt || ""}
                            disabled
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Group Id</label>
                        <Inputbox type="text" id="groupid" value={state.groupid} onChange={onChange} 
                            className="form-control" placeholder="group id" 
                            error={state.failure.groupid || ""}
                            onlyNumber
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Meta Keyword</label>
                        <Inputbox type="text" id="metakey" value={state.metakey} onChange={onChange} 
                            className="form-control" placeholder="Meta keyword" 
                            error={state.failure.metakey || ""}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Product Visible in Frontend</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <select id="proVisible" value={state.proVisible} onChange={onChange} className="form-control" placeholder="Visible?" >
                            <option value={"Yes"}>Yes</option>
                            <option value={"No"}>No</option>
                        </select>
                        {/* <input type="text" id="proVisible" onChange={onChange} className="form-control" placeholder="Visible?" /> */}
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Country of Manufacture</label>
                        <Inputbox type="text" id="country" value={state.country} value={"INDIA"} 
                            disabled onChange={onChange} className="form-control" placeholder="Country" 
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Ean</label>
                        <Inputbox type="text" id="ean" value={state.ean} onChange={onChange} 
                            className="form-control" placeholder="EAN" 
                            error={state.failure.ean || ""}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Retail quantities allowed</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="retailQtyAllowed" value={state.retailQtyAllowed} onChange={onChange} 
                            className="form-control" placeholder="Retail quantities allowed" 
                            error={state.failure.retail_quantity || ""}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Wholesale quantities allowed</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <Inputbox type="text" id="wholsaleQtyAllowed" value={state.wholsaleQtyAllowed} onChange={onChange} 
                            className="form-control" placeholder="Wholesale quantities allowed" 
                            error={state.failure.wholesale_quantity || ""}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Short Description</label>
                        <TextArea type="text" id="shortDec" value={state.shortDec} 
                            onChange={onChange} className="form-control"   rows={8}
                            placeholder="Enter few words... " 
                            error={state.failure.shortDec || ""}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Description</label>
                        <TextArea type="text" id="description" value={state.description} 
                            onChange={onChange} className="form-control"  rows={8}
                            placeholder="Enter brief description..." 
                            error={state.failure.description || ""}
                        />
                    </div>
                </Col>
                <br/>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Main Image</label>
                        <span className={"mty"}>&nbsp;*</span>
                        <ImageEdit key={1} id={"mainImg"} value={state.mainImg} onChange={imgonChange} 
                            error={state.failure.main_img || ""}
                        />
                        {/* <input type="file" id="mainImg" value={state.mainImg} onChange={onChange} className="form-control" placeholder="Enter email" /> */}
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Image 2</label>
                        <ImageEdit key={2} id={"img2"} value={state.img2} onChange={imgonChange} />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Image 3</label>
                        <ImageEdit key={3} id={"img3"} value={state.img3} onChange={imgonChange} />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Image 4</label>
                        <ImageEdit key={4} id={"img4"} value={state.img4} onChange={imgonChange} />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Image 5</label>
                        <ImageEdit key={5} id={"img5"} value={state.img5} onChange={imgonChange} />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Small Image</label>
                        <ImageEdit key={6} id={"smallimg"} value={state.smallimg} onChange={imgonChange} />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={3} className={" "}>
                    <div className="form-group">
                        <label>Thumbnail Image</label>
                        <ImageEdit key={7} id={"thumimg"} value={state.thumimg} onChange={imgonChange} />
                    </div>
                </Col>
                <Col xs={12} sm={6} md={3} lg={12} className={"mt20 mb30px"}>
                    <Button loading={state.loading}  primary onClick={onSubmit} className={"AddProBtn"} text={"Submit"} />
                </Col>
            </Row>
         
      </Container>
      </>
    );
  }
  

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    categoryList: state.dashboardReducer.categoryList ? state.dashboardReducer.categoryList : [],
    productDetails: state.dashboardReducer.productDetails ? state.dashboardReducer.productDetails : ""
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
)(AddProduct)

