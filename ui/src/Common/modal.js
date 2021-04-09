import React from 'react';
import Button from '@material-ui/core/Button';
import { Modal } from 'react-bootstrap';

import { useState,useEffect } from 'react';
import "./common.scss"


export default function ModalComp(props) {
  return (
    <>

        <Modal
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
            <Button variant="secondary" onClick={props.close}>
                {props.closeText}
            </Button>
            <Button onClick={props.submit} variant="primary">{props.submitText}</Button>
            </Modal.Footer>
        </Modal>
        </>
  );
}
