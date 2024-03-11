import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function MyModal({ children, title, buttonLabel, action, handleShow, handleClose, show}) {
    return (
        <>
            <Button variant="primary" onClick={handleShow} className="col-12 mb-4">
                { buttonLabel }
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    { children } 
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={action}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyModal;
