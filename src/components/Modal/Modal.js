import { Component } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#root-modal');
export default class Modal extends Component {
  componentDidMount() {
    console.log(modalRoot);
    window.addEventListener('keydown', this.closeByEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }
  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.onClickBackdrop}>
        <div className={s.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
