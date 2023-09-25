// Styles
import './modal.scss';

export default function Modal({ statusMessage, closeModal }) {
  return (
    <>
      <div className="modal">
        <div onClick={closeModal} className="overlay"></div>
        <div className="modal-content">
          <h2>{statusMessage}</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </>
  );
}
