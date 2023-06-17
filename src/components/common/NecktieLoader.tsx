import { FC, useMemo } from "react";
import classNames from "classnames";
import { LoaderType } from "types/Common";

interface Props {
  type?: "progress" | "spinner" | "dot";
  size?: "sm" | "md" | "lg";
  className?: string;
}
const NecktieLoader: FC<Props> = ({ type = LoaderType.DOT, className, size = "lg" }) => {
  const dotSize = useMemo(() => {
    switch (size) {
      case "sm":
        return "loading-sm";
      case "md":
        return "loading-md";
      case "lg":
        return "loading-lg";
      default:
        return "loading-lg";
    }
  }, [size]);

  return useMemo(() => {
    switch (type) {
      case LoaderType.PROGRESS:
        return (
          <progress className={classNames("progress progress-primary w-56", className)}></progress>
        );
      case LoaderType.SPINNER:
        return (
          <span
            className={classNames("loading text-primary loading-spinner", dotSize, className)}
          ></span>
        );
      case LoaderType.DOT:
        return (
          <span
            className={classNames("loading text-primary loading-dots", dotSize, className)}
          ></span>
        );
    }
  }, [className, dotSize, type]);
};

export default NecktieLoader;
