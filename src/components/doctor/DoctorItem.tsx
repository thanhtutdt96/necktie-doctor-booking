import { FC, memo, MouseEvent } from "react";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import NecktieAvatar from "components/common/NecktieAvatar";
import DoctorAvailableStatus from "components/doctor/common/DoctorAvailableStatus";
import useAvatarHelper from "hooks/useAvatarHelper";
import useDoctorSchedule from "hooks/useDoctorSchedule";
import { Doctor } from "types/Doctor";

interface Props {
  name: Doctor["name"];
  description: Doctor["description"];
  address: Doctor["address"];
  openingHours: Doctor["opening_hours"];
  onPrimaryButtonClick: () => void;
  className?: string;
}

const DoctorItem: FC<Props> = ({
  name,
  description,
  address,
  openingHours,
  className,
  onPrimaryButtonClick
}) => {
  const { initials, avatarColor } = useAvatarHelper(name);
  const { isAvailableToday } = useDoctorSchedule(openingHours);

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onPrimaryButtonClick();
  };

  return (
    <div
      className={classNames(
        "card md:w-[250px] bg-base-100 w-full border shadow-lg transition duration-300 ease-in-out" +
          "hover:cursor-pointer hover:shadow-xl hover:ring-neutral-content hover:ring-1 hover:-translate-y-0.5",
        className
      )}
    >
      <figure className="px-2 pt-2">
        <div className="bg-neutral-content/30 rounded-xl flex-1 flex items-center p-3">
          <NecktieAvatar
            className="w-10"
            avatarStyle={{ backgroundColor: avatarColor }}
            initials={initials}
          />
          <div className="flex flex-col ml-2">
            <h4 className="card-title text-sm truncate flex-1 mb-1">Dr. {name}</h4>
            <p className="text-xs text-gray-500 line-clamp-2">{address.district}</p>
          </div>
        </div>
      </figure>
      <div className="card-body p-3">
        {description && <p className="text-xs text-gray-500 mb-2 line-clamp-2">{description}</p>}
        <div className="flex flex-col gap-y-2 mb-2">
          <div className="badge badge-outline badge-primary text-xs truncate">{address.line_1}</div>
          <div className="flex gap-2 flex-wrap">
            <div className="badge badge-outline badge-secondary text-xs truncate">
              {address.line_2}
            </div>
          </div>
        </div>
        <DoctorAvailableStatus isAvailableToday={isAvailableToday} />
        <div className="divider my-0"></div>
        <div className="card-actions justify-center">
          <button className="btn btn-secondary btn-sm" onClick={handleOnClick}>
            <BellAlertIcon className="w-4 h-auto" />
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(DoctorItem);
