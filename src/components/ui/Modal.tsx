import ReactDOM from "react-dom";

interface ModalProps {
  isShown: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal = ({ isShown, onClose, children }: ModalProps) => {
  if (!isShown) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex justify-center items-center animate-fade-in`}
      onMouseDown={onClose}
    >
      <div className="bg-dark rounded-md p-5 shadow-lg w-[800px] mx-5" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
