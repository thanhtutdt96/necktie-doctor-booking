import { FC, memo, ReactNode } from "react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

interface Props {
  isFormValid?: boolean;
  isLoading?: boolean;
  isBackButtonVisible?: boolean;
  className?: string;
  handlePreviousStep?: () => void;
  handleNextStep?: () => void;
  backButtonLabel?: string;
  nextButtonLabel?: string;
  nextButtonIcon?: ReactNode;
}

const FormActions: FC<Props> = ({
  isFormValid = true,
  isLoading,
  isBackButtonVisible = true,
  handleNextStep,
  handlePreviousStep,
  backButtonLabel = "Back",
  nextButtonLabel = "Next",
  nextButtonIcon,
  className
}) => {
  const backButtonHandler = () => {
    handlePreviousStep?.();
  };

  const nextButtonHandler = () => {
    handleNextStep?.();
  };

  return (
    <div className={classNames("flex justify-between", className)}>
      <button
        className={classNames("btn btn-primary btn-outline", { invisible: !isBackButtonVisible })}
        onClick={backButtonHandler}
      >
        <ChevronDoubleLeftIcon className="w-6" />
        {backButtonLabel}
      </button>
      <button
        disabled={!isFormValid || isLoading}
        type="submit"
        className={classNames("btn", { "btn-primary btn-outline": isFormValid })}
        onClick={nextButtonHandler}
      >
        {isLoading && <span className="loading loading-spinner"></span>}
        {`${nextButtonLabel} `}
        {nextButtonIcon ? nextButtonIcon : <ChevronDoubleRightIcon className="w-6" />}
      </button>
    </div>
  );
};

export default memo(FormActions);
