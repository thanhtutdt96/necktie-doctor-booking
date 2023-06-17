import { CSSProperties, FC } from "react";
import classNames from "classnames";

interface Props {
  className?: string;
  initials?: string;
  photoUrl?: string;
  initialsSize?: "xs" | "sm" | "md" | "lg";
  avatarStyle?: CSSProperties;
}
const NecktieAvatar: FC<Props> = ({
  className,
  initials,
  photoUrl,
  avatarStyle,
  initialsSize = "md"
}) => {
  return (
    <div className="avatar">
      <div className={classNames("rounded-full", className)} style={avatarStyle}>
        {photoUrl && (
          <img
            src="https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=225"
            alt="Profile"
          />
        )}
        {!photoUrl && initials && (
          <div
            className={`flex text-white justify-center items-center text-${initialsSize} font-bold tracking-wide h-full`}
          >
            <span>{initials}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NecktieAvatar;
