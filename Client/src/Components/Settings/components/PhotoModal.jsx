import React, { useState } from 'react';
import {MDBBtn} from 'mdb-react-ui-kit';
import {MDBModal,MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,} from 'mdb-react-ui-kit';
  import  {usePhotoModal} from '../../../hooks/usePhoto'

function PhotoModal() {
  const {isOpen, handleOpen, handleClose} = usePhotoModal();

  

  return (
    <>
      <MDBBtn variant="primary" onClick={handleOpen}>
        Launch demo modal
      </MDBBtn>

      <MDBModal show={isOpen} onHide={handleClose}>
        <MDBModalHeader closeButton>
          <MDBModalTitle>Modal heading</MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>Woohoo, you're reading this text in a modal!</MDBModalBody>
        <MDBModalFooter>
          <MDBBtn variant="secondary" onClick={handleClose}>
            Close
          </MDBBtn>
          <MDBBtn variant="primary" onClick={handleClose}>
            Save Changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
}

export default PhotoModal;