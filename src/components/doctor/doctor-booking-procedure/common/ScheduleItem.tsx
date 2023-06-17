import { FC, memo, ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children?: ReactNode;
  isDisabled?: boolean;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
}

const ScheduleItem: FC<Props> = ({ children, className, onClick, isDisabled, isSelected }) => {
  return (
    <button
      className={classNames(
        "text-sm text-neutral flex flex-col justify-center items-center rounded-3xl bg-base-100 shadow-sm hover:cursor-pointer border",
        {
          "border-neutral-content hover:ring-neutral-content hover:ring-1": !isDisabled,
          "ring-secondary hover:ring-secondary ring-1 text-secondary": isSelected,
          "hover:ring-0 border-neutral-content/40 text-neutral/50": isDisabled
        },
        className
      )}
      disabled={isDisabled}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
};

export default memo(ScheduleItem);
