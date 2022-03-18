import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id='modal'>
      <div id='modal-background' onClick={onClose} />
      <div id='modal-content'>{children}</div>
    </div>,
    modalNode
  );
}

export const Modal2 = props => {
  if (!props.show) {
    return null;
  }

  return (
    <div className='modal' onClick={props.onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h4 className='modal-title'>{props.title}</h4>
        </div>
        <div className='modal-body'>{props.children}</div>
        <div className='modal-footer'>
          <button onClick={props.onClose} className='button'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
