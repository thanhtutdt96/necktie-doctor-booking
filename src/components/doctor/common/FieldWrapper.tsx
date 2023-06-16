import { FC, ReactNode } from "react";
import { CalendarIcon } from "@heroicons/react/24/solid";
import NecktieAvatar from "components/common/NecktieAvatar";

interface Props {
  children: ReactNode;
  label: string;
  labelRight?: ReactNode;
}
const FieldWrapper: FC<Props> = ({ children, label, labelRight }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-2">
      <h4 className="text-md font-medium">{label}</h4>
      {labelRight}
    </div>
    {children}
  </div>
);

export default FieldWrapper;