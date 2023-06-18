import { FC, memo } from "react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

interface Props {
  isAvailableToday: boolean;
}

const DoctorAvailableStatus: FC<Props> = ({ isAvailableToday }) => (
  <p
    className={classNames(
      "flex items-center text-xs",
      isAvailableToday ? "text-success" : "text-error"
    )}
  >
    {isAvailableToday ? (
      <CheckCircleIcon className="w-5 mr-1" />
    ) : (
      <ExclamationTriangleIcon className="w-5 mr-1" />
    )}
    {isAvailableToday ? "Available today" : "Not available today"}
  </p>
);

export default memo(DoctorAvailableStatus);
