import { CSSProperties, FC } from "react";

interface Props {
  width?: number;
  height?: number;
  className?: string;
  initials?: string;
  photoUrl?: string;
  avatarStyle: CSSProperties;
}
const NecktieAvatar: FC<Props> = ({
  width,
  height,
  className,
  initials,
  photoUrl,
  avatarStyle
}) => {
  return (
    <div className={`avatar ${className ? className : ""}`}>
      <div
        className={`rounded-full w-${width ? width : 10} h-${height ? height : "auto"}`}
        style={avatarStyle}
      >
        {photoUrl && (
          <img
            src="https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=225"
            alt="Profile"
          />
        )}
        {!photoUrl && initials && (
          <div className="flex text-white justify-center items-center text-md font-bold tracking-wide h-full">
            <span>{initials}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NecktieAvatar;
