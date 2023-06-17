import { FC, memo, ReactNode } from "react";
import classNames from "classnames";

interface Props {
  id: string | number;
  title: ReactNode;
  content?: ReactNode;
  isOpened?: boolean;
  onAccordionOpen?: (id: string | number) => void;
  className?: string;
}

const AccordionItem: FC<Props> = ({ id, title, content, isOpened, onAccordionOpen, className }) => {
  return (
    <div className={classNames("collapse collapse-arrow bg-primary-content/40", className)}>
      <input
        type="radio"
        name="accordion-item"
        checked={isOpened}
        onChange={() => onAccordionOpen?.(id)}
      />
      <div className="collapse-title text-md font-medium flex items-center">{title}</div>
      <div className="collapse-content">{content}</div>
    </div>
  );
};

export default memo(AccordionItem);
