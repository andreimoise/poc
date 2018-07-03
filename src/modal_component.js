import React from 'react';
import Modal from 'react-bootstrap4-modal';
import MyCustomBody from './my-custom-body'
import './modal_component.css';

class ModalEdit extends React.Component {

  modalBackdropClicked = () => {
    this.props.handler();
  }

  render() {
      return (
        <Modal visible={this.props.show} onClickBackdrop={this.modalBackdropClicked}>
          <MyCustomBody data={this.props.data} btn={this.props.btn} handler={this.modalBackdropClicked}/>
        </Modal>
      );
  }
}

export default ModalEdit