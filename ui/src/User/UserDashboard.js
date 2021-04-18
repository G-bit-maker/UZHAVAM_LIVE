import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as UserAction from '../Action/UserAction'
import "./style/dashboard.scss"
import Header from "../Common/header"
import SubHeader from "../Common/subHeader"

import Tags from "../Common/tags"

import ProductContainer from "./Components/ProductContainer"

import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap';

import React, { useState,useEffect } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function Profile(props) {
    
  const [state,setState] = useState({
    uname:"",
    pass:"",
    tab:0,
    productCategory:"All",
    selectedCategory:"All"
  })

  const onChange=(e)=>{
    setState({
        ...state,
        [e.target.id]:e.target.value
      })
  }


  useEffect(() => {
    props.getCategory()
    props.getProductList("All")
  }, []);

  useEffect(() => {
    let total=0
    for (let i = 0; i < props.cartList.length; i++) {
      let x = props.cartList[i]
        total += x.count < x.wholesale_quantity ?(x.count * x.selling_price) : (x.count * x.special_price)
    }
    setState({
      ...state,
      totalAmount:total
    })
  }, [props.cartList]);

  const tagActive =(data)=>{
    props.getProductList(data._id || "All")
    setState({
      ...state,
      selectedCategory:data._id || "All"
    })
  }
  const cartUpdate =(id,count,price)=>{
    props.cartUpdate(id,count,price)
  }
    return (
        <>
      <Header {...props} />
      <br/>

      <Container /* fluid */>
        <Row className={""}>
            <Col xs={12} sm={12} md={12} lg={12} className={" "}>
              <Col xs={12} sm={12} md={12} lg={12} className={"adjustRow "}>
                <h3>
                  Category
                </h3>
                {/* <br/> */}
              </Col>
              {/* <Col xs={12} sm={3} md={3} lg={12} className={"adjustRow "}>
                  <select id="productCategory" onChange={selectCategory} className="form-control" >
                        <option value={"All"}>All</option>
                        {props.categoryList && props.categoryList.length != 0 ? props.categoryList.map(data=>{
                            return <option value={data._id}>{data.category}</option>
                        }) :""}
                    </select>
              </Col> */}
               <Col xs={12} sm={12} md={12} lg={12} className={"adjustRow categoryCon"}>
              <Tags active={state.selectedCategory == "All"} onActive={()=>tagActive("All")} text={"All"} />
                {props.categoryList.length != 0 ? props.categoryList.map((data,i)=>(
                    <Tags active={state.selectedCategory == data._id} onActive={()=>tagActive(data,i)} text={data.category} />
                )):""}
              </Col> 
            </Col>
            <Col xs={12} sm={8} md={9} lg={12} className={" "}>
              <Row className={""}>
                {props.proudctList && props.proudctList.length != 0 ? 
                props.proudctList.map((data1,i)=>(
                  <Col xs={12} sm={6} md={4} lg={3} className={" adjustRow"}>
                      <ProductContainer cartUpdate={cartUpdate} data={data1} />
                  </Col>
                ))
                  : ""
                }
                  
                  {/* <Col xs={12} sm={6} md={4} lg={3} className={"adjustRow "}>
                      <ProductContainer cartUpdate={cartUpdate} data={
                        {
                          productName:"Test Product name",
                          discount_amount:6990,
                          discount:90,
                          mrp:699
                        }
                      }/>
                  </Col> */}
                  
              </Row>
            </Col>
        </Row>
                   {state.totalAmount != 0 ?  
                    <div className={"cartBar"}>
                        <h5>Total Amount: &#x20B9;{state.totalAmount} <ArrowForwardIosIcon /></h5>
                    </div>
                     :""  
                    } 
         
      </Container>
      </>
    );
  }
  

const mapStateToProps = (state /*, ownProps*/) => {
    console.log(state)
  return {
    cartList: state.userReducer.cartList ? state.userReducer.cartList : [],
    categoryList: state.userReducer.categoryList ? state.userReducer.categoryList : [],
    proudctList: state.userReducer.proudctList ? state.userReducer.proudctList : []
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

