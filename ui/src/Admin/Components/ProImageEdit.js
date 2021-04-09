import React,{ useState,useEffect } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import "../style/products.scss"




export default function MediaCard(props) {

    const [state,setState] = useState({
        img:"",
        id:props.id
    })
     useEffect(() => {
        setState({
            img:props.value
          })
    }, [props.value]); 
    const onChange=(e)=>{
        let reader = new FileReader()
         if(e.target.files.length != 0){
            let file = e.target.files[0]
            let base6 = ""
            reader.onload = (j) => {
                base6 = j.target.result
                setState({
                    img:base6
                  })
                  console.log(props.id)
                props.onChange(props.id,base6)
            };
            reader.readAsDataURL(file); 
        } 
        
    }
  return (<>
      <Col xs={12} sm={12} md={12} lg={12} key={props.id} className={(props.error?"error ": "" )+"adjustRow imgEdit"}>
          <img src={state.img} height={"100%"}/>
          <div className={"label"}>
          <input accept="image/*" hidden  id={"icon-button-file"+props.id} type="file" onChange={onChange} />
            <label htmlFor={"icon-button-file"+props.id} className={state.img?"op":""}>
                <IconButton aria-label="upload picture" component="span">
                    <PhotoCamera fontSize="large" />
                </IconButton>
             </label>   
          </div>
      </Col>
      {props.error ? <label className={"labelError"}>{props.error}</label>:""}
      </>
  );
}
