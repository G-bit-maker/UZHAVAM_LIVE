import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap';

import {Add,Remove} from '@material-ui/icons';

import { useState,useEffect } from 'react';

import userimage from "../../Image/product1.jpg"
import "../style/checkout.scss"
import ButtonCus from "../../Common/button"
import ModalComp from '../../Common/modal';


export default function cartProductList(props) {
    console.log(props)
    let data = props.data
    let wwidth = window.innerWidth
    let mwidth = 480
  return (
    <>
            <Row className={"listCon conPad"}>
                    <Col xs={4} sm={12} md={12} lg={2} className={" "}>
                        <img width="100%" src={data.main_img || userimage} />
                    </Col>
                    <Col sm={12} md={12} lg={4} className={" mhide"}>
                        <h5>{data.productName}</h5> Sku:{data.SKU}
                    </Col>
                    <Col sm={12} md={12} lg={2} className={" textAlignCenter mhide"}>
                        <h6>&#x20B9;{data.mrp}</h6>
                    </Col>
                    <Col sm={12} md={12} lg={1} className={" textAlignCenter mhide"}>
                        <h6>{data.count}</h6>
                    </Col>
                    <Col sm={12} md={12} lg={2} className={" textAlignCenter mhide"}>
                        <h6>&#x20B9;{data.count * data.mrp}</h6>
                    </Col>
                    <Col sm={12} md={12} lg={1} className={" textAlignRight mhide"}>
                        {/* <DeleteForever fontSize="small" /> */}
                        <span onClick={()=>props.cartUpdate(data._id,"0")} style={{cursor:"pointer"}}> X </span>
                    </Col>
                    <Col xs={8} className={"mshow"} >
                        <h5>{data.productName}</h5> Sku:{data.SKU}
                    </Col>
                    <Col xs={12} className={"mshow p15 listCon"} >
                    </Col>
                    <Col xs={12} className={"mshow p15 listCon"} >
                        <Row>
                        <Col xs={6} className={""} >
                            <h5>Price: (&#x20B9;{data.mrp})</h5> 
                        </Col>
                        <Col xs={6} className={"textAlignRight"} >
                            <h5> &#x20B9;{data.count * data.mrp}</h5>
                        </Col>
                        </Row>
                    </Col>
                    <Col xs={12} className={"mshow p15"} >
                        <Row>
                        <Col xs={6} className={""} >
                            <h5>Qty: {data.count}</h5>
                        </Col>
                        <Col xs={6} className={""} >
                            <ButtonCus primary onClick={()=>props.cartUpdate(data._id,"0")} className={"width100"} text={"Remove"} />
                        </Col>
                        </Row>
                    </Col>
            </Row>
        </>
  );
}
