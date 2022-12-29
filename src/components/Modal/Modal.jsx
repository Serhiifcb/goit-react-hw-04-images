import PropTypes from 'prop-types'
import React from "react";
import css from "../Modal/Modal.module.css"
import { SlClose } from 'react-icons/sl';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root')

export const Modal = ({ toggleModal, children }) => {
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  })

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      window.removeEventListener('keydown', handleKeyDown);  
      toggleModal();
      }
  }

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
      window.removeEventListener('keydown', handleKeyDown);
    }
  }

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <button type='button' onClick={toggleModal} className={css.toggleButtonModal}>
        <SlClose size={40} />
      </button>
      <div className={css.modal}>
        {children}
      </div>
    </div>, modalRoot
  )
}

// export class Modal extends React.Component {

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown)
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown)
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//         this.props.toggleModal();
//       }
//   }
  
//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.toggleModal();
//     }
//   }

//   render() {
//     return createPortal(
//     <div className={css.overlay} onClick={this.handleBackdropClick}>
//       <button type='button' onClick={this.props.toggleModal} className={css.toggleButtonModal}>
//         <SlClose size={40} />
//       </button>
//       <div className={css.modal}>
//         {this.props.children}
//       </div>
//     </div>, modalRoot
//   )
//   }
  
// }

Modal.propTypes = {
  children: PropTypes.node,
  toggleModal:PropTypes.func.isRequired
}