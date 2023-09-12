// Styles
import './modal.scss';

export default function Modal({ statusMessage, closeModal }) {
  return (
    <>
      <div className="modal">
        <div onClick={closeModal} className="overlay"></div>
        <div className="modal-content">
          <h3>{statusMessage}</h3>
          <button className="submit-button" onClick={closeModal}>Close</button>
        </div>
      </div>
    </>
  );
}
