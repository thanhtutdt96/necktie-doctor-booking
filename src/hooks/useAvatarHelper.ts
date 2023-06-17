import { useEffect, useState } from "react";

const useAvatarHelper = (name?: string) => {
  const [initials, setInitials] = useState("");
  const [avatarColor, setAvatarColor] = useState("");

  const getInitialsFromName = (name: string) => {
    const names = name?.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const stringToColor = (string: string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }

    return color;
  };

  useEffect(() => {
    if (!name?.length) {
      return;
    }

    setInitials(getInitialsFromName(name));
    setAvatarColor(stringToColor(name));
  }, [name]);

  return {
    initials,
    avatarColor
  };
};

export default useAvatarHelper;
