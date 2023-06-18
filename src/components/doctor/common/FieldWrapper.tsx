import { FC, ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  label: string;
  labelRight?: ReactNode;
  className?: string;
}
const FieldWrapper: FC<Props> = ({ children, label, labelRight, className }) => (
  <div className={classNames("mb-4", className)}>
    <div className="flex justify-between mb-2">
      <h4 className="text-md font-medium">{label}</h4>
      {labelRight}
    </div>
    {children}
  </div>
);

export default FieldWrapper;
