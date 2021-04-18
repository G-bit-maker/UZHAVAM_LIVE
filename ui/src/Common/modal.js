import React from 'react';
//import Button from '@material-ui/core/Button';
import { Modal } from 'react-bootstrap';

import Buttons from "../Common/button"

import { useState,useEffect } from 'react';
import "./common.scss"


export default function ModalComp(props) {
  return (
    <>

        <Modal
            size={props.size || "md"}
            show={props.show}
            onHide={props.close}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.component}
            </Modal.Body>
            <Modal.Footer>
                
            {/* <Button variant="secondary" onClick={props.close}>
                {props.closeText}
            </Button> */}

            <Buttons 
                     onClick={props.close}
                     //className={"btn btn-dark btn-lg btn-block "} 
                     text={props.closeText}
                  />

            
            <Buttons primary loading={props.submitLoading}
                     onClick={props.submit}
                     //className={"btn btn-dark btn-lg btn-block "} 
                     text={props.submitText}
                  />
            {/* <Button  variant="primary"></Button> */}
            </Modal.Footer>
        </Modal>
        </>
  );
}
