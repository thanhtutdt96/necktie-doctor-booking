import { FC, ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children?: ReactNode;
  isVisible?: boolean;
  onModalClosed?: () => void;
  containerClassName?: string;
}

const NecktieModal: FC<Props> = ({ children, containerClassName, isVisible, onModalClosed }) => {
  return (
    <div className={classNames("modal modal-bottom sm:modal-middle", { "modal-open": isVisible })}>
      <div className={classNames("modal-box flex flex-col", containerClassName)}>
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
    </div>
  );
};

export default NecktieModal;
