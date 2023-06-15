import { createRef, FC, forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useLayoutEffect } from "react";

interface Props {
  children?: ReactNode;
  isVisible?: boolean;
  onModalClosed?: () => void;
}

const NecktieModal: FC<Props> = ({ children, isVisible, onModalClosed }) => {
  const modalRef = createRef<HTMLDialogElement>();

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    modalRef.current?.showModal();
  }, [isVisible, modalRef]);

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onModalClosed}
        >
          ✕
        </button>
        {children}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onModalClosed}>Close</button>
      </form>
    </dialog>
  );
};

export default NecktieModal;
