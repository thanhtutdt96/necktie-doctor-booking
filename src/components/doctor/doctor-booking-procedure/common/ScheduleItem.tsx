import { FC, memo, ReactNode } from "react";

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
      className={`text-sm text-neutral flex flex-col justify-center items-center rounded-3xl bg-base-100 border
      shadow-sm hover:cursor-pointer hover:ring-neutral-content hover:ring-1 ${
        isSelected ? "ring-secondary hover:ring-secondary ring-1 text-secondary" : ""
      } ${isDisabled ? "hover:ring-0 border-neutral-content/40 text-neutral/40" : ""} ${
        className ? className : ""
      }`}
      disabled={isDisabled}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
};

export default memo(ScheduleItem);
