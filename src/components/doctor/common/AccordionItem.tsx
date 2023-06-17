import { ChangeEvent, FC, memo, ReactNode } from "react";

interface Props {
  id: string | number;
  title: ReactNode;
  content?: ReactNode;
  isOpened?: boolean;
  onAccordionOpen?: (id: string | number) => void;
}

const AccordionItem: FC<Props> = ({ id, title, content, isOpened, onAccordionOpen }) => {
  return (
    <div className="collapse collapse-arrow bg-primary-content/40">
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
