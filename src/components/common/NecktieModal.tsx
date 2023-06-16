import { createRef, FC, ReactNode, useEffect } from "react";

interface Props {
  children?: ReactNode;
  isVisible?: boolean;
  onModalClosed?: () => void;
  containerClassName?: string;
}

const NecktieModal: FC<Props> = ({ children, containerClassName, isVisible, onModalClosed }) => {
  const modalRef = createRef<HTMLDialogElement>();

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    modalRef.current?.showModal();
  }, [isVisible, modalRef]);

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className={`modal-box flex flex-col ${containerClassName ? containerClassName : ""}`}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onModalClosed}
        >
          ✕
        </button>
        {children}
      </div>
      <div className="modal-backdrop">
        <button onClick={onModalClosed}>Close</button>
      </div>
    </dialog>
  );
};

export default NecktieModal;
