import { FC, memo } from "react";
import { useMainLayoutContext } from "contexts/MainLayoutContext";

interface Props {
  isDisabled?: boolean;
  placeholder?: string;
}
const NecktieSearchInput: FC<Props> = ({ isDisabled, placeholder }) => {
  const { searchTerm, setSearchTerm } = useMainLayoutContext();

  return (
    <input
      value={searchTerm}
      type="text"
      placeholder={placeholder}
      className="input input-bordered w-60 input-sm"
      onChange={(event) => setSearchTerm?.(event.target.value)}
      disabled={isDisabled}
    />
  );
};

export default memo(NecktieSearchInput);
