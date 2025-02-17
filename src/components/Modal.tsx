import ReactDOM from 'react-dom'
import { IModal } from '../interfaces/IModal';
import React from 'react';

const Modal: React.FC<IModal> = ({children, onClose}) => {
    const overlay: React.CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050
    };
    const modal: React.CSSProperties = {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
    };

    const modalRoot = document.getElementById('modal-root')

    return ReactDOM.createPortal(
        <div style={overlay}>
            <div style={modal}>
                {children}
                <button className='btn btn-primary' onClick={onClose}>Cerrar</button>
            </div>
        </div>,
        modalRoot as HTMLElement
    )
}

export default Modal
