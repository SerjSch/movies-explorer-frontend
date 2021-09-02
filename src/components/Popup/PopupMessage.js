import React from 'react';
import "./PopupMessage.css"

function PopupMessage({isOpen, message}) {
    return (
        <div className={`popupMessage ${isOpen && 'popupMessage_is-open'}`}>
              <p className="popupMessage_text">{message.text}</p>
          </div>
    );
}
export default PopupMessage;